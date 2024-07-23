import { TasksContextProvider } from "../../context/TasksContextProvider";
import { TasksAutocomplete } from "../molecules/TasksAutocomplete";
import { MainTemplate } from "../templates/MainTemplate";

export const TasksPage = () => {
  return (
    <MainTemplate pageTitle="Tasks">
      <main className="w-full flex justify-center">
        <div className="max-w-xl w-full px-10">
          <TasksContextProvider>
            <TasksAutocomplete />
          </TasksContextProvider>
        </div>
      </main>
    </MainTemplate>
  );
};
