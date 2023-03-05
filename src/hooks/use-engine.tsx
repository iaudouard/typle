import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { calculateWpm } from "~/utils/test-stats";
import { useCountdownTimer } from "./use-countdown-timer";
import { useTyping } from "./use-typing";

type GameState = "idle" | "playing" | "finished";

const TEST_TIME = 15;

export default function useEngine() {
  const { data: sessionData } = useSession();
  const test = api.test.get.useQuery();
  const [gameState, setGameState] = useState<GameState>("idle");
  const { timeLeft, start, reset } = useCountdownTimer(TEST_TIME);
  const { typed, cursor, clearTyped, resetTotalTyped } = useTyping(
    gameState !== "finished"
  );
  const [wpm, setWpm] = useState<number>();
  const result = api.results.post.useMutation({
    onError: (error) => {
      notifyError("Failed to upload result: " + error.message);
      return;
    },
    onSuccess: (data) => {
      if (!data.userId) {
        notifyError("Login to see your results on the leaderboard");
        const currResults = localStorage.getItem("results");
        if (currResults) {
          const parsedResults = JSON.parse(currResults);
          localStorage.setItem(
            "results",
            JSON.stringify([...parsedResults, data])
          );
        } else {
          localStorage.setItem("results", JSON.stringify([data]));
        }
      }
    },
  });

  const notifyError = (err: string) => toast.error(err);

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
        result.mutateAsync({
          testId: test.data.id,
          wpm: tempWpm,
        });
      }
      setGameState("finished");
    }
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (test.isError) {
      notifyError("Failed to load test: " + test.error.message);
    }
  }, [test]);

  function resetGame() {
    reset();
    clearTyped();
    resetTotalTyped();
    setGameState("idle");
  }

  return { gameState, timeLeft, typed, test, wpm, resetGame };
}
