import { Route, Routes } from 'react-router-dom';
import Admin from '../../containers/Admin/index/admin';
import Login from '../../containers/Login/login';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
