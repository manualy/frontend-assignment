import { TasksContextProvider } from "../../context/TasksContextProvider";
import { TasksAutocomplete } from "../molecules/TasksAutocomplete";
import { MainTemplate } from "../templates/MainTemplate";

export const TasksPage = () => {
  return (
    <MainTemplate pageTitle="Tasks">
      <main className="w-full h-full">
        <TasksContextProvider>
          <TasksAutocomplete />
        </TasksContextProvider>
      </main>
    </MainTemplate>
  );
};
