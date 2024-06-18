import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IStore } from '../../../store/types';
import productListService from '../../../services/productList.service';
import { changeSpinner } from '../../../store/slices/app.slice';
import { GetProductListInterface } from '../../../interfaces/ProductList/product-list.interface';

interface ModalProps {
    buyList: ProductListArr[];
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ buyList, showModal, setShowModal }) => {
    if (!showModal) return null;

    const [name, setName] = useState<string>('')
    const customer = useSelector((store: IStore) => store.customer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const saveList = async () => {
        dispatch(changeSpinner(true));
        const date = new Date();

        const year = date.getFullYear();
        let month = String(date.getMonth() + 1);
        if (Number(month) < 10) { month = `0${month}`; }
        let day = String(date.getDate());
        if (Number(day) < 10) { day = `0${day}`; }

        const formattedDate = `${year}-${month}-${day}`;

        const response = await productListService.create({
            productListPurchaseDate: formattedDate,
            productListTitle: name,
            customerID: customer.customerID
        })

        await productListService.addMultipleProducts(response.productListID, buyList)

        dispatch(changeSpinner(false));
        navigate('/lists')
    }

    const downloadPath = async () => {
        
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    onClick={async () => saveList()}
                    style={{ backgroundColor: '#0D0B26', fontSize: 14 }}
                    className="w-full text-white py-2 rounded-lg mb-2"
                >
                    Salvar
                </button>
                {/*<button
                    onClick={async () => downloadPath()}
                    style={{ backgroundColor: '#1D9100', fontSize: 14 }}
                    className="w-full text-white py-2 rounded-lg mb-2"
                >
                    Baixar rota
                </button>*/}
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
