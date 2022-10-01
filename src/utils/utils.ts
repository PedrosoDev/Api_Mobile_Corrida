const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomCode(charAmount: number): string {
  let result = "";
  for (var i = 0; i < charAmount; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
