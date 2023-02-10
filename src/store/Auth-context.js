import React, { useState } from 'react';


const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;//if token is null,it will store false

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token",token); //on login ,we get token and stored using state
  };

  const logoutHandler = () => {
    setToken(null);
    console.log('Logged Out')
    localStorage.removeItem('token');
     //on logout token should be set to null
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;