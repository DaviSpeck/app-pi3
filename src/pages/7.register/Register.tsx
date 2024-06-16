import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import customerService from '../../services/customer.service';
import { RequestCustomerInterface } from '../../interfaces/Customer/request-customer.interface';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { changeSpinner } from '../../store/slices/app.slice';

const Register: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginApi } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    dispatch(changeSpinner(true));
    event.preventDefault();
    if (!acceptTerms) {
      console.error('É obrigatório aceitar os termos d euso e políticas de privacidade!');
    } else {
      try {
        const req: RequestCustomerInterface = {
          customerName: name,
          customerEmail: email,
          customerPassword: password,
          roleID: 3
        }
        await customerService.create(req).then(async (response: any) => {
          await loginApi(email, password).then(() => {
            navigate('/home');
          }).catch(() => {
            navigate('/')
          })
        });
      } catch (error) {
        console.error('Failed to create customer:', error);
      }
    }
    dispatch(changeSpinner(false));
  };

  return (
    <section className='flex items-center justify-center h-screen' style={{ backgroundColor: '#F4F4F4', maxWidth: 400 }}>
      <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto lg:py-0">
        <img src={"./img/logo.png"} alt={"Logo de O Caminho da Comida"} width={140} height={140} style={{ borderRadius: 140 }} />
        <p style={{ color: '#0D0B26' }} className='text-2xl font-semibold mt-4'>Cadastrar-se</p>
        <p style={{ color: '#61677D' }} className='text-sm text-center mt-3'>Pare de perder tempo ao fazer as compras, agilize ao máximo com a melhor rota!</p>
        <div className="w-full mt-5 sm:max-w-md xl:p-0">
          <div className="flex flex-col justify-center items-center px-4 md:space-y-6 sm:p-8">
            <div style={{ backgroundColor: 'white' }} className='flex px-5 py-3 justify-center gap-3 rounded-xl'>
              <FcGoogle size={24} />
              <p className='text-md font-medium' style={{ color: '#61677D' }}>Google</p>
            </div>
            <div style={{ position: 'relative' }} className='w-full'>
              <div style={{ height: 1, width: '100%', backgroundColor: '#E0E5EC' }} className='mt-10 mb-4' />
              <div style={{ position: 'absolute', zIndex: 2, bottom: 5, left: 0, right: 0, textAlign: 'center' }}>
                <p style={{ fontSize: 14, display: 'inline-block', padding: '2px 15px', borderRadius: '10px', color: '#262626', backgroundColor: '#F4F4F4' }}>Ou</p>
              </div>
            </div>
            <form className="w-full mt-4 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Nome
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex justify-start items-start mt-3 pl-2">
                  <div className="flex items-center h-5">
                    <input
                      checked={acceptTerms}
                      id="termsUsePrivacyPolicy"
                      aria-describedby="termsUsePrivacyPolicy"
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 shadow-sm focus:ring-primary-300 focus:border-primary-300"
                      onChange={() => setAcceptTerms(!acceptTerms)}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label style={{ fontSize: 12, color: '#3B4054' }} htmlFor="termsUsePrivacyPolicy" className="text-gray-500">
                      Eu concordo com os <span style={{ color: '#0D0B26' }}>Termos de uso</span> e <span style={{ color: '#0D0B26' }}>Políticas de privacidade</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <button type="submit" className="btn-dark mt-2">
                  Cadastrar-se
                </button>
                <p className="text-sm font-light text-center mt-4" style={{ color: '#3B4054' }}>
                  Já tem uma conta?{' '}
                  <Link to="/" className="hover:underline" style={{ color: '#0D0B26' }}>
                    Conectar-se
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
