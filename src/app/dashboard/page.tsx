"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists
    const userData = localStorage.getItem('user');

    // If no user data, create a default user
    if (!userData) {
      const defaultUser = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        email: 'guest@example.com',
        firstName: 'Guest',
        lastName: 'User'
      };

      // Store the default user
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(defaultUser));

      setUser(defaultUser);
    } else {
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today's Exercises</CardTitle>
                  <CardDescription>Your scheduled exercises for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">3 exercises</p>
                  <Button className="mt-4 w-full">View Exercises</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Progress</CardTitle>
                  <CardDescription>Your recovery progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">68%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <Button className="mt-2 w-full">View Details</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Next Appointment</CardTitle>
                  <CardDescription>Your upcoming session</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Tomorrow, 2:00 PM</p>
                  <Button className="mt-4 w-full">Join Session</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest exercises and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold">{i}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Completed Exercise {i}</h3>
                        <p className="text-sm text-gray-500">{i} day{i > 1 ? 's' : ''} ago</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-green-600 font-medium">+{i * 5} points</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
