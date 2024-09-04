import React, { createContext, useState, useContext } from "react";
import PropTypes from 'prop-types';


const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const triggerUpdate = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  return (
    <HealthContext.Provider value={{ updateTrigger, triggerUpdate }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);

HealthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};