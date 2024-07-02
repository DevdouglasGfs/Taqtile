import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login';
import { UsersPage } from '../pages/users';
import { UserManagement } from '../pages/users/management';
import UsersList from '../pages/users/list';
import ErrorPage from '../pages/error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Nothing here until now. Access the /login page to login or /users to see the list of users</p>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
    children: [
      {
        path: 'list',
        element: <UsersList />,
      },
      {
        path: 'management',
        element: <UserManagement />,
      },
    ],
  },
]);
