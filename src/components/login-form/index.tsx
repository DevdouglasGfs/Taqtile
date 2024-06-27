import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import { checkLoginStatus, storeLoginToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { UserBasicLoginData } from '../../types/user';
import { validateEmail, validatePassword } from '../../utils/validators';
import { Heading } from '../common/heading';
import { Wrapper } from '../common/wrapper';
import { Label } from '../common/label';
import { StatusBlock } from '../common/statusBlock';
import { Cta } from '../common/cta';
import { Spinner } from '../common/spinner';
import styled from 'styled-components';
import { StyledForm } from '../common/form';
import { Input } from '../common/input';
import { useAuthentication } from '../../hooks/useAuth';

const CustomHeading = styled(Heading)`
  font-size: 1.5rem;
`;


export default function LoginForm() {

  const navigate = useNavigate()
  if (useAuthentication().authenticated) navigate('/users', { replace: true })

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const [userData, setUserData] = useState<UserBasicLoginData>({
    email: '',
    password: ''
  });

  onkeydown = (ev) => {
    if (ev.key === 'Enter') validateInput();
  };

  const validateInput = () => {
    // Make the user input validation removing any spaces in the start and end of the input.
    if (validateEmail(userData.email)) setValidEmail(true);
    else setValidEmail(false);
    if (validatePassword(userData.password) && userData.password.trim().length >= 7) setValidPassword(true);
    else setValidPassword(false);

    !validEmail || !validPassword ? setShowValidationMessage(true) : setShowValidationMessage(false);
    return validEmail && validPassword
  };

  const [mutateLogin, { error, loading }] = useMutation(LOGIN_MUTATION)

  function handleInput({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value })
  }

  async function login() {
    validateInput() && mutateLogin({
      variables: { data: userData },
      onCompleted: () => navigate('/users', { replace: true }),
      onError: (error) => console.log(error)
    }).then(({ data: { login: { token } } }) => storeLoginToken(token)).catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      <StyledForm>
        <CustomHeading>Bem-vindo(a) à Taqtile!</CustomHeading>
        <Wrapper $dir='column' $gap='2rem'>
          <fieldset>
            <Label htmlFor='email'>
              Email
              <Input
                id='email'
                name='email'
                required
                value={userData.email}
                onChange={handleInput}
                type='email'
                placeholder='Digite seu email'
                autoComplete='email'
              />
              {showValidationMessage && !validEmail && <p>Digite um email válido.</p>}
            </Label>
            <Label htmlFor='password'>
              Senha
              <Input
                id='password'
                name='password'
                required
                value={userData.password}
                onChange={handleInput}
                type='password'
                autoComplete='current-password'
              />
              {showValidationMessage && userData.password.trim().length < 7 && (
                <p>A senha deve ter ao menos 7 caractéres.</p>
              )}
              {!validatePassword(userData.password) && userData.password.trim() !== '' && <p>A senha deve ser composta por caractéres alfánumericos.</p>}
            </Label>
          </fieldset>
          {error && !loading && <StatusBlock $status='error'><p>{error.message}</p></StatusBlock>}
        </Wrapper>

        <Cta $primary disabled={loading} aria-disabled={loading} type='submit' onClick={(ev) => { ev.preventDefault(); login() }}>
          Entrar {loading && <Spinner />}
        </Cta>
      </StyledForm>
    </>
  );
}
