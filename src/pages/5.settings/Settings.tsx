import React from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { IStore } from '../../store/types';

const Settings: React.FC = () => {

  const { logout } = useAuth()
  const navigate = useNavigate()

  const customer = useSelector((store: IStore) => store.customer);

  async function handleLogout(): Promise<void> {
    try {
      await logout()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>

      <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        Ajustes
      </header>

      <div className='bg-gray-200 mt-24 px-8'>
        <div className="card-settings mb-8">
          <ul className="space-y-6">
            <li>
              <div className="flex items-center justify-between">
                <div className='flex items-center'>
                  <FaUserCircle color='black' size={57}/>
                  <div className='pl-4'>
                    <p className="name-user">
                      {customer.customerName}
                    </p>
                    <p className="email-user">
                      {customer.customerEmail}
                    </p>
                  </div>
                </div>
                <MdOutlineEdit color='#ABABAB' size={24} />
              </div>
            </li>
          </ul>
        </div>

        <div className="card-settings">
          <ul className="space-y-6">
            <li>
              <div className="flex items-center justify-between">
                <div className='flex items-center'>
                  <img src='../.././img/Settings/my-account.png' />
                  <div className='pl-4'>
                    <p className="title-settings">
                      Minha conta
                    </p>
                    <p className="description-settings">
                      Dados da conta
                    </p>
                  </div>
                </div>
                <MdOutlineKeyboardArrowRight color='#ABABAB' size={28} />
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <div className='flex items-center'>
                  <img src='../.././img/Settings/tutorial.png' />
                  <div className='pl-4'>
                    <p className="title-settings">
                      Tutorial
                    </p>
                    <p className="description-settings">
                      Como usar o App
                    </p>
                  </div>
                </div>
                <MdOutlineKeyboardArrowRight color='#ABABAB' size={28} />
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <div className='flex items-center'>
                  <img src='../.././img/Settings/change-password.png' />
                  <div className='pl-4'>
                    <p className="title-settings">
                      Alterar senha
                    </p>
                    <p className="description-settings">
                      Senha de acesso
                    </p>
                  </div>
                </div>
                <MdOutlineKeyboardArrowRight color='#ABABAB' size={28} />
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <div className='flex items-center'>
                  <img src='../.././img/Settings/support.png' />
                  <div className='pl-4'>
                    <p className="title-settings">
                      Suporte
                    </p>
                    <p className="description-settings">
                      Dúvidas e Sugestões
                    </p>
                  </div>
                </div>
                <MdOutlineKeyboardArrowRight color='#ABABAB' size={28} />
              </div>
            </li>
            <li onClick={handleLogout}>
              <div className="flex items-center justify-between">
                <div className='flex items-center'>
                  <img src='../.././img/Settings/logout.png' />
                  <div className='pl-4'>
                    <p className="title-settings">
                      Sair
                    </p>
                    <p className="description-settings">
                      Desconectar do App
                    </p>
                  </div>
                </div>
                <MdOutlineKeyboardArrowRight color='#ABABAB' size={28} />
              </div>
            </li>
          </ul>
        </div>
      </div>

    </>
  )
}

export default Settings;
