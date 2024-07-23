import { useEffect } from "react";
import { LoginPanel } from "../molecules/LoginPanel";

export const LoginPage = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <LoginPanel />
    </div>
  );
};
