import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import store from './utils/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './pages/AdminLogin'
import AdminHome from './pages/AdminHome'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/login' element={<AdminLogin/>} />
          <Route path='/admin' element={<AdminHome/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
