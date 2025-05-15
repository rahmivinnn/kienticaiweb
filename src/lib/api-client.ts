"use client";

import { handleError, retryWithBackoff } from './error-handling';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Default request timeout in milliseconds
const DEFAULT_TIMEOUT = 10000;

// Token storage keys
const ACCESS_TOKEN_KEY = 'kinetic_access_token';
const REFRESH_TOKEN_KEY = 'kinetic_refresh_token';

// Request options interface
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  withAuth?: boolean;
  retries?: number;
}

// Response interface
interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

// Get stored tokens
export function getTokens() {
  if (typeof window === 'undefined') return { accessToken: null, refreshToken: null };
  
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY)
  };
}

// Store tokens
export function storeTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

// Clear tokens
export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Refresh access token
async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = getTokens();
  
  if (!refreshToken) {
    clearTokens();
    return null;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });
    
    if (!response.ok) {
      clearTokens();
      return null;
    }
    
    const data = await response.json();
    storeTokens(data.accessToken, data.refreshToken || refreshToken);
    return data.accessToken;
  } catch (error) {
    clearTokens();
    return null;
  }
}

// Main API request function
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = DEFAULT_TIMEOUT,
    withAuth = true,
    retries = 1
  } = options;
  
  // Prepare request headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  };
  
  // Add authorization header if required
  if (withAuth) {
    let { accessToken } = getTokens();
    
    // If no access token, try to refresh
    if (!accessToken) {
      accessToken = await refreshAccessToken();
      
      // If still no access token, throw error
      if (!accessToken) {
        throw new Error('Authentication required');
      }
    }
    
    requestHeaders['Authorization'] = `Bearer ${accessToken}`;
  }
  
  // Prepare request options
  const fetchOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: 'include'
  };
  
  // Add body for non-GET requests
  if (method !== 'GET' && body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }
  
  // Create abort controller for timeout
  const controller = new AbortController();
  fetchOptions.signal = controller.signal;
  
  // Set timeout
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    // Make request with retry mechanism
    const makeRequest = async () => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
      
      // Handle token expiration
      if (response.status === 401 && withAuth) {
        const newToken = await refreshAccessToken();
        
        if (newToken) {
          // Update authorization header with new token
          requestHeaders['Authorization'] = `Bearer ${newToken}`;
          fetchOptions.headers = requestHeaders;
          
          // Retry request with new token
          const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
          
          if (retryResponse.ok) {
            const data = await retryResponse.json();
            return { data, status: retryResponse.status, headers: retryResponse.headers };
          }
          
          throw new Error(`Request failed with status ${retryResponse.status}`);
        }
        
        throw new Error('Authentication required');
      }
      
      // Handle successful response
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        let data: any;
        
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        
        return { data, status: response.status, headers: response.headers };
      }
      
      // Handle error response
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || `Request failed with status ${response.status}`);
      Object.assign(error, { response: { status: response.status, data: errorData } });
      throw error;
    };
    
    // Execute request with retry mechanism
    return await retryWithBackoff(makeRequest, retries);
  } catch (error) {
    // Handle and rethrow error
    handleError(error);
    throw error;
  } finally {
    // Clear timeout
    clearTimeout(timeoutId);
  }
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T = any>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method'>) => 
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),
    
  put: <T = any>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method'>) => 
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),
    
  patch: <T = any>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method'>) => 
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body }),
    
  delete: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method'>) => 
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' })
};
