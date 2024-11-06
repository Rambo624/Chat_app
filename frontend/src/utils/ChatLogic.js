
export const isSameSender = (message, m, i, userId) => {
    return (
      i < message.length - 1 &&
      message[i + 1]?.sender._id !== m.sender._id &&
      message[i]?.sender._id !== userId
    );
  };
  

  export const isLastMessage = (message, i, userId) => {
    const lastMessage = message[message.length - 1];
    return (
      i === message.length - 1 &&
      lastMessage?.sender._id !== userId &&
      lastMessage?.sender._id
    );
  };
  
  export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1]?.sender?._id === m.sender?._id && // Check if sender and _id exist
      m.sender?._id !== userId
    ) {
      return 40;
    } else if (
      (i < messages.length - 1 &&
        messages[i + 1]?.sender?._id !== m.sender?._id &&
        m.sender?._id !== userId) ||
      (i === messages.length - 1 && m.sender?._id !== userId)
    ) {
      return 0;
    } else {
      return "auto";
    }
  };
  

  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
  


  