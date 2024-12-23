'use client';
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedType, setSelectedType] = useState('anime');

  return (
    <DataContext.Provider value={{ selectedType, setSelectedType }}>
      {children}
    </DataContext.Provider>
  );
};
export const useDataContext = () => useContext(DataContext);