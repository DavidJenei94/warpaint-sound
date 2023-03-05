import { useContext, useEffect } from 'react';
import FeedbackContext from '../store/feedback-context';

// Can be used in a component from which 
// we immediately want to hide the Feedback bar when navigating away
const useFeedbackHider = () => {
  const feedbackCtx = useContext(FeedbackContext);

  useEffect(() => {
    return () => {
      feedbackCtx.clearMessage();
    };
  }, []);
};

export default useFeedbackHider;
