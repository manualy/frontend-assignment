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
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringStar, setIsHoveringStar] = useState(false);

  const { addBookmark, removeBookmark } = useTasksContext();

  return (
    <Menu.Item
      {...props}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center justify-between">
        <span>{task.name}</span>
        <div
          onMouseEnter={() => setIsHoveringStar(true)}
          onMouseLeave={() => setIsHoveringStar(false)}
        >
          {isHovering &&
            (task.bookmarked ? (
              isHoveringStar ? (
                <StarIcon onClick={() => removeBookmark(task.id)} />
              ) : (
                <StarFilledIcon onClick={() => addBookmark(task.id)} />
              )
            ) : isHoveringStar ? (
              <StarFilledIcon onClick={() => addBookmark(task.id)} />
            ) : (
              <StarIcon onClick={() => removeBookmark(task.id)} />
            ))}
        </div>
      </div>
    </Menu.Item>
  );
};
