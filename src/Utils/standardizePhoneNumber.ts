export const standardizePhoneNumber = (
  text: string,
  countryCode: string = '+62',
) => {
  text = text.split(' ').join('');
  text = text[0] === '0' ? text.slice(1) : text;

  const currentCountryCode = countryCode.replace('+', '');
  const currentCountryCodeLength = currentCountryCode.length;
  if (text.slice(0, currentCountryCodeLength) === currentCountryCode) {
    text = text.slice(currentCountryCodeLength);
  }

  return text;
};
