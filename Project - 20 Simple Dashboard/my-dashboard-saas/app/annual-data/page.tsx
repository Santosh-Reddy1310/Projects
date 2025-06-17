"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateRandomMonthlyData, MonthlyData } from "@/lib/data"; // Re-using monthly data for annual visualization
import { useEffect, useState } from "react";

export default function AnnualDataPage() {
  const [annualData, setAnnualData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    // For annual, we might aggregate monthly data or generate specific annual
    // For simplicity, let's just get more monthly data and interpret it annually
    setAnnualData(generateRandomMonthlyData(60)); // Last 5 years (60 months)
  }, []);

  // Simple aggregation for demonstration (you'd do this more robustly with real data)
  const aggregatedAnnualData = annualData.reduce((acc, current) => {
    const year = current.month.split("'")[1]; // Get year from "Jan '23" format
    const existingYear = acc.find(item => item.month === `Year '${year}`);

    if (existingYear) {
      existingYear.subscribers += current.subscribers;
      existingYear.mrr += current.mrr;
    } else {
      acc.push({
        month: `Year '${year}`, // Renaming to represent year
        subscribers: current.subscribers,
        mrr: current.mrr,
      });
    }
    return acc;
  }, [] as MonthlyData[]);


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <h1 className="text-2xl font-semibold">Annual Data Overview</h1>
      </header>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Annual Growth & Revenue</CardTitle>
          <CardDescription>
            Long-term trends for subscribers and Monthly Recurring Revenue on an annual basis.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={aggregatedAnnualData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'Subscribers', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: 'MRR ($)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="subscribers" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="mrr" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  );
}