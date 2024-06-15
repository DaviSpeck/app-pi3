import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/1.home/Home';
import Buy from './pages/3.buy/Buy';
import Lists from './pages/4.lists/Lists';
import Settings from './pages/5.settings/Settings';
import Products from './pages/2.products/Products';
import Register from './pages/7.register/Register';
import Login from './pages/6.login/Login';
import ForgotPassword from './pages/8.forgot-password/ForgotPassword';
import ResetPassword from './pages/9.reset-password/ResetPassword';
import { AuthProvider } from './contexts/AuthContext';
import AppContextProviders from './contexts/AppContextProvider';
import PrivateRoutes from './pages/0.private-routes/PrivateRoutes';
import { ColorRing } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { IStore } from './store/types';
import Filter from './pages/10.filter/Filter';

function App() {
  const providers = [AuthProvider];

  const { spinner } = useSelector((store: IStore) => store.app);

  return (
    <AppContextProviders components={providers}>
      <div>
        {spinner && <div className="color-ring-container">
          <div className="color-ring-backdrop"></div>
          <ColorRing
            visible={spinner}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
          />
        </div>}
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/home' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/buy' element={<Buy />} />
              <Route path='/filter' element={<Filter />} />
              <Route path='/lists' element={<Lists />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    </AppContextProviders>
  );
}

export default App;