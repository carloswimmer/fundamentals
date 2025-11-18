// ITERATOR PATTERN

// const iteration = {
//   counter: 0,
//   next() {
//     return {
//       value: this.counter++,
//       done: this.counter < 10
//     };
//   },
//   [Symbol.iterator]() {
//     return this;
//   }
// };

// let nextIteration;

// do {
//   nextIteration = iteration.next();
//   console.log(nextIteration.value);
// } while (nextIteration.done);

// ITERABLE PATTERN

// const iteration = {
// 	[Symbol.iterator]() {
// 		return {
// 			counter: 0,
// 			next() {
// 				return {
// 					value: this.counter++,
// 					done: this.counter > 10,
// 				};
// 			},
// 		};
// 	},
// };

// const arr = [...iteration];

// console.log(arr);

// for (const i of iteration) {
// 	console.log(i ?? "nothing to be printed");
// }

// GENERATOR PATTERN

function* fibGenerator() {
	let a = 0;
	let b = 1;

	while (true) {
		const c = a + b;

		if (c > 1000) return;

		yield c;
		a = b;
		b = c;
	}
}

const fibIteration = fibGenerator();
const fibIteration1 = fibGenerator();

console.log(fibIteration.next());
console.log(fibIteration.next());
console.log(fibIteration.next());
console.log(fibIteration.next());
console.log(fibIteration.next());

for (const value of fibIteration) {
	console.log(value);
}

console.log(fibIteration1.next().value);
