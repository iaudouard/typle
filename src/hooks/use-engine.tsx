import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GameState } from "~/types/game-state";
import { api } from "~/utils/api";
import { calculateWpm } from "~/utils/test-stats";
import { useCountdownTimer } from "./use-countdown-timer";
import { useTyping } from "./use-typing";

const TEST_TIME = 15;

export default function useEngine() {
  const test = api.test.get.useQuery();
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const { timeLeft, start, reset } = useCountdownTimer(TEST_TIME);
  const { typed, cursor, clearTyped, resetTotalTyped } = useTyping(
    gameState !== GameState.FINISHED
  );
  const [wpm, setWpm] = useState<number>();
  const result = api.results.post.useMutation({
    onError: (error) => {
      notifyError("Failed to upload result: " + error.message);
      return;
    },
    onSuccess: (data) => {
      if (!data.userId) {
        toast.success(
          "Successfully saved result, login to save across devices"
        );
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
    if (gameState === GameState.IDLE && cursor > 0) {
      start();
      setGameState(GameState.PLAYING);
    }
  }, [gameState, cursor, start]);

  useEffect(() => {
    if (gameState === GameState.PLAYING && !timeLeft) {
      if (test.data) {
        const tempWpm = calculateWpm(TEST_TIME, typed, test.data.body);
        setWpm(tempWpm);
        result.mutateAsync({
          testId: test.data.id,
          wpm: tempWpm,
        });
      }
      setGameState(GameState.FINISHED);
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
    setGameState(GameState.IDLE);
  }

  return { gameState, timeLeft, typed, test, wpm, resetGame };
}
