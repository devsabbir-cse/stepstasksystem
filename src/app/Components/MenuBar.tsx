"use client";

import DesktopSideBar from "./DesktopSideBar";
import MobileBottomBar from "./MobileBottomBar";

const SideMenuBar = () => {
  return (
    <>
      {/* Desktop */}
      <DesktopSideBar />

      {/* Mobile + Tablet */}
      <MobileBottomBar />
    </>
  );
};

export default SideMenuBar;