import { useEffect } from "react";
import { useSessionContext } from "../../hooks/useSessionContext";
import { LogoutButton } from "../atoms/LogoutButton";
import { Tooltip } from "antd";

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
      <header className="flex p-8 px-10 items-center gap-4 justify-center sm:justify-between sm:flex-row flex-col">
        <Tooltip title={email}>
          <p className="text-ellipsis overflow-hidden min-w-24">{email}</p>
        </Tooltip>
        <div className="justify-center">
          <LogoutButton />
        </div>
      </header>
      {children}
    </>
  );
};
