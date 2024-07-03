import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login';
import UsersPage from '../pages/users';
import UserManagement from '../pages/users/management';
import UsersList from '../pages/users/list';
import ErrorPage from '../pages/error-page';
import { getLoginToken } from '../utils/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: getLoginToken() ? <UsersPage /> : <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/users',
        element: <UsersList />,
      },
      {
        path: 'management',
        element: <UserManagement />,
      },
    ],
  },
]);
