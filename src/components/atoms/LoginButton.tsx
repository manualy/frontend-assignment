import { Button } from "antd";
import { useSessionContext } from "../../hooks/useSessionContext";

interface Props {
  email: string;
  password: string;
}

export const LoginButton = (params: Props) => {
  const { login } = useSessionContext();

  return <Button onClick={() => login(params)}>Login</Button>;
};
