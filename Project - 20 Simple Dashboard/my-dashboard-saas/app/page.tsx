"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { generateRandomDailyData, generateRandomMonthlyData, DailyData, MonthlyData } from "@/lib/data";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    setDailyData(generateRandomDailyData(30)); // Last 30 days
    setMonthlyData(generateRandomMonthlyData(12)); // Last 12 months
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <h1 className="text-2xl font-semibold">DashUI</h1>
      </header>

      {/* Changed grid layout for main content */}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">

        {/* Top statistic cards - now occupies 2/3 columns on larger screens */}
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2 transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle>Total Users</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Overview of your user base.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {dailyData.reduce((sum, d) => sum + d.users, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Monthly Recurring Revenue (MRR)</CardDescription>
                <CardTitle className="text-4xl">
                  ${monthlyData.reduce((sum, d) => sum + d.mrr, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +15.5% from last year
                </div>
              </CardContent>
            </Card>
            <Card className="transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>New Subscribers (Last 12 Months)</CardDescription>
                <CardTitle className="text-4xl">
                  {monthlyData.reduce((sum, d) => sum + d.subscribers, 0).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last year
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right sidebar for recent activity - now occupies 1/3 column */}
        <div className="grid gap-4 md:gap-8">
          <Card className="transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest updates from your SaaS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground">
                <li className="mb-2">New user signed up: John Doe (2 mins ago)</li>
                <li className="mb-2">Subscription upgraded: Jane Smith (1 hour ago)</li>
                <li className="mb-2">Payment received: Order #10023 (3 hours ago)</li>
                <li>New feature deployed: Dashboard v1.1 (yesterday)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tabs component (containing graphs) - now spans full width on larger screens */}
        {/* Use `col-span-full` to make it span all available columns in the parent grid */}
        <div className="lg:col-span-3 xl:col-span-3"> {/* This div now correctly spans all 3 columns */}
          <Tabs defaultValue="daily">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="daily">Daily View</TabsTrigger>
                <TabsTrigger value="monthly">Monthly View</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Download Report
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="daily">
              <Card className="transition-transform duration-200 hover:scale-[1.005] hover:shadow-md">
                <CardHeader className="px-7">
                  <CardTitle>Daily Trends</CardTitle>
                  <CardDescription>
                    Users and Revenue over the last 30 days.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} isAnimationActive={true} animationDuration={1500} />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" isAnimationActive={true} animationDuration={1500} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monthly">
              <Card className="transition-transform duration-200 hover:scale-[1.005] hover:shadow-md">
                <CardHeader className="px-7">
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>
                    Subscribers and MRR over the last 12 months.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="subscribers" fill="#8884d8" isAnimationActive={true} animationDuration={1500} />
                      <Bar yAxisId="right" dataKey="mrr" fill="#82ca9d" isAnimationActive={true} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}