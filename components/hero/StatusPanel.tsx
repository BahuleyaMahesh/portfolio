"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";

export function StatusPanel() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const updateTime = () => {
      // Calculate Bengaluru local time (GMT+5:30)
      const date = new Date();
      const utc = date.getTime() + date.getTimezoneOffset() * 60000;
      const ISTOffset = 5.5; // India Standard Time offset
      const localDate = new Date(utc + 3600000 * ISTOffset);
      
      const hours = String(localDate.getHours()).padStart(2, "0");
      const minutes = String(localDate.getMinutes()).padStart(2, "0");
      const seconds = String(localDate.getSeconds()).padStart(2, "0");
      
      setTime(`${hours}:${minutes}:${seconds} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Randomize telemetry ping latency
    const pingInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 8);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 rounded-lg border border-border-subtle bg-bg-card/30 backdrop-blur-sm font-mono text-[10px] text-text-secondary tracking-wider max-w-4xl mx-auto w-full select-none">
      {/* Col 1 */}
      <div className="flex flex-col space-y-1">
        <span className="text-text-muted uppercase">01 / INSTITUTION</span>
        <span className="font-semibold text-text-primary text-[11px] truncate">
          {siteConfig.university.toUpperCase()}
        </span>
      </div>

      {/* Col 2 */}
      <div className="flex flex-col space-y-1">
        <span className="text-text-muted uppercase">02 / DEPT</span>
        <span className="font-semibold text-text-primary text-[11px] truncate">
          B.E. COMPUTER SCIENCE (AI & ML)
        </span>
      </div>

      {/* Col 3 */}
      <div className="flex flex-col space-y-1">
        <span className="text-text-muted uppercase">03 / LOCAL TIME</span>
        <span className="font-semibold text-accent text-[11px]">
          {time || "00:00:00 IST"}
        </span>
      </div>

      {/* Col 4 */}
      <div className="flex flex-col space-y-1">
        <span className="text-text-muted uppercase">04 / SYSTEM LATENCY</span>
        <span className="font-semibold text-accent-secondary text-[11px] flex items-center space-x-1">
          <span>{latency} MS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-ping" />
        </span>
      </div>
    </div>
  );
}

export default StatusPanel;
