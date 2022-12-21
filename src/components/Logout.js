import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    navigate("/")
  }, [logout, navigate])
  return null;
}

export default Logout