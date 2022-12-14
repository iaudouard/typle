import React, { useContext } from "react";
import { Loading } from "../components/Loading";
import { TestContext } from "../context/TestContext";
import { trpc } from "../lib/trpc";

const Leaderboard = () => {
  const { test } = useContext(TestContext);
  const leaderboard = trpc.leaderboard.get.useQuery({ testId: test.id });

  if (!leaderboard.data) {
    return <Loading />;
  }
  return (
    <ul>
      {leaderboard.data.leaderboard.map((testResult, i) => {
        return <li key={i}>{testResult.wpm}</li>;
      })}
    </ul>
  );
};

export default Leaderboard;
