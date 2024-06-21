import './users-list.css';
import { useGetUsers } from "../../hooks/useGetUsers";
import { UserDto } from '../../types/user';

export default function UsersList() {
    const { data, loading } = useGetUsers();

    return (
        <main className="container">
            <h1 className="title">Usuários</h1>
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
            </table>
        </main>
    )
}
