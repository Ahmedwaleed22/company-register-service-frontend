import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, RouteProps } from 'react-router-dom';
import { RootState } from '../Store';
import { clearAuth } from '../Store/authSlice'; // Import the clearAuth action

const PrivateRoute: React.FC<RouteProps> = () => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
