import { useNavigate } from 'react-router-dom'; 
import { useUser } from '../../UserContext'; // Import useUser hook
import config from '../../config/config';

const Home = () => {
    navigate('/dashboard');
  };