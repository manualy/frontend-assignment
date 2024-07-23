import { QueryClient, QueryClientProvider } from "react-query";
import { SessionContextProvider } from "./context/SessionContextProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { ProtectedRoute } from "./components/atoms/ProtectedRoute";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { AuthRoute } from "./components/atoms/AuthRoute";
import { TasksPage } from "./components/pages/TasksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <TasksPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthRoute>
        <LoginPage />,
      </AuthRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider>
        <RouterProvider router={router} />
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default App;
