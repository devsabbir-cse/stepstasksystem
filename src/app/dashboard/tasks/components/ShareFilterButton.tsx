"use client";

import React, { useState } from "react";
import { Check, Link } from "lucide-react";

const ShareFilterButton = () => {

  const [copied, setCopied] =
    useState(false);

  const copyLink = async () => {

    await navigator.clipboard.writeText(
      window.location.href
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copyLink}
      className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-medium text-orange-700 transition hover:bg-orange-100"
    >

      {copied ? (
        <>
          <Check size={17} />
          Link Copied
        </>
      ) : (
        <>
          <Link size={17} />
          Share Filter
        </>
      )}

    </button>
  );
};

export default ShareFilterButton;