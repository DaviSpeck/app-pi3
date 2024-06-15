import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
    if (!showModal) return null;
    const navigate = useNavigate();

    const saveList = async () => {

    }

    const dowloadPath = async () => {

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-4 pb-6">
            <div className="bg-white rounded-xl p-8 max-w-md mx-auto">
                <div className="text-center mb-4">
                    <img src="./img/success.png" alt="Success" className="mx-auto mb-4" />
                    <h2 style={{ fontSize: 24, lineHeight: 1.2 }} className="font-semibold mb-2">Parabéns, você finalizou sua lista de compra!</h2>
                    <p style={{ fontSize: 16 }} className="text-gray-600">Se deseja salvar, escreva um nome para a sua lista e clique em salvar!</p>
                </div>
                <input
                    type="text"
                    placeholder="Nome da Lista"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={async () => saveList()}
                    style={{ backgroundColor: '#0D0B26', fontSize: 14 }}
                    className="w-full text-white py-2 rounded-lg mb-2"
                >
                    Salvar
                </button>
                <button
                    onClick={async () => dowloadPath()}
                    style={{ backgroundColor: '#1D9100', fontSize: 14 }}
                    className="w-full text-white py-2 rounded-lg mb-2"
                >
                    Baixar rota
                </button>
                <button
                    style={{ backgroundColor: '#D61F1F', fontSize: 14 }}
                    className="w-full text-white py-2 rounded-lg"
                    onClick={() => navigate('/lists')}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default Modal;
