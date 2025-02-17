import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Test from './components/test'
import { navList } from './data/navlist'
import Home from './routes/home'
import About from './routes/about'
import Center from './routes/center'
import Notice from './routes/notice'
import Reserve from './routes/reserve'
import Admin from './routes/admin'
import Footer from './components/footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Appointment from './routes/appointment'
import Examination from './routes/examination'
import NotFoundPage from './routes/NotFoundPage'

function App() {
  // 404 페이지 작업 해야됨
  return(
    <>
      <Navbar/>
      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path='/about/:id' element={<About item={navList[0]}/>} />
        <Route path='/center/:id' element={<Center item={navList[1]}/>} />
        <Route path='/appointment/:id' element={<Appointment item={navList[2]}/>} />
        <Route path='/examination/:id' element={<Examination item={navList[3]}/>} />
        <Route path='/notice/*' element={<Notice item={navList[4]}/>} />
        <Route path='/reserve' element={<Reserve item={navList[5]}/>} />
        <Route path='/api/admin/*' element={<Admin/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App