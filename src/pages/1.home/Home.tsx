import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import customerService from '../../services/customer.service';
import { changeCustomerEmail, changeCustomerID, changeCustomerName, changeRoleID, changeRoleName } from '../../store/slices/customer.slice';

const Home: React.FC = () => {
  const { currentUser, currentUserDatabase } = useAuth()

  const dispatch = useDispatch();

  const getUserData = async () => {
    const customerID = await customerService.findCustomerIDByEmail(currentUser ? currentUser.email : currentUserDatabase);
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
