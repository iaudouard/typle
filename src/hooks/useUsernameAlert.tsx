import { useEffect, useState } from "react";
import { fetchUsernameLocally } from "../lib/local-storage";

export const useUsernameAlert = () => {
  const [alertUsername, setAlertUsername] = useState<boolean>(true);
  useEffect(() => {
    const username = fetchUsernameLocally();
    if (username !== undefined) setAlertUsername(false);
  }, [alertUsername]);

  return { alertUsername, setAlertUsername };
};
