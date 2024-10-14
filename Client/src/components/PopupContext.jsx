import React, { createContext, useState, useContext, useCallback } from 'react';
import Popup from './PopUpMessage';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  const showPopup = useCallback((message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000); // Ajustar el tiempo si se necesita cambiar
  }, []);

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <Popup 
        message={popupMessage} 
        isVisible={isPopupVisible} 
        type={popupType}
        onClose={() => setIsPopupVisible(false)} 
      />
    </PopupContext.Provider>
  );
};