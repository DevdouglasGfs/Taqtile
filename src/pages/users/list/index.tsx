import './users-list.css';
import { useGetUsers } from "../../../hooks/useGetUsers";
import { UserDto } from '../../../types/user';
import { useState } from 'react';
import { checkLoginStatus } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function UsersList() {
    const navigate = useNavigate();
    if (!checkLoginStatus()) { navigate('/login', { replace: true }) }

    // Define the offset of the pagination
    const [offset, setOffset] = useState(0);
    const { data, loading, error } = useGetUsers({ offset, limit: 20 });

    return (
        <main className="container">
            <h1 className="title">Taqui<span className='highlight'>Usuários</span></h1>
            <table className="users-list">
                <thead>
                    <tr>
                        <th className="users-list__title">Nome</th>
                        <th className="users-list__title">Email</th>
                    </tr>
                </thead>
                <tbody className="users-list__collection">
                    {data?.users.nodes.map((user: UserDto) => (
                        <tr key={user.id} className="users-list__item">
                            <td className="users-list__data">{user.name}</td>
                            <td className="users-list__data">{user.email}</td>
                        </tr>
                    ))}
                    {loading && <tr><td>Carregando...</td></tr>}
                </tbody>
                <div className="pagination-controls">
                    <span>Página {offset / 10 + 1}</span>
                    <button disabled={offset <= 0} onClick={() => setOffset(() => offset - 10)} className="pagination-controls__prev">Anterior</button>
                    <button disabled={!!error || loading} onClick={() => setOffset(() => offset + 10)} className="pagination-controls__next">Próximo</button>
                </div>
            </table>
        </main>
    )
}
