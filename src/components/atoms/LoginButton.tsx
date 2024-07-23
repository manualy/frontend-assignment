import { Button, ButtonProps } from "antd";

export const LoginButton = (props: ButtonProps) => {
  return (
    <Button {...props} htmlType="submit" type="primary">
      Login
    </Button>
  );
};
