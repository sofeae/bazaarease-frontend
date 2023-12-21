import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const { logout } = useLogout()
//   const { user } = useAuthContext()

//   const handleClick = () => {
//     logout()
//   }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>BazaarEase</h1>
        </Link>
        <nav>
        <Link to="Cart">
          <ShoppingCartIcon />
        </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar