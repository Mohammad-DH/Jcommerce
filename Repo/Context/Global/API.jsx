import React, { createContext, useEffect, useState } from "react";

export const root = createContext();

function API({ children }) {
  return (
    <div>
      <root.Provider value={{}}>{children}</root.Provider>
    </div>
  );
}

export default API;
