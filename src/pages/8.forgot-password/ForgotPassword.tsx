import React, { useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import customerService from '../../services/customer.service';
import { GetCustomerInterface } from '../../interfaces/Customer/get-customer.interface';

const ForgotPassword: React.FC = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const customer = await customerService.findByEmail(email);
            navigate('/reset-password', { state: { customer } });
        } catch (error) {
            console.error('Failed to find customer:', error);
        }
    };

    return (
        <section className='flex items-center justify-center' style={{ backgroundColor: '#F4F4F4' }}>
            <Link to='/' className='flex items-center cursor-pointer' style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                <IoArrowBackSharp size={24} />
            </Link>
            <div className='flex items-center' style={{ position: 'absolute', top: '2.1rem' }}>
                <div className='flex gap-3'>
                    <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: '#0D0B26' }} />
                    <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: '#D6DFFF' }} />
                </div>
            </div>
            <div className='flex items-center justify-center h-screen' style={{ backgroundColor: '#F4F4F4', maxWidth: 400 }}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div style={{ width: 140, height: 140, backgroundColor: '#DEDEDE', borderRadius: 140 }} />
                    <p style={{ color: '#0D0B26' }} className='text-2xl font-semibold mt-4'>Esqueci a senha</p>
                    <p style={{ color: '#61677D' }} className='text-sm text-center mt-3'>Digite o e-mail para que a sua conta seja validada!</p>
                    <div className="w-full mt-5 sm:max-w-md xl:p-0">
                        <div className="flex flex-col justify-center items-center px-4 md:space-y-6 sm:p-8">
                            <form className="w-full mt-4 space-y-6" onSubmit={handleSubmit}>
                                <div>
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
                                    <button type="submit" className="btn-dark mt-2">
                                        Continuar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
