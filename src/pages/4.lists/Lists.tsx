import React, { useState } from "react";
import { GetProductListInterface } from "../../interfaces/ProductList/productList.interface";
import productListService from "../../services/productList.service";
import { FaPlus } from 'react-icons/fa';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface ListItemProps {
  title: string;
  date: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, date }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gray-300 rounded-full h-12 w-12 mr-4"></div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm text-gray-500">{date}</div>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-2">
          <button className="w-full bg-blue-900 text-white py-2 rounded-md">Editar</button>
          <button className="w-full bg-green-600 text-white py-2 rounded-md">Baixar rota</button>
          <button className="w-full bg-red-600 text-white py-2 rounded-md">Excluir</button>
        </div>
      )}
    </div>
  );
};

const Lists: React.FC = () => {
  const [lists, setLists] = useState([
    { title: 'Lista 1', date: '03/03/2024' },
    { title: 'Lista 2', date: '03/03/2024' },
    { title: 'Lista 3', date: '03/03/2024' },
  ]);

  const addNewList = () => {
    const newList = { title: `Lista ${lists.length + 1}`, date: new Date().toLocaleDateString() };
    setLists([...lists, newList]);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        Listas
      </header>
      <div className="p-4" style={{ marginTop: 80 }}>
        {lists.map((list, index) => (
          <ListItem key={index} title={list.title} date={list.date} />
        ))}
        <button
          className="flex items-center justify-center bg-blue-500 text-white rounded-full h-12 w-12 mt-4 mx-auto"
          onClick={addNewList}
        >
          <FaPlus />
        </button>
      </div>
    </>
  );
};

export default Lists;
