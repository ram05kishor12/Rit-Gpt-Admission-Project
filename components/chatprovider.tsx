
"use client"
import { useChat } from "ai/react";

import { createContext } from 'react';

const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setInput } =
        useChat({ api: "../api/getresponse" });

    return (
        <ChatContext.Provider value={{ messages, input, handleInputChange, handleSubmit, isLoading, stop, setInput }}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContext;