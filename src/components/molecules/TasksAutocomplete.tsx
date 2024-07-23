import { AutoComplete, Menu, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TaskMenuItem } from "../atoms/TaskMenuItem";
import { useTasksAutocomplete } from "../../hooks/useTasksAutocomplete";
import { useTasksContext } from "../../hooks/useTasksContext";

import "../../styles/TasksAutocomplete.css";
import { SearchIcon } from "../../icons/SearchIcon";

export const TasksAutocomplete = () => {
  const {
    options,
    bookmarked,
    otherTasks,
    searchValue,
    selectedKey,
    isLoading,
    error,
    handlePressEnter,
    handleSearchValueChanged,
    handleSelect,
  } = useTasksAutocomplete();

  const { addNewTask } = useTasksContext();

  return (
    <AutoComplete
      options={options}
      className="w-full"
      placeholder="Search tasks"
      status={error ? "error" : ""}
      suffixIcon={<SearchIcon width={16} height={16} className="opacity-60" />}
      searchValue={searchValue}
      value={searchValue}
      onSearch={handleSearchValueChanged}
      onKeyDown={handlePressEnter}
      popupClassName="tasks-autocomplete-popup"
      dropdownRender={() => (
        <Menu
          selectedKeys={[selectedKey]}
          className="tasks-autocomplete-menu hidden-scrollbar rounded-none max-h-64 overflow-y-auto"
        >
          {isLoading && (
            <div className="flex items-center py-4 justify-center">
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            </div>
          )}
          {bookmarked.length !== 0 && (
            <Menu.ItemGroup
              title="Bookmarked Tasks"
              className="tasks-autocomplete-menu-group"
            >
              {bookmarked.map((task) => (
                <TaskMenuItem
                  key={task.id}
                  task={task}
                  onClick={() => handleSelect(task)}
                />
              ))}
            </Menu.ItemGroup>
          )}
          {otherTasks.length !== 0 && (
            <Menu.ItemGroup
              title="Tasks"
              className="tasks-autocomplete-menu-group"
            >
              {otherTasks.map((task) => (
                <TaskMenuItem
                  key={task.id}
                  task={task}
                  onClick={() => handleSelect(task)}
                />
              ))}
            </Menu.ItemGroup>
          )}
          {searchValue && (
            <Menu.ItemGroup
              title="Create a new task"
              className="tasks-autocomplete-menu-group"
            >
              <Menu.Item
                key="dupa-task"
                className="tasks-autocomplete-menu-item"
                onClick={() => {
                  addNewTask({ name: searchValue, bookmarked: false });
                  handleSearchValueChanged("");
                }}
              >
                Create new task - "{searchValue}"
              </Menu.Item>
            </Menu.ItemGroup>
          )}
        </Menu>
      )}
    />
  );
};
