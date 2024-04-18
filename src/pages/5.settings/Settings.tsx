import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GppGoodIcon from '@mui/icons-material/GppGood';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navbar } from '../../components/header/Navbar';

const Settings: React.FC = () => {
  return (
    <div className='bg-gray-200'>

      <h1 className="flex h-16 items-center justify-center bg-gray-600 text-white">Ajustes</h1>

      <div className='p-5'>

        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-white rounded">
                    <AccountCircleIcon />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Minha conta
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Dados da conta
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center ">
                  <div className="flex-shrink-0 bg-white rounded">
                    <GppGoodIcon/>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Tutorial
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Como usar o App
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-white rounded">
                    <LockPersonIcon/>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Alterar senha
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Senha de acesso
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center ">
                  <div className="flex-shrink-0 bg-white rounded">
                    <NotificationsIcon/>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Suporte
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Dúvidas e Sugestões
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              </li>
              <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center ">
                  <div className="flex-shrink-0 bg-white rounded">
                    <LogoutIcon/>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Sair
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Desconectar do App
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navbar />

    </div>
  )
}

export default Settings;
