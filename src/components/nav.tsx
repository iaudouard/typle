import { useRouter } from "next/router";
import { MdLeaderboard, MdPerson } from "react-icons/md";

export const Nav = () => {
  return (
    <header className="absolute top-0 left-0 grid w-screen grid-cols-2 p-8">
      <Title />
      <IconsContainer />
    </header>
  );
};

const IconsContainer = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-end gap-8">
      <MdLeaderboard
        color="white"
        size={24}
        className="cursor-pointer"
        onClick={() => router.push("/leaderboard")}
      />
      <MdPerson
        color="white"
        size={24}
        className="cursor-pointer"
        onClick={() => router.push("/account")}
      />
    </div>
  );
};

const Title = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-start">
      <h1
        className="cursor-pointer text-4xl font-bold text-white"
        onClick={() => router.push("/")}
      >
        typle.
      </h1>
    </div>
  );
};
