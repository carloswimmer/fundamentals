function memoize(myFunction) {
	const cache = {};

	function memoizedFunction(number) {
		if (cache[number]) {
			return cache[number];
		}

		return myFunction(number);
	}

	return memoizedFunction;
}

const fibonacci = (n) => {
	if (n < 2) return n;
	const result = fibonacci(n - 1) + fibonacci(n - 2);
	return result;
};

const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(10));
