import "./App.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./authentication/LoginPage";
import RegisterPage from "./authentication/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import TasksPage from "./tasks/TasksPage";
import DashboardPage from "./home/DashboardPage";
import ProjectPage from "./projects/ProjectPage";
import CreateProject from "./projects/CreateProjectPage";
import JoinProject from "./projects/JoinProjectPage";
import BoardPage from "./board/BoardPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/otis">
          <Route index element={<Navigate to="/otis/dashboard" />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="project/tasks"
            element={
              <ProtectedRoute>
                <ProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="project/board"
            element={
              <ProtectedRoute>
                <ProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=":projectId/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=":projectId/board"
            element={
              <ProtectedRoute>
                <BoardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="project"
            element={
              <ProtectedRoute>
                <ProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="project/create/board"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="project/create/tasks"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="project/join/board"
            element={
              <ProtectedRoute>
                <JoinProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="project/join/tasks"
            element={
              <ProtectedRoute>
                <JoinProject />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
