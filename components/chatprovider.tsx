
"use client"
import { useChat } from "ai/react";

import { createContext } from 'react';

const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setInput,error} =
        useChat({ api: "../api/getresponse" });

    return (
        <ChatContext.Provider value={{ messages, input, handleInputChange, handleSubmit, isLoading, stop, setInput,error }}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContext;