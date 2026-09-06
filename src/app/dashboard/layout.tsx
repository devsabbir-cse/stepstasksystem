"use client";

import React, { useState } from "react";

import SideMenuBar from "@/app/Components/MenuBar";


interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: LayoutProps) {
  return (
      <div className="flex min-h-screen  bg-gray-50">

        {/* LEFT SIDEBAR */}
        <SideMenuBar />

        {/* CENTER CONTENT */}
        <main
          className="
            min-w-0
            flex-1
            p-6
            transition-all
            duration-300
          "
        >
          {children}
        </main>

        {/* RIGHT SIDEBAR */}
        {/* <DashboardRightSidebar /> */}
      </div>
  );
}