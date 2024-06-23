import { Outlet, Route, Routes } from "react-router-dom"
import "./users-list/users-list.css"
import { UserManagement } from "./management"
import UsersList from "./users-list/users-list"

export function UsersPage() {
    return <>
        <Routes>
            <Route path="/" element={<>
                <main className="container">
                    <Outlet />
                </main>
            </>
            }>
                <Route index element={<UsersList />} />
                <Route path="list" element={<UsersList />} />
                <Route path="management" element={<UserManagement />} />
            </Route>
        </Routes>
    </>
}