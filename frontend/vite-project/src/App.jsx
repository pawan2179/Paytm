import './App.css'
import Navbar from './components/Navbar'
import Balance from './components/Balance'
import TransactionHistory from './components/TransactionHistory'
import { Signin} from './components/Signup'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<MainComponent />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

const MainComponent = () => {
  return (
    <div className="main-container">
      <Balance />
      <TransactionHistory />
    </div>
    )
}

export default App
