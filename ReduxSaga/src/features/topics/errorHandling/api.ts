export const fetchDataApi = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // simulate random success/failure
      if (Math.random() > 0.5) {
        resolve('Data fetched successfully!');
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
};
