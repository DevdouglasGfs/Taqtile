import { useNavigate } from 'react-router-dom';
import { useAuthentication } from './hooks/useAuth';
import { UsersPage } from './pages/users';


export default function App() {
  const navigate = useNavigate();
  return <>{useAuthentication().authenticated ? <UsersPage /> : navigate('/login', { replace: true })}</>;
}
