import { backendUrl } from '../utils/general.utils';

export const refreshToken = async (token: string) => {
  try {
    const response = await fetch(`${backendUrl}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Could not login User!');
    }

    return data.token;
  } catch (error: any) {
    return null;
  }
};

export default { refreshToken };
