import React from "react";
import { Wrapper } from "../../../components/common/wrapper";
import { Menu } from "../../../components/common/menu";
import { Heading } from "../../../components/common/heading";
import { Link } from "../../../components/common/link";
import { Hero } from "../../../components/common/hero";
import { useGetUserById } from "../../../hooks/useGetUser";
import { useParams } from "react-router-dom";
import { StatusBlock } from "../../../components/common/statusBlock";
import { theme } from "..";
import styled from "styled-components";
import { Spinner } from "../../../components/common/spinner";

const CustomErrorHeading = styled(Heading)`
    color: #fff;
    font-size: 1.5rem;
`;

const CustomPresentHeading = styled(Heading)`
    color: #fff;
    font-size: 1.5rem;
`;

export const SpecificUserPage: React.FC = () => {
    const { id } = useParams();
    const { data, error, loading } = useGetUserById(id);

    return (
        <Wrapper $dir="column">
            <Wrapper $maxWidth="80cqw">
                <Menu $gap="1rem">
                    <Heading as={"h2"}>Atalhos rápidos</Heading>
                    <Wrapper $gap="12px">
                        <Link $fill $appearAsButton to={'/users'}>Voltar</Link>
                        <Link $fill $appearAsButton to={'/'}>Início</Link>
                    </Wrapper>
                </Menu>
            </Wrapper>

            {loading && (
                <Hero $bg="transparent">
                    <Wrapper $gap=".5rem" $justify="center" $align="center" $maxWidth="max(600px, 100%)">
                        <Spinner size="2rem" />
                        Carregando...
                    </Wrapper>
                </Hero>
            )}
            {error && (
                <Wrapper $maxWidth="80cqw">
                    <StatusBlock $justify="start" $dir="column" $status="error">
                        <CustomErrorHeading as={"h2"}>Erro ao carregar</CustomErrorHeading>
                        <p>{error.message}</p>
                    </StatusBlock>
                </Wrapper>
            )}
            {data && (
                <Wrapper $maxWidth="80cqw">
                    <Hero $padding="" $bg={`linear-gradient(to bottom, ${theme.colors.link}, ${theme.colors.bgBold})`}>
                        <CustomPresentHeading as={"h2"}>
                            <span>Usuário</span>
                            {data.user.name}
                        </CustomPresentHeading>
                        <Wrapper $padding="" $align="start">
                            <StatusBlock $align="start" $rounded $status="info" as="ul">
                                <li><strong>Nome</strong>: {(data.user.name as string).substring(0, 1).toUpperCase() + (data.user.name as string).substring(1)}</li>
                                <li><strong>Email</strong>: {data.user.email}</li>
                                <li><strong>Data de Nascimento</strong>: {new Date(data.user.birthDate).toLocaleDateString(navigator.language)}</li>
                                <li><strong>Telefone</strong>: {data.user.phone}</li>
                                <li><strong>Cargo</strong>: {data.user.role}</li>
                            </StatusBlock>
                        </Wrapper>
                    </Hero>
                </Wrapper>
            )}
        </Wrapper>
    )
}