import { useEffect } from "react";
import { useSessionContext } from "../../hooks/useSessionContext";
import { LogoutButton } from "../atoms/LogoutButton";

interface TemplateProps {
  pageTitle: string;
  children?: React.ReactNode;
}

export const MainTemplate = ({ pageTitle, children }: TemplateProps) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const { email } = useSessionContext();

  return (
    <>
      <header className="flex justify-between p-8 px-12">
        <p>{email}</p>
        <LogoutButton />
      </header>
      {children}
    </>
  );
};
