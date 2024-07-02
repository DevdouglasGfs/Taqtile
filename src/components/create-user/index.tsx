import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UserDto } from '../../types/user';
import { dateIsNotAFutureDate, formatPhoneAndValidate, validateEmail, validatePassword, validatePhone } from '../../utils/validators';
import { CREATE_USER } from '../../graphql/mutations/createUser';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { justNumbers } from '../../utils/formatters';

export default function CreateUser({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<Required<Omit<UserDto, 'id'>>>({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    birthDate: new Date(),
    password: '',
  });
  const requiredAge = 10;

  const [validInputs, setValidInputs] = useState(false);
  let currentDate = useRef(new Date());
  useMemo(() => {
    currentDate.current = new Date();
  }, [currentDate]);

  const validateAllInputs = useCallback(() => {
    // Check if all inputs are filled
    setValidInputs(
      validateEmail(userData.email) &&
        userData.name &&
        formatPhoneAndValidate(userData.phone) &&
        dateIsNotAFutureDate(userData.birthDate) &&
        validatePassword(userData.password) &&
        userData.password.trim().length >= 7 &&
        userData.birthDate <=
          new Date(currentDate.current.getFullYear() - requiredAge, currentDate.current.getMonth(), currentDate.current.getDate()) &&
        userData.birthDate <= currentDate.current
        ? true
        : false,
    );
  }, [userData, requiredAge]);

  useEffect(() => {
    const fieldsFilled = Object.values(userData).every((value) => value !== '');
    if (fieldsFilled) validateAllInputs();
  }, [userData, validateAllInputs]);

  const dialog = useRef<HTMLDialogElement>(null);

  const onClose = useCallback(() => {
    setUserData({ name: '', email: '', phone: '', role: 'user', birthDate: new Date(), password: '' });
    dialog.current?.close();
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', ({ target }) => {
      if (!dialog.current?.contains(target as Node)) onClose();
    });
  });

  function userHasMinimuAge() {
    // The provide birthDate should be before of the present date
    return (
      requiredAge &&
      requiredAge > 0 &&
      userData.birthDate < currentDate.current &&
      // The provide birthDate should be before of the same date in (requiredAge)
      userData.birthDate >
        new Date(currentDate.current.getFullYear() - requiredAge, currentDate.current.getMonth(), currentDate.current.getDate())
    );
  }

  function handleInput(ev: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, [ev.target.name]: ev.target.value });
  }

  const [mutateUser, { loading, error }] = useMutation(CREATE_USER);

  const create = async () => {
    if (!userData || !validInputs) return;
    else {
      await mutateUser({
        variables: { data: { ...userData, phone: justNumbers(userData.phone) } },
        onError: (error) => console.error(`${error.name}: ${error.message}`),
        // @]typescript-eslint/no-unused-expressiions
        onCompleted: () => {
          onClose();
          navigate('/users/list');
        },
      });
    }
  };

  return (
    <>
      <dialog ref={dialog} open={open} className='create-user'>
        <form method='post' className='create-user__form'>
          <h2 className='create-user__title'>Criar Usuário</h2>
          <div className='create-user__data-group'>
            <fieldset>
              <h3 className='create-user__title'>Dados Pessoais</h3>
              <div className='create-user__label-group'>
                <label className='input-group' htmlFor='name'>
                  Nome
                  <input
                    required
                    onChange={handleInput}
                    placeholder='Nome Completo'
                    value={userData.name}
                    name='name'
                    id='name'
                    type='text'
                    className='create-user__input'
                    autoComplete='name'
                  />
                </label>
                <label className='create-user__input-group' htmlFor='email'>
                  Email
                  <input
                    required
                    onChange={handleInput}
                    placeholder='seuemail@email.com'
                    value={userData.email}
                    name='email'
                    id='email'
                    type='email'
                    className='create-user__input'
                    autoComplete='email'
                  />
                  {!validateEmail(userData.email) && userData.email.trim() !== '' && (
                    <p className='input-group__informative-message'>Formato de email inválido.</p>
                  )}
                </label>
                <label className='create-user__input-group' htmlFor='phone'>
                  Celular
                  <input
                    required
                    onChange={handleInput}
                    placeholder='(99) 99999-9999'
                    value={userData.phone}
                    name='phone'
                    id='phone'
                    type='text'
                    className='create-user__input'
                    autoComplete='tel'
                  />
                  {!validatePhone(userData.phone) && userData.phone.trim() !== '' && (
                    <p className='input-group__informative-message'>Formato de número de telefone inválido ou não suportado.</p>
                  )}
                </label>
                <label className='create-user__input-group' htmlFor='password'>
                  Senha
                  <input
                    required
                    onChange={handleInput}
                    placeholder='Senha'
                    value={userData.password}
                    name='password'
                    id='password'
                    type='password'
                    className='create-user__input'
                    autoComplete='new-password'
                  />
                  {userData.password.trim().length < 7 && userData.password.trim() !== '' && (
                    <p className='input-group__informative-message'>A senha deve ter ao menos 7 caractéres.</p>
                  )}
                  {!validatePassword(userData.password) && userData.password.trim() !== '' && (
                    <p className='input-group__informative-message'>A senha deve ser composta por caractéres alfánumericos.</p>
                  )}
                </label>
                <label className='create-user__input-group' htmlFor='birth-date'>
                  Data de Nascimento
                  <input
                    required
                    onChange={({ target: { value } }) => setUserData({ ...userData, birthDate: new Date(value) })}
                    value={userData.birthDate.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]}
                    name='birthDate'
                    id='birth-date'
                    type='date'
                    className='create-user__input'
                  />
                  {!dateIsNotAFutureDate(userData.birthDate) && (
                    <p className='input-group__informative-message'>A data não pode ser no futuro.</p>
                  )}
                  {/* The provide birthDate should be before of the present date */}
                  {(userHasMinimuAge() && (
                    <p className='input-group__informative-message'>O usuário precisa ter ao menos {requiredAge} anos.</p>
                  )) ||
                    ''}
                </label>
              </div>
            </fieldset>
            <fieldset className='create-user__input-group_inline'>
              <h3 className='create-user__title'>Nível de Permissões</h3>
              <label htmlFor='user-role'>
                <input
                  onChange={handleInput}
                  value={'user'}
                  name='role'
                  id='user-role'
                  type='radio'
                  className='create-user__input'
                  defaultChecked
                />
                <span>Usuário</span>
              </label>
              <label htmlFor='admin-role'>
                <input onChange={handleInput} value={'admin'} name='role' id='admin-role' type='radio' className='create-user__input' />
                <span>Administrador</span>
              </label>
            </fieldset>
          </div>
          {error && !loading && <p className='info-block_error'>{error.message}</p>}
          <div className='create-user__action-group'>
            <button
              type='button'
              onClick={() => {
                onClose();
              }}
              className='create-user__cancel-cta'
            >
              Cancelar
            </button>
            <button
              disabled={loading || (validInputs ? false : true)}
              type='submit'
              onClick={(ev) => {
                ev.preventDefault();
                create();
              }}
              className='create-user__add-cta'
            >
              Adicionar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
