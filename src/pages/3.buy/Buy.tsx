import React, { useEffect, useState } from 'react';
import { CategoryInterface } from '../../interfaces/Category/category.interface';
import categoryService from '../../services/category.service';

const Buy: React.FC = () => {

  const [results, setResults] = useState<CategoryInterface[]>([])
  const controller = new AbortController()

  useEffect(() => {
    const getData = async () => {
      const response = await categoryService.listAll()
      setResults(response)
    }

    getData()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    console.log(results, 'results')
  }, [results])

  return (
    <div className='bg-slate-200'>

<h1 className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full" style={{ fontSize: 18, zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>COMPRAR</h1>

      <div className="grid grid-cols-1 place-items-center mt-18 p-3">

        {results.map((item) => (
          <div className="w-full my-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
            <div className="flex flex-col justify-between p-4">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.categoryName}</h5>
              <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </div>
        ))}

        <button className="mt-3 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-60 h-12 place-content-center" style={{ marginBottom: '5rem' }}>
          <span>Finalizar compra</span>
        </button>

      </div>

    </div>
  )
}

export default Buy;
