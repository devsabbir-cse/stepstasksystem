"use client";

import {
  Suspense,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  RefreshCw,
  Search,
} from "lucide-react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type {
  Task,
  TeamMember,
  Pagination,
  TaskFilters,
  TaskApiResponse,
} from "@/types/task";

import TaskTable from "./components/TaskTable";
import TaskPagination from "./components/TaskPagination";
import ShareFilterButton from "./components/ShareFilterButton";

import MobileTaskDashboard from "./MobileTaskList";
import TabletTaskDashboard from "./TabletTaskDashboard";

import useScreenType from "./hooks/useScreenType";
import { log } from "console";

// ======================================================
// API
// ======================================================

const API_URL =
  "http://test4180.atwebpages.com/getTasks.php";

// ======================================================
// DEFAULT PAGINATION
// ======================================================

const defaultPagination: Pagination = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

// ======================================================
// DASHBOARD CONTENT
// ======================================================

const DashboardContent = () => {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams =
    useSearchParams();

  // ======================================================
  // SCREEN TYPE
  // ======================================================

  const screenType =
    useScreenType();

  // ======================================================
  // DATA
  // ======================================================

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [members, setMembers] =
    useState<TeamMember[]>([]);

  const [
    pagination,
    setPagination,
  ] = useState<Pagination>(
    defaultPagination
  );

  // ======================================================
  // FILTERS
  // ======================================================

  const [
    filters,
    setFilters,
  ] = useState<TaskFilters>({
    search: "",
    status: [],
    priority: [],
    member: [],
    timelineFrom: "",
    timelineTo: "",
    createdFrom: "",
    createdTo: "",
    sortBy: "created",
    sortOrder: "DESC",
    page: 1,
    limit: 10,
  });

  // ======================================================
  // LOADING
  // ======================================================

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ======================================================
  // URL → FILTERS
  // ======================================================

  useEffect(() => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    const urlFilters: TaskFilters = {
      search:
        params.get("search") || "",

      status:
        params.get("status")
          ? params
              .get("status")!
              .split(",")
              .filter(Boolean)
          : [],

      priority:
        params.get("priority")
          ? params
              .get("priority")!
              .split(",")
              .filter(Boolean)
          : [],

      member:
        params.get("member")
          ? params
              .get("member")!
              .split(",")
              .filter(Boolean)
          : [],

      timelineFrom:
        params.get("timelineFrom") || "",

      timelineTo:
        params.get("timelineTo") || "",

      createdFrom:
        params.get("createdFrom") || "",

      createdTo:
        params.get("createdTo") || "",

      sortBy:
        params.get("sortBy") ||
        "created",

      sortOrder:
        params.get("sortOrder") ===
        "ASC"
          ? "ASC"
          : "DESC",

      page: Math.max(
        Number(
          params.get("page") || 1
        ),
        1
      ),

      limit: Math.max(
        Number(
          params.get("limit") || 10
        ),
        1
      ),
    };

    setFilters(urlFilters);
  }, [searchParams]);

  // ======================================================
  // UPDATE URL
  // ======================================================

  const updateURL = (
    newFilters: TaskFilters
  ) => {
    const params =
      new URLSearchParams();

    if (newFilters.search) {
      params.set(
        "search",
        newFilters.search
      );
    }

    if (newFilters.status.length) {
      params.set(
        "status",
        newFilters.status.join(",")
      );
    }

    if (newFilters.priority.length) {
      params.set(
        "priority",
        newFilters.priority.join(",")
      );
    }

    if (newFilters.member.length) {
      params.set(
        "member",
        newFilters.member.join(",")
      );
    }

    if (newFilters.timelineFrom) {
      params.set(
        "timelineFrom",
        newFilters.timelineFrom
      );
    }

    if (newFilters.timelineTo) {
      params.set(
        "timelineTo",
        newFilters.timelineTo
      );
    }

    if (newFilters.createdFrom) {
      params.set(
        "createdFrom",
        newFilters.createdFrom
      );
    }

    if (newFilters.createdTo) {
      params.set(
        "createdTo",
        newFilters.createdTo
      );
    }

    if (newFilters.sortBy) {
      params.set(
        "sortBy",
        newFilters.sortBy
      );
    }

    if (newFilters.sortOrder) {
      params.set(
        "sortOrder",
        newFilters.sortOrder
      );
    }

    params.set(
      "page",
      newFilters.page.toString()
    );

    params.set(
      "limit",
      newFilters.limit.toString()
    );

    router.replace(
      `${pathname}?${params.toString()}`
    );
  };

  // ======================================================
  // TASK UPDATE
  // ======================================================

  const handleTaskUpdate = (
    updatedTask: Task
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.TID === updatedTask.TID
          ? updatedTask
          : task
      )
    );

    toast.success(
      "Task updated successfully!"
    );
  };

  // ======================================================
  // FILTER CHANGE
  // ======================================================

  const changeFilters = (
    changes: Partial<TaskFilters>
  ) => {
    const updated: TaskFilters = {
      ...filters,
      ...changes,
      page: 1,
    };

    setFilters(updated);

    updateURL(updated);
  };

  // ======================================================
  // SORT
  // ======================================================

  const handleSort = (
    field: string
  ) => {
    const updated: TaskFilters = {
      ...filters,

      sortBy: field,

      sortOrder:
        filters.sortBy === field &&
        filters.sortOrder === "ASC"
          ? "DESC"
          : "ASC",

      page: 1,
    };

    setFilters(updated);

    updateURL(updated);
  };

  // ======================================================
  // PAGE CHANGE
  // ======================================================

  const handlePageChange = (
    page: number
  ) => {
    const updated: TaskFilters = {
      ...filters,
      page,
    };

    setFilters(updated);

    updateURL(updated);
  };

  // ======================================================
  // FETCH TASKS
  // ======================================================

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        setError("");

        const params =
          new URLSearchParams();

        params.set(
          "page",
          filters.page.toString()
        );

        params.set(
          "limit",
          filters.limit.toString()
        );

        if (filters.search) {
          params.set(
            "search",
            filters.search
          );
        }

        if (
          filters.status.length
        ) {
          params.set(
            "status",
            filters.status.join(",")
          );
        }

        if (
          filters.priority.length
        ) {
          params.set(
            "priority",
            filters.priority.join(",")
          );
        }

        if (
          filters.member.length
        ) {
          params.set(
            "member",
            filters.member.join(",")
          );
        }

        if (
          filters.timelineFrom
        ) {
          params.set(
            "timelineFrom",
            filters.timelineFrom
          );
        }

        if (
          filters.timelineTo
        ) {
          params.set(
            "timelineTo",
            filters.timelineTo
          );
        }

        if (
          filters.createdFrom
        ) {
          params.set(
            "createdFrom",
            filters.createdFrom
          );
        }

        if (
          filters.createdTo
        ) {
          params.set(
            "createdTo",
            filters.createdTo
          );
        }

        params.set(
          "sortBy",
          filters.sortBy
        );

        params.set(
          "sortOrder",
          filters.sortOrder
        );

        const response =
          await fetch(
            `${API_URL}?${params.toString()}`
          );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch tasks"
          );
        }

        const result: TaskApiResponse =
          await response.json();
          console.log("Fetched tasks:", result);

        if (!result.success) {
          throw new Error(
            "Failed to load tasks"
          );
        }

        setTasks(
          result.data || []
        );

        setPagination(
          result.pagination ||
            defaultPagination
        );

      } catch (err) {
        console.error(
          "Task fetch error:",
          err
        );

        setError(
          "Failed to load tasks."
        );

        setTasks([]);

      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

  }, [filters]);

  // ======================================================
  // FETCH MEMBERS
  // ======================================================

  useEffect(() => {
    const fetchMembers =
      async () => {
        try {
          const response =
            await fetch(
              "http://test4180.atwebpages.com/teamMembers.php"
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch members"
            );
          }

          const result =
            await response.json();

          setMembers(
            result.data || []
          );

        } catch (error) {
          console.error(
            "Member fetch error:",
            error
          );
        }
      };

    fetchMembers();

  }, []);

  // ======================================================
  // REFRESH
  // ======================================================

  const handleRefresh = () => {
    window.location.reload();
  };

  // ======================================================
  // SIDEBAR WIDTH
  // ======================================================

  const [
    wAdjust,
    setWAdjust,
  ] = useState(false);

  useEffect(() => {
    const updateWAdjust = () => {
      const value =
        localStorage.getItem(
          "wAdjust"
        ) === "true";

      setWAdjust(value);
    };

    updateWAdjust();

    window.addEventListener(
      "wAdjustChange",
      updateWAdjust
    );

    return () => {
      window.removeEventListener(
        "wAdjustChange",
        updateWAdjust
      );
    };
  }, []);

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div
      className={`
        min-h-screen
        w-full
        max-w-full
        overflow-x-hidden
        bg-gray-50
        pb-24
        transition-all
        duration-500
        ease-in-out

        lg:pb-8

        ${
          wAdjust
            ? "lg:w-[calc(100%-80px)] lg:ml-20"
            : "lg:w-[calc(100%-260px)] lg:ml-[260px]"
        }
      `}
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <div
        className="
          mb-6
          flex
          w-full
          min-w-0
          flex-col
          gap-4
          px-3

          sm:px-4

          md:flex-row
          md:items-center
          md:justify-between

          lg:px-6
        "
      >

        <div className="min-w-0">

          <h1
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            Task Dashboard
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Manage and monitor team tasks
          </p>

        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >

          <ShareFilterButton />

          <button
            type="button"
            onClick={handleRefresh}
            className="
              rounded-lg
              border
              border-gray-200
              bg-white
              p-2.5
              text-gray-600
              transition
              hover:text-orange-600
            "
          >
            <RefreshCw size={18} />
          </button>

        </div>

      </div>


      {/* ==================================================
          SEARCH
      ================================================== */}

      <div
        className="
          mb-4
          w-full
          min-w-0
          px-3

          sm:px-4

          lg:px-6
        "
      >

        <div
          className="
            w-full
            max-w-md
          "
        >

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                changeFilters({
                  search:
                    e.target.value,
                })
              }
              placeholder="Search task, member, email..."
              className="
                h-11
                w-full
                rounded-lg
                border
                border-gray-200
                bg-white
                pl-10
                pr-4
                text-sm
                outline-none
                transition

                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-100
              "
            />

          </div>

        </div>

      </div>


      {/* ==================================================
          RESPONSIVE TASK VIEW
      ================================================== */}

      <div
        className="
          mx-3
          min-w-0

          sm:mx-4

          lg:mx-6
        "
      >


        {/* ================================================
            MOBILE
        ================================================= */}

        {screenType === "mobile" && (

          <MobileTaskDashboard
            tasks={tasks}
            members={members}
            loading={loading}
            error={error}
          />

        )}


        {/* ================================================
            TABLET
        ================================================= */}

        {screenType === "tablet" && (

          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
              shadow-sm
            "
          >

            {loading ? (

              <div
                className="
                  flex
                  h-96
                  items-center
                  justify-center
                "
              >
                <RefreshCw
                  size={28}
                  className="
                    animate-spin
                    text-orange-500
                  "
                />
              </div>

            ) : error ? (

              <div
                className="
                  flex
                  h-96
                  items-center
                  justify-center
                  text-red-500
                "
              >
                {error}
              </div>

            ) : tasks.length === 0 ? (

              <div
                className="
                  flex
                  h-96
                  items-center
                  justify-center
                  text-gray-500
                "
              >
                No task found
              </div>

            ) : (

              <TabletTaskDashboard
                tasks={tasks}
                members={members}
                filters={filters}
                onTaskUpdate={
                  handleTaskUpdate
                }
              />

            )}

          </div>

        )}


        {/* ================================================
            DESKTOP
        ================================================= */}

        {screenType === "desktop" && (

          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
              shadow-sm
            "
          >

            {loading ? (

              <div
                className="
                  flex
                  h-96
                  items-center
                  justify-center
                "
              >
                <RefreshCw
                  size={28}
                  className="
                    animate-spin
                    text-orange-500
                  "
                />
              </div>

            ) : error ? (

              <div
                className="
                  flex
                  h-96
                  items-center
                  justify-center
                  text-red-500
                "
              >
                {error}
              </div>

            ) : tasks.length === 0 ? (

              <div
                className="
                  flex
                  h-96
                  items-center
                  justify-center
                  text-gray-500
                "
              >
                No task found
              </div>

            ) : (

              <TaskTable
                tasks={tasks}
                members={members}
                filters={filters}
                onFilterChange={
                  changeFilters
                }
                onSort={handleSort}
                onTaskUpdate={
                  handleTaskUpdate
                }
              />

            )}

          </div>

        )}


        {/* ================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          !error &&
          tasks.length > 0 && (

            <div className="mt-4">

              <TaskPagination
                page={pagination.page}
                totalPages={
                  pagination.totalPages
                }
                total={
                  pagination.total
                }
                limit={
                  pagination.limit
                }
                hasNextPage={
                  pagination.hasNextPage
                }
                hasPreviousPage={
                  pagination.hasPreviousPage
                }
                onPageChange={
                  handlePageChange
                }
              />

            </div>

          )}

      </div>

    </div>
  );
};


// ======================================================
// SUSPENSE WRAPPER
// ======================================================

const Page = () => {
  return (
    <Suspense
      fallback={
        <div
          className="
            flex
            min-h-screen
            items-center
            justify-center
          "
        >
          Loading dashboard...
        </div>
      }
    >

      <DashboardContent />

    </Suspense>
  );
};

export default Page;