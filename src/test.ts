const number = '4231';
let numbersArray = number.split('').map(Number);

numbersArray.sort();

let sortedNumberString = numbersArray.join('');

console.log(sortedNumberString);

//bun run --hot src/test.ts