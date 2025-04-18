export const pageStrToNumber = (str: string) => {
  const num = parseInt(str);
  if (isNaN(num)) {
    return 1;
  }

  return num;
};
