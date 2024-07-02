import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   console.log(isAuthenticated);
  //   useEffect(() => {
  //     const token = localStorage.getItem("token"); //hna ast2balt el token 3shan a2der ab3to ly ProtectedRoutes
  //     if (token) {
  //       setIsAuthenticated(true);
  //       } else {
  //       setIsAuthenticated(false);
  //     }
  //   }, []);
  const login = () => {
    // const token = localStorage.getItem("token");
    // if (token) {
    // }
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("lastName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("id");
    localStorage.removeItem("idProfile");
    localStorage.removeItem("TitleProfile");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
