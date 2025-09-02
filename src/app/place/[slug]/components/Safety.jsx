import React from 'react'
import { Card, CardContent } from "../../../components/ui/card";
import ChartBarMultiple from '../../../components/LineChart'

import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Safety = ({ data }) => {
  // Error handling for missing data
  if (!data) {
    return (
      <div className="px-4 md:px-20 py-8 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No safety data available</p>
      </div>
    );
  }

  // Extract safety data from the nested aiSafety object
  const {
    aiSafety = {},
    emergencyNumber = "",
  } = data;

  const {
    overallRating = 0,
    interpretedCrimeRate = [],
    commonRisks = [],
    recommendations = []
  } = aiSafety;

  // Default rating if not provided
  const safetyRating = overallRating || 0;

  const ratingData = [
    { name: "Overall Rating", value: safetyRating },
    { name: "Max (10)", value: Math.max(0, 10 - safetyRating) },
  ];

  const COLORS = ["#e77223", "#F4EFEB"];

  // Check if any safety data exists
  const hasSafetyData = commonRisks.length > 0 || recommendations.length > 0 || overallRating > 0 || interpretedCrimeRate.length > 0;

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

        {/* Chart - Only show if rating data exists */}
        {safetyRating > 0 ? (
          <>
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
                      <Tooltip formatter={(value) => [`${value}/10`, 'Rating']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-foreground text-xl font-bold mt-4">
                  {safetyRating}/10
                </p>
                <p className="text-muted-foreground text-sm">Safety Index</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <h2 className="text-foreground text-[22px] font-bold px-4 pb-3 pt-5">
              Overall Safety Rating
            </h2>
            <Card className="rounded-xl border p-6 mx-4">
              <CardContent className="flex flex-col items-center justify-center h-64">
                <p className="text-muted-foreground text-center">
                  Safety rating data not available
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {/* Safety Details */}
        <h2 className="text-foreground text-[22px] font-bold px-4 pb-3 pt-8">
          Safety Details
        </h2>
        <div className="flex flex-col gap-4 px-4">

          <ChartBarMultiple chartData={interpretedCrimeRate} />

          {/* Common Risks */}
          <Card className="p-6">
            <p className="text-base font-medium text-foreground">
              Common Risks
            </p>
            {commonRisks.length > 0 ? (
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {commonRisks.map((risk, i) => (
                  <li key={i}>{risk}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No common risks data available</p>
            )}
          </Card>

          {/* Emergency Numbers */}
          <Card className="p-6">
            <p className="text-base font-medium text-foreground">
              Emergency Numbers
            </p>
            <p className="text-lg font-bold text-red-600">{emergencyNumber || "911"}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Dial in case of emergency
            </p>
          </Card>
        </div>

        {/* Recommendations */}
        <h2 className="text-foreground text-[22px] font-bold px-4 pb-3 pt-8">
          Safety Recommendations
        </h2>
        <div className="px-4">
          {recommendations.length > 0 ? (
            recommendations.map((rec, i) => (
              <label key={i} className="flex gap-x-3 py-3 flex-row items-start cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5 mt-1 rounded border-muted border-2 bg-transparent text-primary 
                    checked:bg-primary checked:border-primary focus:ring-0 focus:outline-none cursor-pointer"
                />
                <p className="text-foreground text-base leading-relaxed">{rec}</p>
              </label>
            ))
          ) : (
            <Card className="p-6">
              <p className="text-muted-foreground text-center">
                No safety recommendations available at the moment
              </p>
            </Card>
          )}
        </div>

        {/* No Data Message */}
        {!hasSafetyData && (
          <div className="px-4 py-8 flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">No safety information available</p>
              <p className="text-sm text-muted-foreground">Safety data will be displayed here when available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Safety