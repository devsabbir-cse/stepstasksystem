import { NextResponse } from "next/server";
import tasks from "@/data/tasks.json";

export async function GET() {
  try {
    const total = tasks.length;

    const backlog = tasks.filter(
      (task) => task.status === "backlog"
    ).length;

    const todo = tasks.filter(
      (task) => task.status === "todo"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "nprogress"
    ).length;

    const review = tasks.filter(
      (task) => task.status === "review"
    ).length;

    const done = tasks.filter(
      (task) => task.status === "done"
    ).length;

    const cancelled = tasks.filter(
      (task) => task.status === "cancel"
    ).length;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const overdue = tasks.filter(
      (task) =>
        task.status !== "done" &&
        task.status !== "cancel" &&
        task.dueDate < today
    ).length;

    return NextResponse.json({
      success: true,

      data: {
        total,
        backlog,
        todo,
        inProgress,
        review,
        done,
        cancelled,
        overdue,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard statistics",
      },
      {
        status: 500,
      }
    );
  }
}