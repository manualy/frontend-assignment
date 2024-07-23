import { useSessionContext } from "../../hooks/useSessionContext";

export const UserInfo = () => {
  const { email } = useSessionContext();

  return <p>{email}</p>;
};
