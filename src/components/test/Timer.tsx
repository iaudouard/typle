import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

type Props = {
  expiryTimestamp: Date;
  durationInSeconds: number;
  onExpire: () => void;
  isTimerStarted: boolean;
};

export const Timer = (props: Props) => {
  const expiryTimestamp = props.expiryTimestamp;

  const {
    seconds,

    start,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => props.onExpire(),
    autoStart: false,
  });

  useEffect(() => {
    if (props.isTimerStarted) start();
  }, [props.isTimerStarted]);

  return (
    <h3 className="self-start text-2xl font-semibold text-white">{seconds}</h3>
  );
};
