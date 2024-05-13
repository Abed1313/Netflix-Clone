
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import FavList from './components/FavList/FavList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Routes>
      {/* <Route path='/home' element={<Home />}></Route> */}
      <Route path='/' element={<Home />}></Route>
      <Route path='/FavList' element={<FavList />}></Route>
      
    </Routes>
    
    </>
  );
}

export default App;
