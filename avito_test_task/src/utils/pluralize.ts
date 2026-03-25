export function pluralize(number: number, titles: [string, string, string]): string {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return titles[2]; 
  }

  if (lastDigit === 1) {
    return titles[0]; 
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return titles[1]; 
  }
  
  return titles[2]; 
}