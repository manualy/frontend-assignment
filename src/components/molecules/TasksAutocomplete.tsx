import { AutoComplete, Menu, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TaskMenuItem } from "../atoms/TaskMenuItem";
import { useTasksAutocomplete } from "../../hooks/useTasksAutocomplete";
import { useTasksContext } from "../../hooks/useTasksContext";

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
      style={{ width: 300 }}
      placeholder="Search tasks"
      status={error ? "error" : ""}
      searchValue={searchValue}
      onSearch={handleSearchValueChanged}
      onKeyDown={handlePressEnter}
      dropdownRender={() => (
        <Menu selectedKeys={[selectedKey]}>
          {isLoading && (
            <div className=" flex items-center py-4 justify-center">
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            </div>
          )}
          {bookmarked.length !== 0 && (
            <Menu.ItemGroup title="Bookmarked Tasks">
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
            <Menu.ItemGroup title="Tasks">
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
            <Menu.ItemGroup title="Create a new task">
              <Menu.Item
                key="dupa-task"
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
