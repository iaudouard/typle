import { useRouter } from "next/router";
import React from "react";
import { MdLeaderboard } from "react-icons/md";
import { TestTriesDisplay } from "./TestTriesDisplay";

export const Header = () => {
  const router = useRouter();

  const handleRouteChange = (route: string) => {
    router.push(route);
  };
  return (
    <header className="absolute top-0 left-0 grid w-screen grid-cols-3 p-8">
      <TestTriesDisplay />
      <Title handleClick={() => handleRouteChange("/")} />
      <IconsContainer handleClick={() => handleRouteChange("/leaderboard")} />
    </header>
  );
};

type IconsContainerProps = {
  handleClick: () => void;
};

const IconsContainer = (props: IconsContainerProps) => {
  return (
    <div className="flex items-center justify-end">
      <MdLeaderboard
        color="white"
        size={24}
        className="cursor-pointer"
        onClick={props.handleClick}
      />
    </div>
  );
};

type TitleProps = {
  handleClick: () => void;
};

const Title = (props: TitleProps) => {
  return (
    <div className="flex items-center justify-center">
      <h1
        className="cursor-pointer text-4xl font-bold text-white"
        onClick={props.handleClick}
      >
        typle.
      </h1>
    </div>
  );
};
