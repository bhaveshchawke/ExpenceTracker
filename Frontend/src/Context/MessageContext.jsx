import { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messageData, setMessageData] = useState({
    text: "",
    type: "",
  });

  const showMessage = (text, type = "success") => {
    setMessageData({ text, type });

    setTimeout(() => {
      setMessageData({ text: "", type: "" });
    }, 3000);
  };

  return (
    <MessageContext.Provider
      value={{
        messageData,
        showMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
