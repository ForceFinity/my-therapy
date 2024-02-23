import { createContext, useContext, useEffect, useState } from 'react';

import { io } from "socket.io-client";


export const SocketContext = createContext(io())


export const SocketProvider = ({ children }: {children: any}) => {
    const [socketIo, setSocketIo] = useState<any>(null)

    useEffect(() => {
        const socket = io(
            "ws://localhost:8000", { path: "/socket.io/", transports: ['polling'] }
        )
        socket.on("connect", () => { console.log("Connected", socket.id) });
        socket.on("response", () => { console.log("Response", socket.id) });
        socket.on("message", data => {
            console.log(data)
        });
        setSocketIo(socket)
    }, [])

    return (
        <SocketContext.Provider value={socketIo}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext)
}