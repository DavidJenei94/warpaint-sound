import { useCallback } from 'react';

// custom hook for handling captcha verify and returning token
const useRecaptchaVerify = (
  executeRecaptcha:
    | ((action?: string | undefined) => Promise<string>)
    | undefined
) => {
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      // Execute recaptcha not yet available
      return;
    }

    const token = await executeRecaptcha('reportsoundrecord');
    return token;
  }, [executeRecaptcha]);

  return handleReCaptchaVerify;
};

export default useRecaptchaVerify;
