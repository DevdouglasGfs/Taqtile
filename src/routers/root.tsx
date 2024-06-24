import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login";
import { UsersPage } from "../pages/users";
import { UserManagement } from "../pages/users/management";
import UsersList from "../pages/users/users-list";
import ErrorPage from "../pages/error-page";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
}, {
    path: "/login",
    element: <LoginPage />,
}, {
    path: "/users",
    element: <UsersPage />,
    children: [{
        path: "list",
        element: <UsersList />,
    },{
        path: "management",
        element: <UserManagement />,
    }]
}])