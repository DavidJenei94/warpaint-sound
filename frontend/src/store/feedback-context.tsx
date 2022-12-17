import { createContext, useEffect, useState } from 'react';

let hideFeedbackTimer: NodeJS.Timeout;

const FeedbackContext = createContext({
  message: '',
  isMessageShown: false,
  showMessage: (message: string, ms: number) => {},
});

export const FeedbackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMessageShown, setIsMessageShown] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isMessageShown) {
      hideFeedbackTimer = setTimeout(() => {
        setIsMessageShown(false);
        setMessage('');
      }, showTime);
    }

    return () => {
      hideFeedbackTimer && clearTimeout(hideFeedbackTimer);
    };
  }, [isMessageShown]);

  const showMessageHandler = (message: string, ms: number) => {
    setMessage(message);
    setShowTime(ms);
    setIsMessageShown(true);
  };

  return (
    <FeedbackContext.Provider
      value={{
        message: message,
        isMessageShown: isMessageShown,
        showMessage: showMessageHandler,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
