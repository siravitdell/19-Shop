import './App.css';
import HomePage from './pages/HomePage';
import {Route , BrowserRouter, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import ProductInfo from './pages/ProductInfo';
import CartPage from './pages/CartPage';
import './stylesheets/Layout.css'
import './stylesheets/products.css'
import './stylesheets/auth.css'
import './stylesheets/cart.css'
import './stylesheets/admin.css'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from 'react-router-dom';
import Orders from './pages/Orders';
import AdminPage from './pages/AdminPage';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/productinfo/:productId' element={<ProtectedRoutes><ProductInfo/></ProtectedRoutes>}/>
          <Route path='/cart' element={<ProtectedRoutes><CartPage/></ProtectedRoutes>}/>
          <Route path='/orders' element={<ProtectedRoutes><Orders/></ProtectedRoutes>}/>
          <Route path='/admin' element={<ProtectedRoutes><AdminPage/></ProtectedRoutes>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes=({children})=>{
  if(localStorage.getItem('currentUser')){
    return children
  }
  else{
    return <Navigate to='/login'/>
  }
}
