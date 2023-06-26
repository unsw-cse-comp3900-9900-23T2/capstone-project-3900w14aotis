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
import DashboardPage from "./home/DashboardPage";
import ProjectPage from "./home/ProjectPage";
import ProtectedRoute from "./ProtectedRoute";

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
          <Route path="project" element={<ProjectPage />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
