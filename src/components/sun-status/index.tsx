import React, { useEffect, useState } from "react";
import SunCalc from "suncalc";

const SunStatus = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [sunTimes, setSunTimes] = useState<{
    sunrise?: Date;
    sunset?: Date;
  }>({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Get user's location
    const latitude: number = 35.7219;
    const longitude: number = 51.3347;
    setLocation({ lat: latitude, lon: longitude });

    // Calculate sunrise and sunset times
    const times = SunCalc.getTimes(new Date(), latitude, longitude);
    setSunTimes(times);

    // Update current time every second
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!sunTimes.sunrise || !sunTimes.sunset) {
    return <p>Loading...</p>;
  }

  // Calculate the day progression as a percentage
  const dayStart = sunTimes.sunrise.getTime();
  const dayEnd = sunTimes.sunset.getTime();
  const now = currentTime.getTime();
  const dayProgress = Math.min(Math.max((now - dayStart) / (dayEnd - dayStart), 0), 1);

  // Arc dimensions
  const radius = 100;
  const centerX = 150;
  const centerY = 150;

  // Calculate start, end, and current arc angles
  const startAngle = Math.PI; // Sunrise at the left
  const endAngle = 2 * Math.PI; // Sunset at the right
  const currentAngle = startAngle + dayProgress * (endAngle - startAngle);

  // Convert polar coordinates to Cartesian for the arc
  const polarToCartesian = (angle, radius) => ({
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  });

  const start = polarToCartesian(startAngle, radius);
  const end = polarToCartesian(endAngle, radius);
  const current = polarToCartesian(currentAngle, radius);

  return (
    <svg width="300" height="200" viewBox="0 0 300 200">
      {/* Background arc */}
      <path
        d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`}
        fill="none"
        stroke="#ddd"
        strokeWidth="4"
      />
      {/* Day progress arc */}
      <path
        d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${
          dayProgress > 0.5 ? 1 : 0
        } 1 ${current.x} ${current.y}`}
        fill="none"
        stroke="#FFA500"
        strokeWidth="6"
      />
      {/* Markers */}
      <circle cx={start.x} cy={start.y} r="5" fill="#FFA500"/>
      <text x={start.x - 20} y={start.y + 20} fontSize="12" fill="#333">
        Sunrise
      </text>
      <circle cx={end.x} cy={end.y} r="5" fill="#FF4500"/>
      <text x={end.x - 20} y={end.y + 20} fontSize="12" fill="#333">
        Sunset
      </text>
    </svg>
  );
};

export default SunStatus;
