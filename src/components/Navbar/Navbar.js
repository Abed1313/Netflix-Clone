import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className='des'>
        <Link to='/'>Home</Link>
        <Link to='/FavList'>FavList</Link>
      </nav>
    </>
  )
};
export default Navbar;