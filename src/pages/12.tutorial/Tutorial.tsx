import Carousel from "./components/Carousel"

import Produtos from './img/produtos.jpg'
import Comprar from './img/comprar.jpg'
import Rota from './img/rota.jpg'
import Filtro from './img/filtro.jpg'

import Lists1 from './imgLists/lists1.png'
import Lists2 from './imgLists/lists2.png'
import Lists3 from './imgLists/lists3.png'

import { useState } from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

const ListsSlides = [
    { 
        image: Lists1, 
        desc: "Na Home, clique em Ver Listas, ou, pela navbar do aplicativo, clique em Listas."
    },
    { 
        image: Lists2, 
        desc: "Selecione a lista de compras desejada para que o menu de opções seja expandido."
    },
    { 
        image: Lists3, 
        desc: "Selecione o botão Baixar Rota e aguarde alguns instantes enquanto calculamos o seu Caminho da Comida!"
    },
];

const ProductsSlides = [
    { 
        image: Produtos, 
        desc: "Passo 1 para produtos"
    },
    { 
        image: Comprar, 
        desc: "Passo 2 para produtos"
    },
    { 
        image: Rota, 
        desc: "Passo 3 para produtos"
    },
    { 
        image: Filtro, 
        desc: "Passo 4 para produtos"
    },
];

const Tutorial: React.FC = () => {
    // Estado para controlar a abertura dos cards
    const [openLists, setOpenLists] = useState<boolean>(false);
    const [openProducts, setOpenProducts] = useState<boolean>(false);
    const [openTest1, setopenTest1] = useState<boolean>(false);
    const [openTest2, setopenTest2] = useState<boolean>(false);

    const toggleOpenLists = () => {
        setOpenLists(!openLists); // Alterna entre abrir e fechar o card de listas
    };

    const toggleOpenProducts = () => {
        setOpenProducts(!openProducts); // Alterna entre abrir e fechar o card de produtos
    };

    const toggleopenTest1 = () => {
        setopenTest1(!openTest1); // Alterna entre abrir e fechar o card de produtos
    };

    const toggleopenTest2 = () => {
        setopenTest2(!openTest2); // Alterna entre abrir e fechar o card de produtos
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                Tutorial
            </header>

            <div className='bg-gray-200 px-4'>
                <div className="flex flex-col items-center mt-24 mb-28">
                    <div className="w-full">
                        {/* Card 1: Como ver o Caminho da Comida */}
                        <div className="bg-white p-6 rounded-2xl shadow-md mb-4">
                            <div className="flex justify-between items-center">
                                <p className="text-2xl text-gray-800">1. Como encontrar o Caminho da Comida?</p>
                                <button onClick={toggleOpenLists}>
                                    {openLists ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
                                </button>
                            </div>
                            {openLists && (
                                <div className="mt-4">
                                    <Carousel>
                                        {ListsSlides.map((s, index) => (
                                            <div key={index}>
                                                <img src={s.image} alt="Tutorial slide" className="w-full max-h-fit mt-4" />
                                                <p className="mt-6 text-lg text-gray-800 overflow-hidden text-ellipsis whitespace-normal">{s.desc}</p>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}
                        </div>

                        {/* Card 2: Teste */}
                        <div className="bg-white p-6 rounded-2xl shadow-md mb-4">
                            <div className="flex justify-between items-center">
                                <p className="text-2xl text-gray-800">2. Como criar uma lista?</p>
                                <button onClick={toggleOpenProducts}>
                                    {openProducts ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
                                </button>
                            </div>
                            {openProducts && (
                                <div className="mt-4">
                                    <Carousel>
                                        {ProductsSlides.map((s, index) => (
                                            <div key={index}>
                                                <img src={s.image} alt="Tutorial slide" className="w-full max-h-fit mt-4" />
                                                <p className="mt-6 text-lg text-gray-800 overflow-hidden text-ellipsis whitespace-normal">{s.desc}</p>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}
                        </div>

                        {/* Card 2: Como ver os produtos */}
                        <div className="bg-white p-6 rounded-2xl shadow-md mb-4">
                            <div className="flex justify-between items-center">
                                <p className="text-2xl text-gray-800">3. Como ver os produtos disponíveis?</p>
                                <button onClick={toggleopenTest1}>
                                    {openTest1 ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
                                </button>
                            </div>
                            {openTest1 && (
                                <div className="mt-4">
                                    <Carousel>
                                        {ProductsSlides.map((s, index) => (
                                            <div key={index}>
                                                <img src={s.image} alt="Tutorial slide" className="w-full max-h-fit mt-4" />
                                                <p className="mt-6 text-lg text-gray-800 overflow-hidden text-ellipsis whitespace-normal">{s.desc}</p>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}
                        </div>

                        {/* Card 4: Teste */}
                        <div className="bg-white p-6 rounded-2xl shadow-md mb-4">
                            <div className="flex justify-between items-center">
                                <p className="text-2xl text-gray-800">4. Como filtrar os produtos?</p>
                                <button onClick={toggleopenTest2}>
                                    {openTest2 ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
                                </button>
                            </div>
                            {openTest2 && (
                                <div className="mt-4">
                                    <Carousel>
                                        {ProductsSlides.map((s, index) => (
                                            <div key={index}>
                                                <img src={s.image} alt="Tutorial slide" className="w-full max-h-fit mt-4" />
                                                <p className="mt-6 text-lg text-gray-800 overflow-hidden text-ellipsis whitespace-normal">{s.desc}</p>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}
                        </div>

                        {/* Card 5: Teste */}
                        <div className="bg-white p-6 rounded-2xl shadow-md mb-4">
                            <div className="flex justify-between items-center">
                                <p className="text-2xl text-gray-800">5. Como adicionar uma lista pronta?</p>
                                <button>
                                    {openProducts ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
                                </button>
                            </div>
                            {openProducts && (
                                <div className="mt-4">
                                    <Carousel>
                                        {ProductsSlides.map((s, index) => (
                                            <div key={index}>
                                                <img src={s.image} alt="Tutorial slide" className="w-full max-h-fit mt-4" />
                                                <p className="mt-6 text-lg text-gray-800 overflow-hidden text-ellipsis whitespace-normal">{s.desc}</p>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tutorial;
