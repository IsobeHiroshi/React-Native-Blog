/* This file is named with all lowercase, because this is not a component but just to export a plain function */

import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    /* Make dispatch function available in BlogContext.js */
    // actions === { addBlogPost: (dispatch)=> { return () => {} } }
    const boundActions = {}; // This object will contain actions
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
