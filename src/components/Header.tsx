import { useRouter } from "next/router";
import React from "react";
import { MdLeaderboard } from "react-icons/md";

type Props = {};

export const Header = (props: Props) => {
  const router = useRouter();

  const handleLeaderboardIconClick = () => {
    router.push("/leaderboard");
  };
  return (
    <header className="absolute top-0 flex w-full justify-between p-8">
      <h1 className="text-4xl font-bold text-white">typle.</h1>
      <MdLeaderboard
        color="white"
        size={24}
        className="cursor-pointer"
        onClick={handleLeaderboardIconClick}
      />
    </header>
  );
};
