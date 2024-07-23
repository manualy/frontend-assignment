import { Button } from "antd";
import { useSessionContext } from "../../hooks/useSessionContext";

export const LogoutButton = () => {
  const { logout } = useSessionContext();

  return <Button onClick={logout}>Log out</Button>;
};
