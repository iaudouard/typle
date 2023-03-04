import { useCallback, useEffect, useRef, useState } from "react";

export const useCountdownTimer = (time: number) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const start = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  }, [setTimeLeft]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeLeft(time);
  }, [time]);

  useEffect(() => {
    if (!timeLeft && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft, intervalRef]);

  return { timeLeft, start, reset };
};
