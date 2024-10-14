import React, { useEffect } from 'react';
import ErrImg from '../assets/error.png';
import GoodImg from '../assets/check.png';

const Popup = ({ message, isVisible, duration = 3000, onClose, type }) => {

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const setColorText = () => {
        return type ? "text-green-600 p-8" : "text-red-600 p-8";
    };

    const setImg = () => {
        return type ? GoodImg : ErrImg;
    };

    const setAltText = () => {
        return type ? "Success icon" : "Error icon";
    };

    return (
        <div className="font-roboto_mono flex flex-row items-center fixed bottom-4 right-4 bg-slate-100 rounded shadow-lg animate-bounce">
            <p className={setColorText()}>
                {message}
            </p>
            <img src={setImg()} alt={setAltText()} className="h-12 w-12 mr-8" />
        </div>
    );
};

export default Popup;
