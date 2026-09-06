"use client";

import { useEffect, useState } from "react";

type ScreenType = "mobile" | "tablet" | "desktop";

export default function useScreenType() {
  const [screenType, setScreenType] =
    useState<ScreenType>("desktop");

  useEffect(() => {
    const updateScreenType = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreenType("mobile");
      } else if (width < 1024) {
        setScreenType("tablet");
      } else {
        setScreenType("desktop");
      }
    };

    updateScreenType();

    window.addEventListener(
      "resize",
      updateScreenType
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateScreenType
      );
    };
  }, []);

  return screenType;
}