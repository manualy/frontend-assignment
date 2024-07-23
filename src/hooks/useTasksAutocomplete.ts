import { useCallback, useMemo, useState } from "react";
import { Task } from "../api/tasks";
import { useTasksContext } from "./useTasksContext";

export const useTasksAutocomplete = () => {
  const { tasks, isLoading, error, addNewTask } = useTasksContext();

  const [searchValue, setSearchValue] = useState("");
  const [selectedKey, setSelectedKey] = useState<string>("");

  const handleSearchValueChanged = (newValue: string) => {
    setSearchValue(newValue);
  };

  const handleSelect = useCallback((task: Task) => {
    setSelectedKey(task.id.toString());
  }, []);

  const handlePressEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        addNewTask({ name: searchValue, bookmarked: false });
        setSearchValue("");
      }
    },
    [addNewTask, searchValue]
  );

  const { bookmarked, otherTasks } = useMemo(() => {
    if (!tasks?.data) {
      return {
        bookmarked: [],
        otherTasks: [],
      };
    }

    return tasks.data.reduce(
      (acc: { bookmarked: Task[]; otherTasks: Task[] }, task: Task) => {
        if (task.name.toLowerCase().includes(searchValue.toLowerCase())) {
          if (task.bookmarked) {
            acc.bookmarked.push(task);
          } else {
            acc.otherTasks.push(task);
          }
        }
        return acc;
      },
      { bookmarked: [], otherTasks: [] }
    );
  }, [searchValue, tasks?.data]);

  return useMemo(
    () => ({
      bookmarked,
      options: tasks?.data || [{ id: 1, name: "invisible", bookmarked: false }],
      otherTasks,
      searchValue,
      selectedKey,
      isLoading,
      error,
      handlePressEnter,
      handleSearchValueChanged,
      handleSelect,
    }),
    [
      bookmarked,
      error,
      handlePressEnter,
      handleSelect,
      isLoading,
      otherTasks,
      searchValue,
      selectedKey,
      tasks?.data,
    ]
  );
};
