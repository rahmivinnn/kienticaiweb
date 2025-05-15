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
    <div className="min-h-screen bg-[#F0F4FA] flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-[60px]">
        <DashboardHeader user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.firstName || 'Sarah'}</h1>
            <h2 className="text-lg text-gray-600 mb-6">Today's Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 mr-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2V5" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 2V5" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 9.09H20.5" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#000000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">UPCOMING</span>
                  </div>
                  <CardTitle className="text-lg">Next Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Today at 2:30 PM with Dr. Johnson</p>
                  <div className="flex mt-4 space-x-2">
                    <Button size="sm" className="bg-black text-white hover:bg-gray-800">Join Call</Button>
                    <Button size="sm" variant="outline" className="border-gray-300">Reschedule</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 mr-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">EXERCISES</span>
                  </div>
                  <CardTitle className="text-lg">Daily Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">3 of 5 exercises completed</p>
                  <div className="flex mt-4 space-x-2">
                    <Button size="sm" className="bg-black text-white hover:bg-gray-800">Continue</Button>
                    <Button size="sm" variant="outline" className="border-gray-300">View All</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 mr-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.88 18.15V16.08" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M12 18.15V14.01" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M17.12 18.15V11.93" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M17.12 5.85V5.85" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M6.88 10.77V5.85" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M12 8.7V5.85" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">PROGRESS</span>
                  </div>
                  <CardTitle className="text-lg">Recovery Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">70% improvement since last assessment</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3 mb-4">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-1 border-gray-300">View Details</Button>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Submit New Video</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="exerciseType">Exercise Type</Label>
                      <div className="relative mt-1">
                        <select
                          id="exerciseType"
                          className="w-full p-2 pr-10 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select exercise from your plan</option>
                          <option value="knee">Knee Flexion</option>
                          <option value="shoulder">Shoulder Rotation</option>
                          <option value="ankle">Ankle Mobility</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes for your physiotherapist</Label>
                      <textarea
                        id="notes"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Describe any pain or difficulties you experienced"
                      ></textarea>
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800">
                      Upload Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                        <BarChart2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">AI Analysis Complete</h3>
                          <button className="text-gray-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">Your video from 10th has been analyzed</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">New Message</h3>
                          <button className="text-gray-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">Dr. Johnson: "Great progress on your knee exercises!"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-3">Movement Analysis</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your range of motion has improved by 15% this week. The AI model has detected better form in your knee exercises.
                  </p>
                  <Button variant="outline" className="border-gray-300">View Detailed Report</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
