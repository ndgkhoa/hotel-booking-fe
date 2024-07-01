import React, { createContext, useContext, useState, ReactNode } from 'react';

type GuestInfo = {
    email: string;
    phone: string;
};

type GuestInfoContextType = {
    guestInfo: GuestInfo;
    setGuestInfo: React.Dispatch<React.SetStateAction<GuestInfo>>;
};

const GuestInfoContext = createContext<GuestInfoContextType | undefined>(undefined);

export const useGuestInfoContext = () => {
    const context = useContext(GuestInfoContext);
    if (!context) {
        throw new Error('useGuestInfoContext must be used within a GuestInfoContextProvider');
    }
    return context;
};

type GuestInfoContextProviderProps = {
    children: ReactNode;
};

export const GuestInfoContextProvider: React.FC<GuestInfoContextProviderProps> = ({ children }) => {
    const [guestInfo, setGuestInfo] = useState<GuestInfo>({ email: '', phone: '' });

    return (
        <GuestInfoContext.Provider value={{ guestInfo, setGuestInfo }}>
            {children}
        </GuestInfoContext.Provider>
    );
};
