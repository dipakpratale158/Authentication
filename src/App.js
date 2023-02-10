import AuthContext from './store/Auth-context';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';


function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
        <Route path='/profile'>
            {isLoggedIn &&<UserProfile />}
            {!isLoggedIn && <AuthPage/>}
        </Route>
        <Route path= '*'>
          <Redirect to = '/'></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
