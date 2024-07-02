import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login-page";
import ErrorPage from "../pages/error-page";

export const router = createBrowserRouter([{
    path: "/",
    element: <p>Nothing here. Try to access to /login page.</p>,
    errorElement: <ErrorPage />
}, {
    path: "/login",
    element: <LoginPage />,
}])