export const loginApi = async (username: string) => {
  return new Promise<{ success: boolean; username: string }>(
    (resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin') {
          resolve({ success: true, username: 'admin' });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    },
  );
};
