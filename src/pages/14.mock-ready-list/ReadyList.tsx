import { useNavigate } from "react-router-dom";

const ReadyList: React.FC = () => {

    const products = [
        {
          image: './img/MockChurrasco/carvao.jpg',
          name: 'Carvão 5kg',
          price: 'R$ 20,00',
          qtd: '1',
        },
        {
          image: './img/MockChurrasco/alcatra.jpg',
          name: 'Alcatra 200g',
          price: 'R$ 10,74',
          qtd: '1',
        },
        {
          image: './img/MockChurrasco/linguica.jpg',
          name: 'Linguiça de Porco 200g',
          price: 'R$ 8,89',
          qtd: '1',
        },
        {
          image: './img/MockChurrasco/picanha.jpg',
          name: 'Picanha 200g',
          price: 'R$ 15,78',
          qtd: '1',
        },
        {
          image: './img/MockChurrasco/file-de-frango.jpg',
          name: 'File de Frango 200g',
          price: 'R$ 14,99',
          qtd: '1',
        },
        {
          image: './img/MockChurrasco/heineken.jpg',
          name: 'Heineken Long Neck 6 unidades',
          price: 'R$ 33,20',
          qtd: '1',
        },
        {
          image: './img/MockChurrasco/guarana.jpg',
          name: 'Guaraná Antártica 2L',
          price: 'R$ 6,69',
          qtd: '2',
        },
        {
          image: './img/MockChurrasco/coca.jpg',
          name: 'Coca-Cola 2L',
          price: 'R$ 9,69',
          qtd: '2',
        }
    ];

    const navigate = useNavigate();

    // const renderPagination = () => {
    //     const startPage = 1;
    //     const endPage = 5;
    
    //     return (
    //       <nav className="flex justify-center space-x-2" aria-label="Pagination">
    //         <button
    //           className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700`}
    //         >
    //           <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
    //         </button>
    //         {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
    //           <button
    //             className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700`}
    //           >
    //             {pageNumber}
    //           </button>
    //         ))}
    //         <button
    //           className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700`}
    //         >
    //           <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
    //         </button>
    //       </nav>
    //     );
    // };
    
    return (
      <>
        <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          CHURRASCO DE FINAL DE SEMANA
        </header>

        <div className="bg-gray-200" style={{ marginBottom: 40 }}>
          <h1 className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full" style={{ fontSize: 18, zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>LISTAS PRONTAS</h1>
              
          <div className="flex flex-col text-center justify-between mt-20 pl-3">
            <p className="text-base text-gray-600" style={{fontSize: 18}}>Churrasco de final de semana</p>
            <p className="text-base text-gray-600" style={{fontSize: 18}}>10 itens</p>
            {/* <p className="text-base text-gray-600">Página 1 - 10</p> */}
          </div>

          <div className="grid grid-cols-1 place-items-center mt-1">
            <div className="grid grid-cols-2 p-3 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((item) => (
              <a className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                  <img
                  src={item.image}
                  className="h-48 w-full object-cover object-center group-hover:opacity-75"
                  alt={item.name}
                  />
                  <div className="bg-gray-600" style={{ position: "absolute", width: 21, height: 21, zIndex: 2, borderRadius: 21, right: 5, top: 5 }}>
                    <p className="text-white text-center text-sm">{item.qtd}</p>
                  </div>
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                <p className="mt-1 text-lg font-medium">{(item.price)}</p>
              </a>
            ))}
            </div>
          </div>
          {/* {renderPagination()} */}
          <div style={{justifyContent: 'center', display: 'flex', marginTop: 10, padding: 10}}>
            <button onClick={() => navigate('/lists')}
              style={{width: '80%', height: '50px', backgroundColor: 'green', color: 'white', border: 'none',borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.1s ease'}}
            >
              Comprar
            </button>

            <button onClick={() => navigate('/lists')}
              style={{width: '80%', height: '50px', backgroundColor: '#000', color: 'white', border: 'none',borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.1s ease', marginLeft: 16}}
            >
              Voltar
            </button>
          </div>
        </div>
      </>
    )
}
  
export default ReadyList