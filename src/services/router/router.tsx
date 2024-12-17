import { Route, Routes } from 'react-router-dom';
import Admin from '../../containers/Admin/index/admin';
import Home from '../../containers/User/home/home';
import Login from '../../containers/Login/login';
import { RecipeCard } from '../../containers/User/recipeCard/recipeCard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/recipe/:id' element={<RecipeCard />} />
    </Routes>
  );
};

export default AppRouter;
