function greetUser(greetingPrefix, userName = 'User') {
  console.log(`${greetingPrefix} ${userName}!`);
}

greetUser('Hello', 'Max');
greetUser('Hi');

function sumUp(...numbers) {
  let result = 0;
  for (const number of numbers) {
    result += number;
  }
  return result;
}

const inputNumbers = [1, 5, 10, 24, 5, 4];

console.log(sumUp(...inputNumbers));

console.log(sumUp);
