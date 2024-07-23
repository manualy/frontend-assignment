import { QueryClient, QueryClientProvider } from "react-query";
import { SessionContextProvider } from "./context/SessionContextProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { ProtectedRoute } from "./components/atoms/ProtectedRoute";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { AuthRoute } from "./components/atoms/AuthRoute";
import { TasksPage } from "./components/pages/TasksPage";
import { ConfigProvider } from "antd";

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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1BC6B8",
              colorText: "#485963",
              colorBgTextActive: "#EBF9F8",
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default App;
