import { useContext } from "react";
import { SessionContext } from "../context/SessionContextProvider";

export const useSessionContext = () => {
  const context = useContext(SessionContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useSessionContext must be used within a SessionContextProvider"
    );
  }

  return context;
};
