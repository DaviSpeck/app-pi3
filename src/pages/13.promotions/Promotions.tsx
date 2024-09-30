import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { CiFilter } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Promotions: React.FC = () => {

    const products = [
        {
          image: './img/Promotions/omo.jpg',
          name: 'Sabão OMO',
          price: 'R$ 16,99',
          category: 'Produtos de limpeza',
          qtd: '10',
        },
        {
          image: './img/Promotions/veja.jpg',
          name: 'Veja',
          price: 'R$ 10,74',
          category: 'Produtos de limpeza',
          qtd: '10',
        },
        {
          image: './img/Promotions/papel-higienico.jpg',
          name: 'Papel Higiênico',
          price: 'R$ 8,89',
          category: 'Higiene pessoal',
          qtd: '10',
        },
        {
          image: './img/Promotions/file-de-frango.jpg',
          name: 'File de Frango',
          price: 'R$ 14,99',
          category: 'Congelados e resfriados',
          qtd: '10',
        },
        {
          image: './img/Promotions/file-mignon.jpg',
          name: 'File Mignon',
          price: 'R$ 34,99',
          category: 'Açougue',
          qtd: '10',
        },
        {
          image: './img/Promotions/creme-cheese.jpg',
          name: 'Creme cheese',
          price: 'R$ 9,69',
          category: 'Frios e laticínios',
          qtd: '10',
        }
    ];

    const navigate = useNavigate();

    const renderPagination = () => {
        const startPage = 1;
        const endPage = 5;
    
        return (
          <nav className="flex justify-center space-x-2" aria-label="Pagination">
            <button
              className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700`}
              onClick={() => navigate('/home')}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
              <button
                className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700`}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        );
    };
    
    return (
        <>
            <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                Tutorial
            </header>

            <div className="bg-gray-200" style={{ marginBottom: 80 }}>
                <h1 className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full" style={{ fontSize: 18, zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>PRODUTOS EM PROMOÇÃO</h1>
                <form className="max-w-md mx-auto w-full p-4 mt-16">
                    <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-3 flex items-center">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full pl-10 pr-12 py-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Pesquisar..."
                        />
                        <div onClick={() => navigate('/filter')} className="absolute inset-y-0 right-3 flex items-center">
                            <CiFilter
                            size={24}
                            color='#6B7280'
                        />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mt-3">
                    <p className="text-base text-gray-600">6 itens por página</p>
                    <p className="text-base text-gray-600">Página 1 - 10</p>
                    </div>
                </form>

                <div className="grid grid-cols-1 place-items-center">
                    <div className="grid grid-cols-2 p-3 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((item) => (
                        <a className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                                <img
                                src={item.image}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                alt={item.name}
                                />
                                <div className="bg-gray-600" style={{ position: "absolute", width: 21, height: 21, zIndex: 2, borderRadius: 21, right: 5, top: 5 }}>
                                <p className="text-white text-center text-sm">{item.qtd}</p>
                                </div>
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                            <p className="mt-1 text-lg font-medium text-green-600">{(item.price)}</p>
                        </a>
                    ))}
                    </div>
                </div>
                {renderPagination()}
            </div>
        </>
    )
}
  
export default Promotions