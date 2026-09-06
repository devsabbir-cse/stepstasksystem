"use client";

import React, { useEffect, useState } from "react";

import DashboardHeader from "@/app/dashboard/Components/DashboardHeader";
import DashboardStats, {
  DashboardStatsData,
} from "@/app/dashboard/Components/DashboardStats";

import TaskProgress from "@/app/dashboard/Components/TaskProgress";
import RecentTasks from "@/app/dashboard/Components/RecentTasks";
import QuickActions from "@/app/dashboard/Components/QuickActions";

const defaultStats: DashboardStatsData = {
  total: 0,
  backlog: 0,
  todo: 0,
  inProgress: 0,
  review: 0,
  done: 0,
  cancelled: 0,
  overdue: 0,
};


const Dashboard = () => {
  const [stats, setStats] =
    useState<DashboardStatsData>(
      defaultStats
    );
const [wAdjust, setWAdjust] = useState(false);

useEffect(() => {
  const updateWAdjust = () => {
    const value =
      localStorage.getItem("wAdjust") === "true";

    setWAdjust(value);
  };

  // প্রথমবার value নেওয়া
  updateWAdjust();

  // localStorage change হলে value নেওয়া
  window.addEventListener("wAdjustChange", updateWAdjust);

  return () => {
    window.removeEventListener(
      "wAdjustChange",
      updateWAdjust
    );
  };
}, []);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "/api/dashboard/stats",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch dashboard stats"
          );
        }

        const result =
          await response.json();

        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error(
          "Dashboard stats error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  

  return (
    <div
  className={`
    min-h-screen
    bg-gray-50
    pb-24
    lg:pb-8
    transition-[margin]
    duration-500
    ease-in-out
    ${wAdjust ? "ml-10" : "ml-55"}
  `}
>

      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">

        {/* HEADER */}

        <DashboardHeader />

        {/* STATS */}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">

            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="h-32 rounded-2xl bg-white border border-gray-100 animate-pulse"
              />
            ))}

          </div>
        ) : (
          <DashboardStats
            stats={stats}
          />
        )}

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">

          {/* TASK PROGRESS */}

          <div className="xl:col-span-1">
            <TaskProgress
              stats={stats}
            />
          </div>

          {/* RECENT TASKS */}

          <div className="xl:col-span-2">
            <RecentTasks />
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <QuickActions />

      </div>

    </div>
  );
};

export default Dashboard;