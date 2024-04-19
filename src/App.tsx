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
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import AppContextProviders from './contexts/AppContextProvider';
import PrivateRoutes from './pages/0.private-routes/PrivateRoutes';

function App() {
  const providers = [ToastProvider, AuthProvider, ApiProvider]
  return (
    <div>
      <Router>
        <AppContextProviders components={providers}>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/home' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/buy' element={<Buy />} />
              <Route path='/lists' element={<Lists />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
          </Routes>
        </AppContextProviders>
      </Router>
    </div>
  );
}

export default App;
