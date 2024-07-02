import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UserDto } from "../../types/user";
import { dateIsNotAFutureDate, formatPhoneAndValidate, validateEmail, validatePassword, validatePhone } from "../../utils/validators";
import { CREATE_USER } from "../../graphql/mutations/createUser";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Heading } from "../common/Heading";
import styled from "styled-components";
import { Modal } from "../common/Modal";
import { GridWrapper, Wrapper } from "../common/Wrapper";
import { Input } from "../common/Input";
import { Label } from "../common/Label";
import { Cta } from "../common/Cta";
import { StatusBlock } from "../common/StatusBlock";

const ModalHeading = styled(Heading)`
    font-size: 1.5rem;
`;
const CustomGridWrapper = styled(GridWrapper)`
    padding: 0;
    gap: 1rem;
`;

export default function CreateUser({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<Required<Omit<UserDto, 'id'>>>({ name: '', email: '', phone: '', role: 'user', birthDate: new Date(), password: '' });
    const requiredAge = 10;

    const [validInputs, setValidInputs] = useState(false)
    let currentDate = useRef(new Date());
    useMemo(() => { currentDate.current = new Date() }, [currentDate])

    const validateAllInputs = () => {
        // Check if all inputs are filled
        setValidInputs(
            validateEmail(userData.email) && userData.name
                && formatPhoneAndValidate(userData.phone)
                && dateIsNotAFutureDate(userData.birthDate)
                && validatePassword(userData.password)
                && userData.password.trim().length >= 7
                && userData.birthDate <= new Date(currentDate.current.getFullYear() - requiredAge, currentDate.current.getMonth(), currentDate.current.getDate())
                && userData.birthDate <= currentDate.current
                ? true : false
        );
    }
    useMemo(validateAllInputs, [userData])

    const modal = useRef<HTMLDivElement>(null);

    const onClose = useCallback(() => {
        setUserData({ name: "", email: "", phone: "", role: "user", birthDate: new Date(), password: "" });
        setOpen(false);
    }, [setOpen]);

    useEffect(() => {
        const modalRef = modal; 
        document.addEventListener('mousedown', ({ target }) => {
            if (!modalRef.current?.contains(target as Node)) onClose()
        })

        return () => {
            document.removeEventListener('mousedown', ({ target }) => {
                if (!modalRef.current?.contains(target as Node)) onClose()
            })
        }
    }, [onClose])

    function userHasMinimuAge() {
        // The provide birthDate should be before of the present date
        return requiredAge && requiredAge > 0 && userData.birthDate < currentDate.current
            // The provide birthDate should be before of the same date in (requiredAge) 
            && userData.birthDate > new Date(currentDate.current.getFullYear() - requiredAge, currentDate.current.getMonth(), currentDate.current.getDate())
    }

    function handleInput(ev: React.ChangeEvent<HTMLInputElement>) {
        setUserData({ ...userData, [ev.target.name]: ev.target.value })
    }

    const [mutateUser, { loading, error }] = useMutation(CREATE_USER)

    const create = async () => {
        if (!userData || !validInputs) return
        else {
            await mutateUser({
                variables: { data: userData },
                onError: (error) => console.error(`${error.name}: ${error.message}. ErrorObject: ${JSON.stringify(error)}`),
                onCompleted: () => navigate('/users')
            }).finally(() => onClose())
        }
    }

    return (
        <>
            <Modal ref={modal} open={open}>
                <form method="post">
                    <ModalHeading as="h2">Criar Usuário</ModalHeading>
                    <Wrapper $padding="0" $dir="column" $align="start" $gap="2rem">
                        <fieldset>
                            <Heading as="h3">Dados Pessoais</Heading>
                            <CustomGridWrapper $align="start">
                                <Label htmlFor="name">Nome
                                    <Input required onChange={handleInput} placeholder="Nome Completo" value={userData.name} name="name" id="name" type="text" autoComplete="name" />
                                </Label>
                                <Label htmlFor="email">Email
                                    <Input required onChange={handleInput} placeholder="seuemail@email.com" value={userData.email} name="email" id="email" type="email" autoComplete="email" />
                                    {!validateEmail(userData.email) && userData.email.trim() !== '' && <p>Formato de email inválido.</p>}
                                </Label>
                                <Label htmlFor="phone">Celular
                                    <Input required onChange={handleInput} placeholder="(99) 99999-9999" value={userData.phone} name="phone" id="phone" type="text" autoComplete="tel" />
                                    {!validatePhone(userData.phone) && userData.phone.trim() !== '' && <p>Formato de número de telefone inválido ou não suportado.</p>}
                                </Label>
                                <Label htmlFor="password">Senha
                                    <Input required onChange={handleInput} placeholder="Senha" value={userData.password} name="password" id="password" type="password" autoComplete="new-password" />
                                    {userData.password.trim().length < 7 && userData.password.trim() !== '' && <p>A senha deve ter ao menos 7 caractéres.</p>}
                                    {!validatePassword(userData.password) && userData.password.trim() !== '' && <p>A senha deve ser composta por caractéres alfánumericos.</p>}
                                </Label>
                                <Label htmlFor="birth-date">Data de Nascimento
                                    <Input $fill required onChange={({ target: { value } }) => setUserData({ ...userData, birthDate: new Date(value) })}
                                        value={
                                            (userData.birthDate.toISOString().split('T')[0])
                                            || new Date().toISOString().split('T')[0]}
                                        name="birthDate" id="birth-date" type="date" />
                                    {!dateIsNotAFutureDate(userData.birthDate) && (
                                        <p>A data não pode ser no futuro.</p>
                                    )}

                                    {/* The provide birthDate should be before of the present date */}
                                    {(userHasMinimuAge() && (
                                        <p>O usuário precisa ter ao menos {requiredAge} anos.</p>
                                    )) || ''}
                                </Label>
                            </CustomGridWrapper>
                        </fieldset>
                        <fieldset>
                            <Heading as="h3">Nível de Permissões</Heading>
                            <Label $dir="row" htmlFor="user-role">
                                <Input onChange={handleInput} value={"user"} name="role" id="user-role" type="radio" defaultChecked />
                                <span>Usuário</span>
                            </Label>
                            <Label $dir="row" htmlFor="admin-role">
                                <Input onChange={handleInput} value={"admin"} name="role" id="admin-role" type="radio" />
                                <span>Administrador</span>
                            </Label>
                        </fieldset>
                    </Wrapper>
                    {error && !loading && <StatusBlock $status="error"><p>{error.message}</p></StatusBlock>}
                    <Wrapper>
                        <Cta type="button" onClick={() => { onClose() }}>Cancelar</Cta>
                        <Cta disabled={loading || (validInputs ? false : true)} type="submit" onClick={(ev) => { ev.preventDefault(); create() }}>Adicionar</Cta>
                    </Wrapper>
                </form>
            </Modal>
        </>
    )
}