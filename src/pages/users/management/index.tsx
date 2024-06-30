import { useState } from "react";
import CreateUser from "../../../components/create-user";
import { Heading } from "../../../components/common/Heading";
import { Menu } from "../../../components/common/Menu";
import { Wrapper } from "../../../components/common/Wrapper";
import { Link } from "../../../components/common/Link";
import { Cta } from "../../../components/common/Cta";


export function UserManagement() {
    const [showModal, setShowModal] = useState(false)

    return <>
        <CreateUser open={showModal} setOpen={setShowModal} />
        <Wrapper $dir="column" $maxWidth="80cqw" $gap="1rem">
            <Menu $gap=".5rem">
                <Heading as={"h2"}>Atalhos rápidos</Heading>
                <Wrapper as={"nav"} $wrap="wrap" $gap="12px">
                    <Link $fill $appearAsButton to={'/'}>Início</Link>
                    <Link $fill $appearAsButton to={'/users'}>Lista de Usuários</Link>
                </Wrapper>
            </Menu>
            <Cta $fill="half" onClick={() => setShowModal(true)}>Adicionar usuário</Cta>
        </Wrapper>
    </>
}