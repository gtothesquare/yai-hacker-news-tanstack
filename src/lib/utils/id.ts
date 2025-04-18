// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex(dec: number) {
  return dec.toString(16).padStart(2, '0');
}

export function id(len: number) {
  const arr = new Uint8Array((len || 40) / 2);
  crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

export function generateId(prefix: string) {
  return `${prefix}-${id(8)}`;
}
