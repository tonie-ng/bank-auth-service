function getAccountNumberFromPhoneNumber(phoneNumber: string) {
  const strippedPhoneNumber = phoneNumber.slice(-10);

  return strippedPhoneNumber;
}

export { getAccountNumberFromPhoneNumber };
