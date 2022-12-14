import { useRouter } from "next/router";
import React from "react";
import { MdLeaderboard } from "react-icons/md";

type Props = {};

export const Header = (props: Props) => {
  const router = useRouter();

  const handleRouteChange = (route: string) => {
    router.push(route);
  };
  return (
    <header className="absolute top-0 flex w-full justify-between p-8">
      <h1
        className="cursor-pointer text-4xl font-bold text-white"
        onClick={() => handleRouteChange("/")}
      >
        typle.
      </h1>
      <MdLeaderboard
        color="white"
        size={24}
        className="cursor-pointer"
        onClick={() => handleRouteChange("/leaderboard")}
      />
    </header>
  );
};
