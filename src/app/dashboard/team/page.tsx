'use client'
import React, { useEffect, useState } from 'react'

const page = () => {

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
    ${wAdjust ? "ml-20" : "ml-65"}
  `}
>hello</div>
  )
}

export default page