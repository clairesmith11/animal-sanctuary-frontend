import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import { AuthContext } from './shared/context/authContext';
import { useAuth } from './shared/hooks/useAuth';
import AnimalsOverview from './pages/AnimalsOverview/AnimalsOverview';
import NavigationMenu from './components/Navigation/NavigationMenu';
import EditAnimal from './pages/EditAnimal/EditAnimal';
import Footer from './components/Footer/Footer';
import AnimalDetails from './pages/AnimalDetails/AnimalDetails';
import UserOverview from './pages/UserOverview/UserOverview';
import Auth from './pages/Auth/Auth';
import NewAnimal from './pages/NewAnimal/NewAnimal';


function App() {
  const { isAdmin, userId, token, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, isAdmin: isAdmin, userId: userId, login: login, logout: logout }}>
      <BrowserRouter>
        <NavigationMenu />
        <div className="main-content">
          <Switch>
            <Route path="/" exact>
              <AnimalsOverview />
            </Route>
            <Route path="/animal/:animalId" exact>
              <AnimalDetails />
            </Route>
            <Route path="/auth" exact>
              <Auth />
            </Route>
            <Route path="/user/:userId" exact>
              <UserOverview />
            </Route>
            <Route path="/new-animal" exact>
              <NewAnimal />
            </Route>
            <Route path="/edit/:animalId" exact>
              <EditAnimal />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;