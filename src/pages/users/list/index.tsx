import { useGetUsers } from '../../../hooks/useGetUsers';
import { UserDto } from '../../../types/user';
import { useState } from 'react';
import { getLoginToken } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../../components/common/Heading';
import styled from 'styled-components';
import { Table } from '../../../components/common/Table';
import { GridWrapper, Wrapper } from '../../../components/common/Wrapper';
import { Cta } from '../../../components/common/Cta';
import { Spinner } from '../../../components/common/Spinner';
import { Menu } from '../../../components/common/Menu';
import { Link } from '../../../components/common/Link';

const Container = styled.main`
  width: 100%;
  max-width: 70cqw;
  margin: 0 auto;
`;

export default function UsersList() {
  const navigate = useNavigate();
  if (!getLoginToken()) navigate('/login', { replace: true });

  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useGetUsers({ offset, limit: 20 });

  return (
    <Container>
      <Wrapper $dir='column'>
        <Wrapper $dir='column' $maxWidth='80cqw' $gap='1rem'>
          <Menu $gap='.5rem'>
            <Heading as={'h2'}>Atalhos rápidos</Heading>
            <Wrapper as={'nav'} $wrap='wrap' $gap='12px'>
              <Link $fill $appearAsButton to={'/'}>
                Início
              </Link>
              <Link $fill $appearAsButton to={'management'}>
                Controle de usuários
              </Link>
            </Wrapper>
          </Menu>
        </Wrapper>

        <Heading as='h2' $size='1.5rem' $accentElementDir='inline-flex'>
          Lista de <span className='highlight'>Usuários</span>
        </Heading>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <Wrapper $justify='start' $padding='0' as='tbody'>
            {data?.users.nodes.map((user: UserDto) => (
              <GridWrapper $padding='7px' $columns='1fr 1fr' as='tr' onClick={() => navigate(`/users/user/${user.id}`)} key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </GridWrapper>
            ))}
            {loading && (
              <GridWrapper $columns='1fr 1fr' as='tr'>
                <Wrapper as='td' $align='center' $justify='center'>
                  <Spinner />
                  Carregando...
                </Wrapper>
                <td></td>
              </GridWrapper>
            )}
          </Wrapper>
          <Wrapper>
            <Cta disabled={offset <= 0} onClick={() => setOffset(() => offset - 10)}>
              Anterior
            </Cta>
            <Cta disabled={!!error || loading} onClick={() => setOffset(() => offset + 10)}>
              Próximo
            </Cta>
          </Wrapper>
        </Table>
      </Wrapper>
    </Container>
  );
}
