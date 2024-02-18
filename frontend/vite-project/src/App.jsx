import './App.css'
import Navbar from './components/Navbar'
import Balance from './components/Balance'
import TransactionHistory from './components/TransactionHistory'

function App() {

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Balance />
        <TransactionHistory />
      </div>
    </>
  )
}

export default App
