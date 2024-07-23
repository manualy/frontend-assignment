import { useContext } from "react";
import { TasksContext } from "../context/TasksContextProvider";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (typeof context === "undefined") {
    throw new Error("useTaskContext must be used within a TaskContextProvider");
  }

  return context;
};
