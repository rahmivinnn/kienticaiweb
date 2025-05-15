"use client";

import { toast } from 'sonner';

// Error types
export enum ErrorType {
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  SERVER = 'server',
  NOT_FOUND = 'not_found',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown'
}

// Error severity
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Error interface
export interface AppError {
  type: ErrorType;
  message: string;
  severity: ErrorSeverity;
  originalError?: any;
  code?: string;
  retryable?: boolean;
  data?: any;
}

// Default error messages
const DEFAULT_ERROR_MESSAGES: Record<ErrorType, string> = {
  [ErrorType.NETWORK]: 'Network error. Please check your internet connection.',
  [ErrorType.AUTHENTICATION]: 'Authentication error. Please sign in again.',
  [ErrorType.AUTHORIZATION]: 'You do not have permission to perform this action.',
  [ErrorType.VALIDATION]: 'Invalid input. Please check your data and try again.',
  [ErrorType.SERVER]: 'Server error. Our team has been notified.',
  [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorType.TIMEOUT]: 'Request timed out. Please try again.',
  [ErrorType.UNKNOWN]: 'An unexpected error occurred. Please try again.'
};

// Error factory function
export function createError(
  type: ErrorType,
  message?: string,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  originalError?: any,
  code?: string,
  retryable: boolean = false,
  data?: any
): AppError {
  return {
    type,
    message: message || DEFAULT_ERROR_MESSAGES[type],
    severity,
    originalError,
    code,
    retryable,
    data
  };
}

// Parse API error response
export function parseApiError(error: any): AppError {
  // Network error
  if (error.name === 'NetworkError' || error.message === 'Network Error' || !navigator.onLine) {
    return createError(ErrorType.NETWORK, undefined, ErrorSeverity.WARNING, error, 'NETWORK_ERROR', true);
  }
  
  // Timeout error
  if (error.name === 'TimeoutError' || error.code === 'ECONNABORTED') {
    return createError(ErrorType.TIMEOUT, undefined, ErrorSeverity.WARNING, error, 'TIMEOUT_ERROR', true);
  }
  
  // Handle Axios/Fetch errors with response
  if (error.response) {
    const { status, data } = error.response;
    
    // Authentication errors
    if (status === 401) {
      return createError(
        ErrorType.AUTHENTICATION,
        data?.message || 'Your session has expired. Please sign in again.',
        ErrorSeverity.WARNING,
        error,
        'UNAUTHORIZED',
        false,
        data
      );
    }
    
    // Authorization errors
    if (status === 403) {
      return createError(
        ErrorType.AUTHORIZATION,
        data?.message || 'You do not have permission to perform this action.',
        ErrorSeverity.WARNING,
        error,
        'FORBIDDEN',
        false,
        data
      );
    }
    
    // Validation errors
    if (status === 400 || status === 422) {
      return createError(
        ErrorType.VALIDATION,
        data?.message || 'Please check your input and try again.',
        ErrorSeverity.WARNING,
        error,
        'VALIDATION_ERROR',
        true,
        data
      );
    }
    
    // Not found errors
    if (status === 404) {
      return createError(
        ErrorType.NOT_FOUND,
        data?.message || 'The requested resource was not found.',
        ErrorSeverity.WARNING,
        error,
        'NOT_FOUND',
        false,
        data
      );
    }
    
    // Server errors
    if (status >= 500) {
      return createError(
        ErrorType.SERVER,
        data?.message || 'Something went wrong on our end. Please try again later.',
        ErrorSeverity.ERROR,
        error,
        `SERVER_ERROR_${status}`,
        status < 503, // Only 500, 501, 502 are retryable
        data
      );
    }
  }
  
  // Default to unknown error
  return createError(
    ErrorType.UNKNOWN,
    error.message || 'An unexpected error occurred.',
    ErrorSeverity.ERROR,
    error,
    'UNKNOWN_ERROR',
    true
  );
}

// Handle error with appropriate UI feedback
export function handleError(error: AppError | any, retry?: () => Promise<any>): void {
  // Parse error if it's not already an AppError
  const appError: AppError = 'type' in error ? error : parseApiError(error);
  
  // Log error to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', appError);
  }
  
  // Send error to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement error logging to a service like Sentry
    // sendToErrorMonitoring(appError);
  }
  
  // Show toast notification based on severity
  switch (appError.severity) {
    case ErrorSeverity.INFO:
      toast.info(appError.message);
      break;
    case ErrorSeverity.WARNING:
      toast.warning(appError.message, {
        action: appError.retryable && retry ? {
          label: 'Retry',
          onClick: () => retry()
        } : undefined
      });
      break;
    case ErrorSeverity.ERROR:
      toast.error(appError.message, {
        action: appError.retryable && retry ? {
          label: 'Retry',
          onClick: () => retry()
        } : undefined
      });
      break;
    case ErrorSeverity.CRITICAL:
      toast.error(appError.message, {
        duration: 10000, // Longer duration for critical errors
        action: {
          label: 'Contact Support',
          onClick: () => window.open('/contact', '_blank')
        }
      });
      break;
  }
  
  // Handle specific error types
  switch (appError.type) {
    case ErrorType.AUTHENTICATION:
      // Redirect to login if authentication error
      // router.push('/login');
      break;
    case ErrorType.SERVER:
      // Maybe show a more detailed error page for server errors
      break;
    default:
      break;
  }
}

// Retry mechanism with exponential backoff
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let retries = 0;
  
  while (true) {
    try {
      return await fn();
    } catch (error) {
      const appError = parseApiError(error);
      
      // Don't retry if the error is not retryable or we've reached max retries
      if (!appError.retryable || retries >= maxRetries) {
        handleError(appError);
        throw appError;
      }
      
      // Calculate delay with exponential backoff
      const delay = initialDelay * Math.pow(2, retries);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      
      retries++;
    }
  }
}
