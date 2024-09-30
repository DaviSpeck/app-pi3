import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const Login: React.FC = () => {

  const { currentUser, googleSignin, loginApi } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleGoogleLogin(): Promise<void> {
    try {
      await googleSignin();
      toast.success('Login realizado com sucesso!')
      navigate('/home')
    } catch {
      console.error('Failed to log in with Google')
      toast.error('Erro ao realizar Login!');
    }
  }

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseApi = await loginApi(email, password);
    console.log("response login: ", responseApi)

    if (!responseApi?.response) {
      toast.success('Login realizado com sucesso!');
      navigate('/home');
    } else if (responseApi?.response.data.status === 404) {
      toast.error('Erro ao realizar Login! Usuário não encontrado.');
    } else if (responseApi?.response.data.status === 401) {
      toast.error("Usuário ou senha incorretos")
    } else {
      toast.error('Erro ao realizar Login! Tente novamente mais tarde.');
    }
  };

  return (
    <section className='flex items-center justify-center h-screen' style={{ backgroundColor: '#F4F4F4', maxWidth: 400 }}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <img src={"./img/logo.png"} alt={"Logo de O Caminho da Comida"} width={140} height={140} style={{ borderRadius: 140 }} />
        <p style={{ color: '#0D0B26' }} className='text-2xl font-semibold mt-4'>Conectar-se</p>
        <p style={{ color: '#61677D' }} className='text-sm text-center mt-3'>Pare de perder tempo ao fazer as compras, agilize ao máximo com a melhor rota!</p>
        <div className="w-full mt-5 sm:max-w-md xl:p-0">
          <div className="flex flex-col justify-center items-center px-4 md:space-y-6 sm:p-8">
            <div onClick={handleGoogleLogin} style={{ backgroundColor: 'white' }} className='flex px-5 py-3 justify-center gap-3 rounded-xl cursor-pointer'>
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
                <div className="flex items-center justify-end mt-3">
                  <Link to="/forgot-password" className="text-sm hover:underline" style={{ color: '#7C8BA0' }}>
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn-dark mt-2"
                >
                  Login
                </button>
                <p className="text-sm font-light text-center mt-4" style={{ color: '#3B4054' }}>
                  Não tem uma conta?{' '}
                  <Link to="/register" className="hover:underline" style={{ color: '#0D0B26' }}>
                    Cadastrar-se
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

export default Login;
