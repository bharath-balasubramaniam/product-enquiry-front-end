import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setuser] = useState();
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setuser(userInfo);
    if (!userInfo) history.push("/");
  }, [history]);
  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};
export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
