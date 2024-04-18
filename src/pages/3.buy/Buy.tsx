import React from 'react';
import { Navbar } from '../../components/header/Navbar';

const Buy: React.FC = () => {
  return (
    <div className='bg-slate-200'>

      <h1 className="flex h-16 items-center justify-center bg-gray-600 text-white">Comprar</h1>

      <div className="grid grid-cols-1 place-items-center mt-2 p-3">

        <div className="w-full my-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
          <img className="rounded w-24 p-3" src="https://guairaclean.com.br/wp-content/uploads/2017/08/produtos-limpeza-concentrados.jpg" alt="" />
          <div className="flex flex-col justify-between p-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Produtos de Limpeza</h5>
              <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          </div>
        </div>

        <div className="w-full my-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
          <img className="rounded w-24 p-3" src="https://www.metroworldnews.com.br/resizer/TH6BtQvfAjgdwiI4IfmSzcz_a1U=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/Z555C6TMAFHKXCZBXJ3TC6DXII.jpg" alt="" />
          <div className="flex flex-col justify-between p-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bebidas Alcoólicas</h5>
            <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          </div>
        </div>

        {/* Adicione o resto dos elementos aqui */}

        <button className="mt-3 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-60 h-12 place-content-center" style={{ marginBottom: '5rem' }}>
          <span>Finalizar compra</span>
        </button>


      </div>

      <Navbar />

    </div>
  )
}

export default Buy;
