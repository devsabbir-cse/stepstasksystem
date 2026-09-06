import { NextRequest, NextResponse } from "next/server";
import tasks from "@/data/tasks.json";

interface Task {
  TID: number;
  TMID: number;
  TASK_TITLE: string;
  TASK_DESC: string;
  STATUS: number;
  STATUS_NAME: string;
  TIMELINE: string;
  PRIORITY: number;
  PRIORITY_NAME: string;
  CREATED_AT: string;
  MEMBER_NAME: string;
  MEMBER_EMAIL: string;
  MEMBER_POSITION: string;
}

const allTasks: Task[] = tasks;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // ==============================
    // PAGINATION
    // ==============================

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.max(
      Number(searchParams.get("limit")) || 10,
      1
    );

    // ==============================
    // FILTERS
    // ==============================

    const search =
      searchParams.get("search")?.toLowerCase() || "";

    const status =
      searchParams.get("status")
        ?.split(",")
        .filter(Boolean) || [];

    const priority =
      searchParams.get("priority")
        ?.split(",")
        .filter(Boolean) || [];

    const member =
      searchParams.get("member")
        ?.split(",")
        .filter(Boolean) || [];

    const timelineFrom =
      searchParams.get("timelineFrom") || "";

    const timelineTo =
      searchParams.get("timelineTo") || "";

    const createdFrom =
      searchParams.get("createdFrom") || "";

    const createdTo =
      searchParams.get("createdTo") || "";

    // ==============================
    // SORT
    // ==============================

    const sortBy =
      searchParams.get("sortBy") || "created";

    const sortOrder =
      searchParams.get("sortOrder") === "ASC"
        ? "ASC"
        : "DESC";

    // ==============================
    // FILTER DATA
    // ==============================

    let filteredTasks = [...allTasks];

    // SEARCH
    if (search) {
      filteredTasks = filteredTasks.filter((task) =>
        [
          task.TASK_TITLE,
          task.TASK_DESC,
          task.MEMBER_NAME,
          task.MEMBER_EMAIL,
          task.MEMBER_POSITION,
          task.STATUS_NAME,
          task.PRIORITY_NAME,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search)
      );
    }

    // STATUS
    if (status.length > 0) {
      filteredTasks = filteredTasks.filter((task) =>
        status.includes(String(task.STATUS))
      );
    }

    // PRIORITY
    if (priority.length > 0) {
      filteredTasks = filteredTasks.filter((task) =>
        priority.includes(String(task.PRIORITY))
      );
    }

    // MEMBER
    if (member.length > 0) {
      filteredTasks = filteredTasks.filter((task) =>
        member.includes(String(task.TMID))
      );
    }

    // TIMELINE FROM
    if (timelineFrom) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          new Date(task.TIMELINE) >=
          new Date(timelineFrom)
      );
    }

    // TIMELINE TO
    if (timelineTo) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          new Date(task.TIMELINE) <=
          new Date(`${timelineTo}T23:59:59`)
      );
    }

    // CREATED FROM
    if (createdFrom) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          new Date(task.CREATED_AT) >=
          new Date(createdFrom)
      );
    }

    // CREATED TO
    if (createdTo) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          new Date(task.CREATED_AT) <=
          new Date(`${createdTo}T23:59:59`)
      );
    }

    // ==============================
    // SORT DATA
    // ==============================

    filteredTasks.sort((a, b) => {
      let valueA: string | number = "";
      let valueB: string | number = "";

      switch (sortBy) {
        case "title":
          valueA = a.TASK_TITLE.toLowerCase();
          valueB = b.TASK_TITLE.toLowerCase();
          break;

        case "priority":
          valueA = a.PRIORITY;
          valueB = b.PRIORITY;
          break;

        case "timeline":
          valueA = new Date(a.TIMELINE).getTime();
          valueB = new Date(b.TIMELINE).getTime();
          break;

        case "status":
          valueA = a.STATUS;
          valueB = b.STATUS;
          break;

        case "created":
        default:
          valueA = new Date(a.CREATED_AT).getTime();
          valueB = new Date(b.CREATED_AT).getTime();
          break;
      }

      if (valueA < valueB) {
        return sortOrder === "ASC" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === "ASC" ? 1 : -1;
      }

      return 0;
    });

    // ==============================
    // PAGINATION
    // ==============================

    const total = filteredTasks.length;

    const totalPages = Math.ceil(total / limit);

    const startIndex = (page - 1) * limit;

    const endIndex = startIndex + limit;

    const paginatedTasks = filteredTasks.slice(
      startIndex,
      endIndex
    );

    // ==============================
    // RESPONSE
    // ==============================

    return NextResponse.json({
      success: true,

      data: paginatedTasks,

      pagination: {
        total,
        page,
        limit,
        totalPages,

        hasNextPage:
          page < totalPages,

        hasPreviousPage:
          page > 1,
      },
    });
  } catch (error) {
    console.error("Tasks API Error:", error);

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