import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/registration/signin/SignIn.jsx';
import SignUp from './pages/registration/signup/SignUp.jsx';
import Header from './components/header/Header.jsx';
import Home from './pages/home/Home.jsx';

function App() {
  return (
    <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
