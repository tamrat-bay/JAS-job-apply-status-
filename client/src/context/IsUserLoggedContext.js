import React, { createContext, useState } from "react";

const IsUserLoggedContext = createContext();

const IsUserLoggedProvider = (props) => {
    const [isUserLogged, setisUserLogged] = useState(localStorage.jas_login ? true : false);

 return (
    <IsUserLoggedContext.Provider value={{ isUserLogged, setisUserLogged }}>
      {props.children}
    </IsUserLoggedContext.Provider>
  );
};

export { IsUserLoggedProvider, IsUserLoggedContext}
