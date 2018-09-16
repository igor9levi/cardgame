export const pause = (numSeconds = 2000) => (new Promise((resolve) => {
  setTimeout(() => resolve('ok'), numSeconds);
}));
