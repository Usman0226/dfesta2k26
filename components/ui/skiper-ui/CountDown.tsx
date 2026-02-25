"use client";

import NumberFlow from "@number-flow/react";
import React, { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-04-08T00:00:00");

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
        <CountdownItem value={timeLeft.days} label="Days" />
        <CountdownItem value={timeLeft.hours} label="Hours" />
        <CountdownItem value={timeLeft.minutes} label="Minutes" />
        <CountdownItem value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

const CountdownItem = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-bebas-neue text-6xl md:text-8xl tracking-tighter  transition-colors">
        <NumberFlow
          value={value}
          format={{ minimumIntegerDigits: 2 }}
        />
      </div>
      <span className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/40 transition-colors">
        {label}
      </span>
    </div>
  );
};

export { CountDown };

