// generate.js

export function generateUnique12DigitCode() {
  const digits = '0123456789'.split('');
  const shuffled = digits.sort(() => 0.5 - Math.random()); // xáo trộn
  return shuffled.slice(0, 12).join('');
}

export function createQRLink(psid, amount) {
  return `https://img.vietqr.io/image/VPB-1396888686-compact2.jpg?amount=${amount}&addInfo=${psid}`;
}
