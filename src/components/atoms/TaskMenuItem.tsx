import { useState } from "react";
import { StarFilledIcon } from "../../icons/StarFilledIcon";
import { Menu, MenuItemProps } from "antd";
import { Task } from "../../api/tasks";
import { StarIcon } from "../../icons/StarIcon";
import { useTasksContext } from "../../hooks/useTasksContext";

interface Props extends MenuItemProps {
  task: Task;
}

export const TaskMenuItem = ({ task, ...props }: Props) => {
  const [isHoveringStar, setIsHoveringStar] = useState(false);

  const { addBookmark, removeBookmark } = useTasksContext();

  return (
    <Menu.Item {...props} className="tasks-autocomplete-menu-item">
      <div className="flex items-center justify-between">
        <span>{task.name}</span>
        <div
          onMouseEnter={() => setIsHoveringStar(true)}
          onMouseLeave={() => setIsHoveringStar(false)}
        >
          {task.bookmarked ? (
            isHoveringStar ? (
              <StarIcon
                onClick={() => removeBookmark(task.id)}
                className="fill-text-main"
                width={18}
                height={18}
              />
            ) : (
              <StarFilledIcon
                onClick={() => addBookmark(task.id)}
                className="fill-primary"
                width={18}
                height={18}
              />
            )
          ) : isHoveringStar ? (
            <StarFilledIcon
              onClick={() => addBookmark(task.id)}
              className="fill-primary"
              width={18}
              height={18}
            />
          ) : (
            <StarIcon
              onClick={() => removeBookmark(task.id)}
              className="fill-text-main"
              width={18}
              height={18}
            />
          )}
        </div>
      </div>
    </Menu.Item>
  );
};
