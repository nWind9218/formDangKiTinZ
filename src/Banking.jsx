// generate.js

export function generateUnique12DigitCode() {
  const digits = '0123456789'.split('');
  const shuffled = digits.sort(() => 0.5 - Math.random()); // xáo trộn
  return shuffled.slice(0, 12).join('');
}

export function createQRLink(psid, numOfRegisteredSubj, isTinZStudent) {
  return `https://img.vietqr.io/image/VPB-1396888686-compact2.jpg?amount=${calMoney(isTinZStudent,numOfRegisteredSubj)}&addInfo=${psid}`;
}
export function calMoney(isTinZStudent, numOfRegisteredSubj){
    let initalValue = 0;
    if (isTinZStudent){
        initalValue = 770000
    }
    else initalValue = 870000   
    if (numOfRegisteredSubj == 1) return initalValue
    else if (numOfRegisteredSubj == 2) return initalValue*2
    else return initalValue * 3 - 50
}
