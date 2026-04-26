export const typeText = (
  text: string,
  onUpdate: (val: string) => void,
  speed: number = 10
) => {
  let i = 0;

  const interval = setInterval(() => {
    onUpdate(text.slice(0, i + 1));
    i++;

    if (i >= text.length) {
      clearInterval(interval);
    }
  }, speed);

  return () => clearInterval(interval); 
};