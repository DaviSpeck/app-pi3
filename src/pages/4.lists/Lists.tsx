import React, { useState } from "react";
import { GetProductListInterface } from "../../interfaces/ProductList/productList.interface";
import productListService from "../../services/productList.service";

const Lists: React.FC = () => {
  const [results, setResults] = useState<GetProductListInterface[]>([]);

  const getData = async (page: number) => {
    const response = await productListService.listAll();
  };

  return (
    <div className="bg-gray-200">
      <h1 className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full" style={{ fontSize: 18, zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>MINHAS LISTAS</h1>

      <div className="grid grid-cols-1 place-items-center mt-18 p-3" style={{gap: '12px'}}>
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <div className="p-5 flex place-items-center" style={{display:'flex', gap: '56px'}}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Lista 1
            </h5>

            <div style={{display:'flex', gap: '12px'}}>
              <a
                href="/products?buy=true"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Editar
              </a>
              <a
                href="/products"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Excluir
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <div className="p-5 flex place-items-center" style={{display:'flex', gap: '56px'}}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Lista 2
            </h5>

            <div style={{display:'flex', gap: '12px'}}>
              <a
                href="/products?buy=true"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Editar
              </a>
              <a
                href="/products"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Excluir
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <div className="p-5 flex place-items-center" style={{display:'flex', gap: '56px'}}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Lista 3
            </h5>

            <div style={{display:'flex', gap: '12px'}}>
              <a
                href="/products?buy=true"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Editar
              </a>
              <a
                href="/products"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Excluir
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 place-items-center mb-8 mt-4">
        <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-100-600 dark:hover:bg-green-700 dark:focus:ring-green-800" data-mdb-ripple-init>Adicionar</button>
      </div>

    </div>
  );
};

export default Lists;
