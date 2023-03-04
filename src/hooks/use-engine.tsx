import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { calculateWpm } from "~/utils/test-stats";
import { useCountdownTimer } from "./use-countdown-timer";
import { useTyping } from "./use-typing";

type GameState = "idle" | "playing" | "finished";

const TEST_TIME = 15;

export default function useEngine() {
  const test = api.test.get.useQuery();
  const [gameState, setGameState] = useState<GameState>("idle");
  const { timeLeft, start, reset } = useCountdownTimer(TEST_TIME);
  const { typed, cursor, clearTyped, resetTotalTyped } = useTyping(
    gameState !== "finished"
  );
  const [wpm, setWpm] = useState<number>();
  const result = api.test.postResult.useMutation();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (gameState === "idle" && cursor > 0) {
      start();
      setGameState("playing");
    }
  }, [gameState, cursor, start]);

  useEffect(() => {
    if (gameState === "playing" && !timeLeft) {
      if (test.data) {
        const tempWpm = calculateWpm(TEST_TIME, typed, test.data.body);
        setWpm(tempWpm);
        if (sessionData?.user) {
          result.mutateAsync({
            testId: test.data.id,
            wpm: tempWpm,
          });
        }
      } else {
        throw new Error("Test was undefined");
      }
      setGameState("finished");
    }
  }, [gameState, timeLeft]);

  return { gameState, timeLeft, typed, test, wpm };
}
