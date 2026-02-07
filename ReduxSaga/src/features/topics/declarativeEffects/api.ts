export const fetchUserApi = async (userId: string) => {
  return new Promise<{ id: string; name: string }>((resolve, reject) => {
    setTimeout(() => {
      if (userId === '1') {
        resolve({ id: '1', name: 'John Doe' });
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
};
