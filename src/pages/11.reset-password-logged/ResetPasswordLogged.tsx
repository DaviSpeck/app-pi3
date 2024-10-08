import React, { useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import customerService from '../../services/customer.service';
import { RequestUpdatePasswordCustomerInterface } from '../../interfaces/Customer/request-update-password-customer.interface';
import { useDispatch } from 'react-redux';
import { changeSpinner } from '../../store/slices/app.slice';
import { toast } from 'react-toastify';

const ResetPasswordLogged: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { customerID, customerEmail } = location.state || {};
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        dispatch(changeSpinner(true));
        event.preventDefault();
        if (password === confirmPassword) {
            try {
                const req: RequestUpdatePasswordCustomerInterface = {
                    customerID,
                    customerPassword: password,
                }
                await customerService.updatePassword(req);
                navigate('/settings');
                toast.success("Senha alterada com sucesso!")
            } catch (error) {
                console.error('Failed to update customer: ', error);
            }
        } else {
            console.error('As duas senhas devem ser iguais!');
        }
        dispatch(changeSpinner(false));
    };
    return (
        <section className='flex items-center justify-center' style={{ backgroundColor: '#F4F4F4' }}>
            <Link to='/settings' className='flex items-center cursor-pointer' style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                <IoArrowBackSharp size={24} />
            </Link>
            <div className='flex items-center justify-center h-screen' style={{ backgroundColor: '#F4F4F4', maxWidth: 400 }}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div style={{ width: 140, height: 140, backgroundColor: '#DEDEDE', borderRadius: 140 }} />
                    <p style={{ color: '#0D0B26' }} className='text-2xl font-semibold mt-4'>Redefinir senha</p>
                    <p style={{ color: '#61677D' }} className='text-sm text-center mt-3'>Escreva a sua nova senha, e lembre-se de colocar uma que não esqueça 🧐!</p>
                    <div className="w-full mt-5 sm:max-w-md xl:p-0">
                        <div className="flex flex-col justify-center items-center px-4 md:space-y-6 sm:p-8">
                            <form className="w-full mt-4 space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Confirme a Senha"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="btn-dark mt-2">
                                        Redefinir senha
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
export default ResetPasswordLogged;