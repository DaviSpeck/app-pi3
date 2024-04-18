import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Navbar } from '../../components/header/Navbar';

const Lists: React.FC = () => {
  return (
    <div className='bg-gray-200'>

      <h1 className="flex h-16 items-center justify-center bg-gray-600 text-white">Lista</h1>

      <div className="grid grid-cols-1 place-items-center mt-2 p-3">

        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
          <img className="rounded w-24 p-3" src="https://guairaclean.com.br/wp-content/uploads/2017/08/produtos-limpeza-concentrados.jpg" alt="" />
          <div className="flex justify-between p-4">
            <h5 className="mb-2 mr-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lista 1</h5>
            <div className="mt-1 ml-3">
              <ExpandMoreIcon className='bg-gray-600 rounded'/>
            </div>
          </div>
        </div>

        <div className="mt-3 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
          <img className="rounded w-24 p-3" src="https://www.metroworldnews.com.br/resizer/TH6BtQvfAjgdwiI4IfmSzcz_a1U=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/Z555C6TMAFHKXCZBXJ3TC6DXII.jpg" alt="" />
          <div className="flex justify-between p-4">
            <h5 className="mb-2 mr-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lista 2</h5>
            <div className="mt-1 ml-3">
              <ExpandMoreIcon className='bg-gray-600 rounded'/>
            </div>
          </div>
        </div>

        <div className="mt-3 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
          <img className="rounded w-24 p-3" src="https://r1web.com.br/univetus/wp-content/uploads/2022/11/dicas-ambiente-Vetus.jpg" alt="" />
          <div className="flex justify-between p-4">
            <h5 className="mb-2 mr-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lista 3</h5>
            <div className="mt-1 ml-3">
              <ExpandMoreIcon className='bg-gray-600 rounded'/>
            </div>
          </div>
        </div>

      </div>

      <Navbar />

    </div>
  )
}

export default Lists;
