import { useCallback, useEffect, useRef, useState } from "react";
import { UserDto } from "../../types/user";
import { dateIsNotAFutureDate, validateEmail, validatePhone } from "../../utils/validators";


export default function CreateUser({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [userData, setUserData] = useState<Omit<UserDto, 'id' | 'birthDate'>>({ name: '', email: '', phone: '', role: 'user' });
    const [birthDate, setBirthDate] = useState<Date>();

    const formatPhoneAndValidate = (phone: string) => {
        const phoneWithJustNumbers = phone.trim().replace(/\D+/g, '')
        return validatePhone(phoneWithJustNumbers)
    }

    const [validInputs, setValidInputs] = useState(false)
    const validateAllInputs = useEffect(() => {
        // Check if all inputs except birth date are filled
        setValidInputs(
            validateEmail(userData.email) && userData.name
                && formatPhoneAndValidate(userData.phone) && birthDate
                && dateIsNotAFutureDate(birthDate) ? true : false
        );
    }, [birthDate, userData])

    const dialog = useRef<HTMLDialogElement>(null);

    const onClose = useCallback(() => {
        setUserData({
            name: "",
            email: "",
            phone: "",
            role: "user"
        });
        dialog.current?.close();
        setOpen(false);
    }, [setOpen]);

    const onClickOutside = useEffect(() => {
        document.addEventListener('mousedown', ({ target }) => {
            if (!dialog.current?.contains(target as Node)) {
                onClose()
            }
        })
    })

    const create = () => {
        if (!userData || !validInputs) return
        else {
            onClose()
        }
    }

    return (
        <>
            <dialog ref={dialog} open={open} className="create-user">
                <form method="post" className="create-user__form">
                    <h2 className="create-user__title">Criar Usuário</h2>
                    <div className="create-user__data-group">
                        <fieldset>
                            <h3 className="create-user__title">Dados Pessoais</h3>
                            <div className="create-user__input-group">
                                <label htmlFor="name">Nome
                                    <input onChange={ev => setUserData({ ...userData, name: ev.target.value })} placeholder="Nome Completo" value={userData.name} name="name" id="name" type="text" className="create-user__input" autoComplete="name" />
                                </label>
                                <label htmlFor="email">Email
                                    <input onChange={ev => setUserData({ ...userData, email: ev.target.value })} placeholder="seuemail@email.com" value={userData.email} name="email" id="email" type="email" className="create-user__input" autoComplete="email" />
                                </label>
                                <label htmlFor="phone">Celular
                                    <input onChange={ev => setUserData({ ...userData, phone: ev.target.value })} placeholder="(99) 99999-9999" value={userData.phone} name="phone" id="phone" type="text" className="create-user__input" autoComplete="tel" />
                                </label>
                                <label htmlFor="p">Celular
                                    <input onChange={ev => setUserData({ ...userData, phone: ev.target.value })} placeholder="(99) 99999-9999" value={userData.phone} name="phone" id="phone" type="text" className="create-user__input" autoComplete="tel" />
                                </label>
                                <label htmlFor="birth-date">Data de Nascimento
                                    <input onChange={ev => setBirthDate(new Date(ev.target.value))}
                                        value={birthDate && birthDate.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]}
                                        name="birthDate" id="birth-date" type="date" className="create-user__input" />
                                </label>
                            </div>
                        </fieldset>
                        <fieldset className="create-user__input-group_inline">
                            <h3 className="create-user__title">Nível de Permissões</h3>
                            <label htmlFor="user-role">
                                <input onChange={() => setUserData({ ...userData, role: "user" })} value={userData.role} name="role" id="user-role" type="radio" className="create-user__input" defaultChecked />
                                <span>Usuário</span>
                            </label>
                            <label htmlFor="admin-role">
                                <input onChange={() => setUserData({ ...userData, role: "admin" })} value={userData.role} name="role" id="admin-role" type="radio" className="create-user__input" />
                                <span>Administrador</span>
                            </label>
                        </fieldset>
                    </div>
                    <div className="create-user__action-group">
                        <button type="button" onClick={() => { onClose() }} className="create-user__cancel-cta">Cancelar</button>
                        <button disabled={validInputs ? false : true} type="submit" onClick={(ev) => { ev.preventDefault(); create() }} className="create-user__add-cta">Adicionar</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}