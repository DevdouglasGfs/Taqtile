import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login-page";
import ErrorPage from "../pages/error-page";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
}, {
    path: "/login",
    element: <LoginPage />,
}])