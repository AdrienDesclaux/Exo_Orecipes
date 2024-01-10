import { useEffect } from 'react';
import Menu from '../Menu';
// import Recipe from '../Recipe';
// import Error from '../Error';

import Loading from './Loading';

import './App.scss';
// eslint-disable-next-line import/order
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRecipes } from '../../store/reducers/recipes';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const isLoading = useAppSelector((state) => state.recipes.isLoading);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <Menu />
      <Outlet />
      {/* <Recipe /> */}
      {/* <Error /> */}
    </div>
  );
}

export default App;
