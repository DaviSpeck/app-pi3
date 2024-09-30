import React, { useEffect, useState } from "react";
import { GetProductListInterface } from "../../interfaces/ProductList/product-list.interface";
import productListService from "../../services/productList.service";
import { FaPlus } from 'react-icons/fa';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../store/types";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { changeSpinner } from "../../store/slices/app.slice";
import supermarketService from "../../services/supermarket.service";
import { toast } from "react-toastify";
import { HandThumbUpIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";

interface ListItemProps {
  item: GetProductListInterface;
  getProductLists: () => void;
}

interface ReadyListProps {
  title: string;
  likes: number;
}
const ReadyList: React.FC<ReadyListProps> = ({ title, likes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="bg-white p-6 rounded-2xl shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div>
            <div style={{ fontSize: 18 }} className="font-semibold">{title}</div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <HandThumbUpIcon className="h-4 w-4 mr-1" style={{color: '#29b50d'}}/>
              <p style={{ fontSize: 14 }} className="text-gray-500">{likes} pessoas curtiram essa lista</p>
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-2">
          <button onClick={() => navigate('/ready-list')} style={{ backgroundColor: '#0D0B26', fontSize: 14 }} className="w-full text-white py-2 rounded-xl">Ver lista</button>
          <button style={{ backgroundColor: '#1daeff', fontSize: 14 }} className="w-full text-white py-2 rounded-xl">Adicionar em MINHAS LISTAS</button>
          <button style={{ backgroundColor: '#1D9100', fontSize: 14 }} className="w-full text-white py-2 rounded-xl">Baixar rota</button>
        </div>
      )}
    </div>
  );
};

const ListItem: React.FC<ListItemProps> = ({ item, getProductLists }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const downloadPath = async () => {
    dispatch(changeSpinner(true));
    try {
      const bestPath = await supermarketService.getBestPathByProductListID(item.productListID);

      const response = await fetch('https://davispeck.pythonanywhere.com/generate_gif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: bestPath
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'path.gif';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to download the file');
      }
    } catch (error) {
      console.error('Error downloading path:', error);
    } finally {
      dispatch(changeSpinner(false));
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-4">
      <div onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center">
        <div className="flex items-center">
          <div>
            <div style={{ fontSize: 18 }} className="font-semibold">{item.productListTitle}</div>
            <div style={{ fontSize: 14 }} className="text-gray-500">{formatDate(item.productListPurchaseDate)}</div>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-2">
          <button onClick={() => navigate('/buy', { state: { productList: item } })} style={{ backgroundColor: '#0D0B26', fontSize: 14 }} className="w-full text-white py-2 rounded-xl">Editar</button>
          <button onClick={async () => downloadPath()} style={{ backgroundColor: '#1D9100', fontSize: 14 }} className="w-full text-white py-2 rounded-xl">Baixar rota</button>
          <button onClick={async () => {
            dispatch(changeSpinner(true));
            await productListService.deleteListByProductListID(item.productListID)
            await getProductLists()
            toast.success("Lista excluída!")
            dispatch(changeSpinner(false));
          }} style={{ backgroundColor: '#D61F1F', fontSize: 14 }} className="w-full text-white py-2 rounded-xl">Excluir</button>
        </div>
      )}
    </div>
  );
};

const Lists: React.FC = () => {
  const [lists, setLists] = useState<GetProductListInterface[]>([]);

  const customer = useSelector((store: IStore) => store.customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProductLists = async () => {
    dispatch(changeSpinner(true));
    await productListService.listAllByCustomerID(customer.customerID).then((response) => {
      setLists(response);
      dispatch(changeSpinner(false));
    }).catch(() => {
      dispatch(changeSpinner(false));
    })
  };

  useEffect(() => {
    getProductLists()
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        Listas de Compras
      </header>
      <div className="p-4" style={{ marginTop: 80, marginBottom: 80 }}>
        {lists.map((item, index) => (
          <ListItem key={index} item={item} getProductLists={() => getProductLists()} />
        ))}
        <button
          className="flex items-center justify-center bg-black text-white rounded-full h-12 w-12 mt-4 mx-auto"
          onClick={() => navigate('/buy')}
        >
          <FaPlus size={25} />
        </button>

        <div className="flex-row mt-10 mb-5 justify-center" style={{display: 'flex', flexDirection: 'row'}}>
          <p style={{fontSize: 18}}>Listas prontas para você</p>
          <ShoppingBagIcon className="h-6 w-6 pl-1" style={{color:'#1daeff'}}/>
        </div>
        <ReadyList title="Churrasco de Final de Semana" likes={326} />
        <ReadyList title="Almoço fitness" likes={108} />
        <ReadyList title="Hamburguer caseiro" likes={203} />
        <ReadyList title="Escondidinho de Carne" likes={89} />
      </div>
    </>
  );
};

export default Lists;
