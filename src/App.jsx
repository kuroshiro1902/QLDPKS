import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Views/Home/Home'
import Login from './Views/Login'
import Index from './Views/Index/Index'
function App() {

  return (
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home/*" element={<Home/>} />
        <Route path="/" element={<Index/>}/>
      </Routes>
  )
}

export default App
