"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const STATS_API_URL =
  "http://localhost:5000/api/tasks/stats";

export interface DashboardStatsData {
  total: number;
  backlog: number;
  todo: number;
  inProgress: number;
  review: number;
  done: number;
  cancelled: number;
  overdue: number;
}

interface DashboardStatsContextType {
  stats: DashboardStatsData;
  refreshStats: () => Promise<void>;
}

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

const DashboardStatsContext =
  createContext<
    DashboardStatsContextType | undefined
  >(undefined);

export function DashboardStatsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stats, setStats] =
    useState<DashboardStatsData>(defaultStats);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(
        STATS_API_URL,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch stats"
        );
      }

      const result =
        await response.json();

      if (result.success) {
        setStats({
          ...defaultStats,
          ...result.data,
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch stats:",
        error
      );
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <DashboardStatsContext.Provider
      value={{
        stats,
        refreshStats: fetchStats,
      }}
    >
      {children}
    </DashboardStatsContext.Provider>
  );
}

export function useDashboardStats() {
  const context = useContext(
    DashboardStatsContext
  );

  if (!context) {
    throw new Error(
      "useDashboardStats must be used inside DashboardStatsProvider"
    );
  }

  return context;
}