// sequence of unordered numbers between 5 and 50
// generate a sequence of 15 random numbers
// print the sequence

function randomNumbersGenerator(min: number, max: number, count: number) {
	const result = new Set<number>();
	while (result.size < count) {
		const number = Math.floor(Math.random() * (max - min + 1)) + min;
		if (!result.has(number)) {
			result.add(number);
		}
	}
	return Array.from(result);
}

const randomNumbers = randomNumbersGenerator(5, 50, 15);

console.log(randomNumbers);
const sorted = randomNumbers.sort((a, b) => a - b);

console.log(sorted);
