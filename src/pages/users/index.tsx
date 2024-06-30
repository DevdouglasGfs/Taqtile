import { Outlet, Route, Routes } from "react-router-dom"
import { UserManagement } from "./management"
import UsersList from "./list"
import { SpecificUserPage } from "./user"
import { ThemeProvider } from "styled-components"
import { Hero } from "../../components/common/Hero"
import { Heading } from "../../components/common/Heading"
import { Wrapper } from "../../components/common/Wrapper"
import { Menu } from "../../components/common/Menu"
import { Link } from "../../components/common/Link"
import theme from "../../themes/default"


const NavigationLinks = () => {
    return <>
        <Wrapper $maxWidth="max(600px, 100%)">
            <Menu $gap="2rem">
                <Heading as={"h2"}>Atalhos rápidos</Heading>
                <Wrapper $wrap="wrap" $gap="12px">
                    <Link $fill $appearAsButton to={'/users'}>Lista de Usuários</Link>
                    <Link $fill $appearAsButton to={'/users/management'}>Gestão dos usuários</Link>
                </Wrapper>
            </Menu>
        </Wrapper>
    </>
}

export function UsersPage() {
    return <>
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<>
                    <main>
                        <Hero>
                            <Heading>
                                <span>Dashboard</span>
                                Taqtile
                            </Heading>
                        </Hero>
                        <Outlet />
                    </main>
                </>
                }>
                    <Route index element={<>
                        <NavigationLinks />
                    </>} />
                    <Route path="users" element={<><Outlet /></>}>
                        <Route index element={<UsersList />} />
                        <Route path="management" element={<UserManagement />} />
                        <Route path="user/:id" element={<SpecificUserPage />} />
                    </Route>
                </Route>
            </Routes>
        </ThemeProvider>
    </>
}