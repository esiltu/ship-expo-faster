import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        setNotifications(prevNotifications => [...prevNotifications, notification]);
    };

    const removeNotification = (id) => {
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
