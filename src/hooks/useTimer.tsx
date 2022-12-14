import React from "react";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

type Props = {
  durationInSeconds: number;
  onExpire: (testTimerLength: number) => void;
};

export const useTimerHook = (props: Props) => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(
    expiryTimestamp.getSeconds() + props.durationInSeconds
  );

  const { seconds, start, isRunning, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => props.onExpire(15),
    autoStart: false,
  });

  return { seconds, start, isRunning, restart };
};
