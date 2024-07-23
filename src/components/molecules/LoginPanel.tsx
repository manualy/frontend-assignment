import { Input, Spin } from "antd";
import { useState } from "react";
import { useSessionContext } from "../../hooks/useSessionContext";
import { LoginButton } from "../atoms/LoginButton";

export const LoginPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error } = useSessionContext();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <form className="flex flex-col gap-4 max-w-lg w-full">
      <Input
        placeholder="Email"
        type="email"
        onChange={handleEmailChange}
        status={error ? "error" : ""}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={handlePasswordChange}
        status={error ? "error" : ""}
      />
      {error && (
        <p className="text-center text-red-500">
          Dane niepoprawne. Spróbuj jeszcze raz.
        </p>
      )}
      {isLoading ? <Spin /> : <LoginButton email={email} password={password} />}
    </form>
  );
};
