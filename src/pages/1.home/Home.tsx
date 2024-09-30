import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import customerService from '../../services/customer.service';
import { changeCustomerEmail, changeCustomerID, changeCustomerName, changeRoleID, changeRoleName } from '../../store/slices/customer.slice';
import { RequestCustomerInterface } from '../../interfaces/Customer/request-customer.interface';
import { TagIcon } from '@heroicons/react/20/solid';

const Home: React.FC = () => {
  const { currentUser, currentUserDatabase } = useAuth()

  const products = [
    {
      image: './img/Promotions/omo.jpg',
      name: 'Sabão OMO',
      price: 'R$ 16,99',
      category: 'Produtos de limpeza',
    },
    {
      image: './img/Promotions/veja.jpg',
      name: 'Veja',
      price: 'R$ 10,74',
      category: 'Produtos de limpeza',
    },
    {
      image: './img/Promotions/papel-higienico.jpg',
      name: 'Papel Higiênico',
      price: 'R$ 8,89',
      category: 'Higiene pessoal',
    },
    {
      image: './img/Promotions/file-de-frango.jpg',
      name: 'File de Frango',
      price: 'R$ 14,99',
      category: 'Congelados e resfriados',
    },
    {
      image: './img/Promotions/file-mignon.jpg',
      name: 'File Mignon',
      price: 'R$ 34,99',
      category: 'Açougue',
    },
    {
      image: './img/Promotions/creme-cheese.jpg',
      name: 'Creme cheese',
      price: 'R$ 9,69',
      category: 'Frios e laticínios',
    }
  ];
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };
  useEffect(() => {
    const interval = setInterval(nextProduct, 3000); // Muda o produto a cada 3 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);
  const currentProduct = products[currentProductIndex];

  const dispatch = useDispatch();

  const getUserData = async () => {
    let customerID = await customerService.findCustomerIDByEmail(currentUser ? currentUser.email : currentUserDatabase).then((response) => {
      return response
    }).catch(async () => {
      const req: RequestCustomerInterface = {
        customerName: currentUser.displayName,
        customerEmail: currentUser.email,
        customerPassword: '123456',
        roleID: 3
      }
      await customerService.create(req)
      return undefined
    });
    if (!customerID) {
      customerID = await customerService.findCustomerIDByEmail(currentUser ? currentUser.email : currentUserDatabase)
    }
    const response = await customerService.findByID(customerID)

    dispatch(changeCustomerID(customerID));
    dispatch(changeCustomerEmail(response.customerEmail));
    dispatch(changeCustomerName(response.customerName));
    dispatch(changeRoleID(response.role.roleID));
    dispatch(changeRoleName(response.role.roleName));
  }

  useEffect(() => {
    if (currentUser || currentUserDatabase) {
      getUserData();
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex h-16 items-center justify-center bg-white text-black font-bold w-full uppercase" style={{ fontSize: '1.125rem', zIndex: 10, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        Home
      </header>

      <div className='bg-gray-200 px-8 mb-20'>
        <div className="flex flex-col items-center mt-16">

          <div className="card-coupon">
            <div style={{alignContent: 'center', marginRight: 5}}>
              <TagIcon className="h-8 w-8" color='white'/>
            </div>
            <div>
              <h1 className="title-card-coupon">Use o cupom "CAMINHO30" para ganhar 30% de desconto!</h1>
            </div>
          </div>
          <div className="card-promotions">
            <img 
              className="img-card-promotions" 
              src={currentProduct.image} 
              alt="Products" 
            />
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.5rem'}}>
              <p className='description-card-promotions'>{currentProduct.category}</p>
              <p className='description-card-promotions'>{currentProduct.name}</p>
              <p className='description-card-promotions'>{currentProduct.price}</p>
            </div>
            <h1 className="title-card-home">Promoções</h1>
            <p className="description-card-home">Veja as nossas promoções disponíveis e economize na sua compra!</p>
            <Link to="/promotions" className="btn-card-home">
              Ver promoções
            </Link>
          </div>

          <div className="card-home">
            <img className="img-card-home" src="./img/products.jpg" alt="Products" />
            <h1 className="title-card-home">Produtos</h1>
            <p className="description-card-home">Veja a lista de produtos, confira a disponibilidade e filtre como desejar.</p>
            <Link to="/products" className="btn-card-home">
              Ver produtos
            </Link>
          </div>

          <div className="card-home">
            <img className="img-card-home" src="./img/shelves.jpg" alt="Shelves" />
            <h1 className="title-card-home">Comprar</h1>
            <p className="description-card-home">Monte a sua lista de compras e ganhe tempo com a melhor rota.</p>
            <Link to="/buy" className="btn-card-home">
              Começar compra
            </Link>
          </div>

          <div className="card-home">
            <img className="img-card-home" src="./img/list.jpg" alt="List" />
            <h1 className="title-card-home">Listas</h1>
            <p className="description-card-home">Veja as suas listas salvas, organize sua rotina de compras.</p>
            <Link to="/lists" className="btn-card-home">
              Ver listas
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home;
