export default function randomDelay(options = {}) {
  const { min = 250, max = 2000 } = options;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
