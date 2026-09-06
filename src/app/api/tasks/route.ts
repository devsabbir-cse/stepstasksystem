import { NextResponse } from "next/server";
import tasks from "@/data/tasks.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const memberId = searchParams.get("memberId");
    const search = searchParams.get("search");

    let result = [...tasks];

    // =========================
    // STATUS FILTER
    // =========================

    if (status) {
      result = result.filter(
        (task) => task.status === status
      );
    }

    // =========================
    // MEMBER FILTER
    // =========================

    if (memberId) {
      result = result.filter(
        (task) =>
          task.memberId.toString() === memberId
      );
    }

    // =========================
    // SEARCH
    // =========================

    if (search) {
      const searchText =
        search.toLowerCase();

      result = result.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(searchText) ||
          task.member
            .toLowerCase()
            .includes(searchText)
      );
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Tasks API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tasks",
      },
      {
        status: 500,
      }
    );
  }
}