import React from 'react'
import { Card, CardContent } from "../../../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";


const Safety = ({ data }) => {


  const ratingData = [
    { name: "Overall Rating", value: data.overallRating },
    { name: "Max (10)", value: 10 - data.overallRating },
  ];

  const COLORS = ["#e77223", "#F4EFEB"];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col px-4 md:px-20 py-5 ">
        {/* Section Intro */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-foreground tracking-light text-[32px] font-bold leading-tight">
              Safety Overview
            </p>
            <p className="text-muted-foreground text-sm">
              Explore key safety insights including crime rate, common risks,
              emergency contacts, and recommendations.
            </p>
          </div>
        </div>

        {/* Chart */}
        <h2 className="text-foreground text-[22px] font-bold px-4 pb-3 pt-5">
          Overall Safety Rating
        </h2>
        <Card className="rounded-xl border p-6 mx-4">
          <CardContent className="flex flex-col items-center">
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ratingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-foreground text-xl font-bold mt-4">
              {data.overallRating}/10
            </p>
            <p className="text-muted-foreground text-sm">Safety Index</p>
          </CardContent>
        </Card>

        {/* Safety Details */}
        <h2 className="text-foreground text-[22px] font-bold px-4 pb-3 pt-8">
          Safety Details
        </h2>
        <div className="flex flex-col gap-4 px-4">
          <Card className="p-6">
            <p className="text-base font-medium text-foreground">Crime Rate</p>
            <p className="text-lg font-bold">{data.crimeRate}</p>
          </Card>

          <Card className="p-6">
            <p className="text-base font-medium text-foreground">
              Common Risks
            </p>
            <ul className="list-disc pl-5 text-muted-foreground">
              {data.commonRisks.map((risk, i) => (
                <li key={i}>{risk}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <p className="text-base font-medium text-foreground">
              Emergency Numbers
            </p>
            <p className="text-lg font-bold">{data.emergencyNumber}</p>
          </Card>

          <Card className="p-6">
            <p className="text-base font-medium text-foreground">Safe Times</p>
            <p className="text-lg font-bold">{data.safeTimes}</p>
          </Card>
        </div>

        {/* Recommendations */}
        <h2 className="text-foreground text-[22px] font-bold px-4 pb-3 pt-8">
          Recommendations
        </h2>
        <div className="px-4">
          {data.recommendations.map((rec, i) => (
            <label key={i} className="flex gap-x-3 py-3 flex-row items-start">
              <input
                type="checkbox"
                className="h-5 w-5 mt-1 rounded border-muted border-2 bg-transparent text-primary 
                  checked:bg-primary checked:border-primary focus:ring-0 focus:outline-none"
              />
              <p className="text-foreground text-base">{rec}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Safety


