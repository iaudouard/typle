import { useEffect, useState } from "react";
import { fetchUsernameLocally } from "../lib/local-storage";

export const useIsUsernameCreated = () => {
  const [isUsernameCreated, setIsUsernameCreated] = useState<boolean>(false);
  useEffect(() => {
    const username = fetchUsernameLocally();
    if (username) setIsUsernameCreated(true);
  }, []);

  return isUsernameCreated;
};
