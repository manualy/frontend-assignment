import { createContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addBookmark,
  addNewTask,
  listTasks,
  ListTasksResponse,
  removeBookmark,
  Task,
} from "../api/tasks";
import { useSessionContext } from "../hooks/useSessionContext";

export const TasksContext = createContext<
  | {
      addBookmark: (taskId: number) => void;
      removeBookmark: (taskId: number) => void;
      addNewTask: (task: Omit<Task, "id">) => void;
      tasks: ListTasksResponse | undefined;
      isLoading: boolean;
      error: unknown;
    }
  | undefined
>(undefined);

export function TasksContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { accessToken } = useSessionContext();

  if (!accessToken) {
    throw new Error("TaskContextProvider used in a non-protected route");
  }

  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery(["tasks"], () =>
    listTasks(accessToken, { per_page: 1000, page: 1 })
  );

  const addBookmarkMutation = useMutation(
    ["tasks"],
    (taskId: number) => addBookmark(accessToken, taskId),
    {
      onMutate: (taskId) => {
        queryClient.setQueryData<ListTasksResponse | undefined>(
          ["tasks"],
          (oldData) => {
            if (!oldData) {
              return oldData;
            }

            return {
              ...oldData,
              data: oldData.data.map((oldTask) =>
                taskId === oldTask.id
                  ? { ...oldTask, bookmarked: !oldTask.bookmarked }
                  : oldTask
              ),
            };
          }
        );
      },
    }
  );

  const removeBookmarkMutation = useMutation(
    ["tasks"],
    (taskId: number) => removeBookmark(accessToken, taskId),
    {
      onMutate: (taskId) => {
        queryClient.setQueryData<ListTasksResponse | undefined>(
          ["tasks"],
          (oldData) => {
            if (!oldData) {
              return oldData;
            }

            return {
              ...oldData,
              data: oldData.data.map((oldTask) =>
                taskId === oldTask.id
                  ? { ...oldTask, bookmarked: !oldTask.bookmarked }
                  : oldTask
              ),
            };
          }
        );
      },
    }
  );

  const addTaskMutation = useMutation(
    ["tasks"],
    (task: Omit<Task, "id">) => addNewTask(accessToken, task),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  const contextValue = useMemo(
    () => ({
      addBookmark: (taskId: number) => addBookmarkMutation.mutate(taskId),
      removeBookmark: (taskId: number) => removeBookmarkMutation.mutate(taskId),
      addNewTask: (task: Omit<Task, "id">) => addTaskMutation.mutate(task),
      tasks,
      isLoading,
      error,
    }),
    [
      addBookmarkMutation,
      addTaskMutation,
      error,
      isLoading,
      removeBookmarkMutation,
      tasks,
    ]
  );

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
}
