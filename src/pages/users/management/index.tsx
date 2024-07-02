import './management.css';
import { useState } from 'react';
import CreateUser from '../../../components/create-user';

export default function UserManagement() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CreateUser open={showModal} setOpen={setShowModal} />
      <h1 className='user-management-page__title'>Controle de Usuário</h1>

      <div className='user-management-page__action-group'>
        <button type='button' onClick={() => setShowModal(true)}>
          Adicionar Usuário
        </button>
      </div>
    </>
  );
}
