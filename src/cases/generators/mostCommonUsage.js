// ============================================
// MOST COMMON REAL-LIFE GENERATOR PATTERNS
// Based on real-world usage found across the internet
// ============================================

// ============================================
// 1. INFINITE SEQUENCES (Most Common Pattern)
// ============================================
// Used for: Fibonacci, prime numbers, random numbers, counters
// Why: Memory efficient - only generates what you need

function* fibonacci() {
	let [prev, curr] = [0, 1];
	while (true) {
		yield curr;
		[prev, curr] = [curr, prev + curr];
	}
}

// Usage: Get first 10 Fibonacci numbers
function getFibonacciSequence(count) {
	const fib = fibonacci();
	const result = [];
	for (let i = 0; i < count; i++) {
		result.push(fib.next().value);
	}
	return result;
}

console.log("=== 1. Fibonacci Sequence ===");
console.log("First 10:", getFibonacciSequence(10));
// Output: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// ============================================
// 2. RANGE GENERATOR (Very Common)
// ============================================
// Used for: Creating number ranges, Python-like range() function
// Why: More memory efficient than arrays for large ranges

function* range(start, end, step = 1) {
	let current = start;
	while (current < end) {
		yield current;
		current += step;
	}
}

// Usage
console.log("\n=== 2. Range Generator ===");
console.log("Range 0-10:", [...range(0, 10)]);
console.log("Range 0-20 step 3:", [...range(0, 20, 3)]);

// ============================================
// 3. TREE TRAVERSAL (Common in Data Structures)
// ============================================
// Used for: Binary trees, DOM traversal, file system navigation
// Why: Clean, recursive iteration without call stack issues

class TreeNode {
	constructor(value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;
	}
}

// In-order traversal generator
function* traverseInOrder(node) {
	if (node) {
		yield* traverseInOrder(node.left);
		yield node.value;
		yield* traverseInOrder(node.right);
	}
}

// Usage
console.log("\n=== 3. Tree Traversal ===");
const tree = new TreeNode(
	4,
	new TreeNode(2, new TreeNode(1), new TreeNode(3)),
	new TreeNode(6, new TreeNode(5), new TreeNode(7)),
);
console.log("In-order:", [...traverseInOrder(tree)]);
// Output: [1, 2, 3, 4, 5, 6, 7]

// ============================================
// 4. STATE MACHINE (Common Pattern)
// ============================================
// Used for: Game states, workflow management, UI state
// Why: Encapsulates state logic cleanly

function* stateMachine() {
	let state = "idle";

	while (true) {
		const action = yield state;

		switch (state) {
			case "idle":
				if (action === "start") state = "running";
				break;
			case "running":
				if (action === "pause") state = "paused";
				else if (action === "stop") state = "stopped";
				break;
			case "paused":
				if (action === "resume") state = "running";
				else if (action === "stop") state = "stopped";
				break;
			case "stopped":
				if (action === "reset") state = "idle";
				break;
		}
	}
}

// Usage
console.log("\n=== 4. State Machine ===");
const machine = stateMachine();
console.log("Initial:", machine.next().value); // "idle"
console.log("After start:", machine.next("start").value); // "running"
console.log("After pause:", machine.next("pause").value); // "paused"
console.log("After resume:", machine.next("resume").value); // "running"
console.log("After stop:", machine.next("stop").value); // "stopped"

// ============================================
// 5. BATCH PROCESSING (Very Common)
// ============================================
// Used for: Processing large arrays in chunks, pagination
// Why: Prevents memory overflow, allows progressive processing

function* batch(array, size) {
	for (let i = 0; i < array.length; i += size) {
		yield array.slice(i, i + size);
	}
}

// Usage
console.log("\n=== 5. Batch Processing ===");
const largeArray = Array.from({ length: 20 }, (_, i) => i + 1);
for (const chunk of batch(largeArray, 5)) {
	console.log("Batch:", chunk);
}

// ============================================
// 6. PRIME NUMBERS GENERATOR (Common Example)
// ============================================
// Used for: Mathematical computations, algorithms
// Why: Lazy evaluation - only computes when needed

function* primes() {
	function isPrime(n) {
		if (n < 2) return false;
		for (let i = 2; i * i <= n; i++) {
			if (n % i === 0) return false;
		}
		return true;
	}

	let num = 2;
	while (true) {
		if (isPrime(num)) {
			yield num;
		}
		num++;
	}
}

// Usage
console.log("\n=== 6. Prime Numbers ===");
const primeGen = primes();
const firstPrimes = [];
for (let i = 0; i < 10; i++) {
	firstPrimes.push(primeGen.next().value);
}
console.log("First 10 primes:", firstPrimes);

// ============================================
// 7. TOKENIZER/PARSER (Common in Compilers)
// ============================================
// Used for: Parsing text, lexers, string processing
// Why: Clean separation of parsing logic

function* tokenize(text) {
	const tokens = text.match(/\S+/g) || [];
	for (const token of tokens) {
		yield token;
	}
}

// Usage
console.log("\n=== 7. Tokenizer ===");
const text = "Hello world from generator";
console.log("Tokens:", [...tokenize(text)]);

// ============================================
// 8. COMBINATORICS (Common in Algorithms)
// ============================================
// Used for: Generating combinations, permutations
// Why: Memory efficient for large sets

function* combinations(arr, k) {
	if (k === 0) {
		yield [];
		return;
	}

	for (let i = 0; i <= arr.length - k; i++) {
		for (const combo of combinations(arr.slice(i + 1), k - 1)) {
			yield [arr[i], ...combo];
		}
	}
}

// Usage
console.log("\n=== 8. Combinations ===");
const items = ["a", "b", "c", "d"];
console.log("Combinations of 2:", [...combinations(items, 2)]);

// ============================================
// 9. ITERATOR ADAPTERS (Common Pattern)
// ============================================
// Used for: Functional programming, data transformation
// Why: Composable, reusable transformations

function* map(iterable, fn) {
	for (const item of iterable) {
		yield fn(item);
	}
}

function* filter(iterable, fn) {
	for (const item of iterable) {
		if (fn(item)) {
			yield item;
		}
	}
}

function* take(iterable, n) {
	let count = 0;
	for (const item of iterable) {
		if (count >= n) break;
		yield item;
		count++;
	}
}

// Usage - Composing generators
console.log("\n=== 9. Iterator Adapters ===");
const numbers = range(1, 100);
const doubled = map(numbers, (n) => n * 2);
const evens = filter(doubled, (n) => n % 4 === 0);
const firstFive = take(evens, 5);
console.log("First 5 even doubles:", [...firstFive]);

// ============================================
// 10. COROUTINES (Advanced but Common)
// ============================================
// Used for: Cooperative multitasking, async patterns
// Why: Allows pausing and resuming execution

function* coroutine() {
	console.log("Step 1");
	yield;
	console.log("Step 2");
	yield;
	console.log("Step 3");
}

// Usage
console.log("\n=== 10. Coroutines ===");
const co = coroutine();
co.next(); // Step 1
co.next(); // Step 2
co.next(); // Step 3

// ============================================
// 11. INFINITE SCROLL / PAGINATION (Very Common)
// ============================================
// Used for: Web apps, data fetching, APIs
// Why: Load data on-demand, memory efficient

function* paginate(totalItems, pageSize = 10) {
	let currentPage = 0;
	const totalPages = Math.ceil(totalItems / pageSize);

	while (currentPage < totalPages) {
		const start = currentPage * pageSize;
		const end = Math.min(start + pageSize, totalItems);
		yield {
			page: currentPage + 1,
			start,
			end,
			items: Array.from({ length: end - start }, (_, i) => start + i + 1),
		};
		currentPage++;
	}
}

// Usage
console.log("\n=== 11. Pagination ===");
for (const page of paginate(25, 10)) {
	console.log(`Page ${page.page}:`, page.items);
}

// ============================================
// 12. FLATTEN NESTED ARRAYS (Common Utility)
// ============================================
// Used for: Data transformation, nested structures
// Why: Handles arbitrary depth efficiently

function* flatten(arr) {
	for (const item of arr) {
		if (Array.isArray(item)) {
			yield* flatten(item);
		} else {
			yield item;
		}
	}
}

// Usage
console.log("\n=== 12. Flatten Nested Arrays ===");
const nested = [1, [2, 3], [4, [5, 6]], 7];
console.log("Flattened:", [...flatten(nested)]);

// ============================================
// 13. ZIP MULTIPLE ITERABLES (Common Utility)
// ============================================
// Used for: Combining multiple sequences
// Why: Python-like zip functionality

function* zip(...iterables) {
	const iterators = iterables.map((iter) => iter[Symbol.iterator]());

	while (true) {
		const results = iterators.map((iter) => iter.next());
		if (results.some((r) => r.done)) break;
		yield results.map((r) => r.value);
	}
}

// Usage
console.log("\n=== 13. Zip Iterables ===");
const arr1 = [1, 2, 3];
const arr2 = ["a", "b", "c"];
console.log("Zipped:", [...zip(arr1, arr2)]);

// ============================================
// 14. WINDOW/SLIDING WINDOW (Common in Data Analysis)
// ============================================
// Used for: Moving averages, time series, data analysis
// Why: Efficient sliding window operations

function* slidingWindow(array, size) {
	for (let i = 0; i <= array.length - size; i++) {
		yield array.slice(i, i + size);
	}
}

// Usage
console.log("\n=== 14. Sliding Window ===");
const data = [1, 2, 3, 4, 5, 6];
console.log("Windows of 3:", [...slidingWindow(data, 3)]);

// ============================================
// 15. UNIQUE VALUES (Common Utility)
// ============================================
// Used for: Removing duplicates, data cleaning
// Why: Memory efficient for large datasets

function* unique(iterable) {
	const seen = new Set();
	for (const item of iterable) {
		if (!seen.has(item)) {
			seen.add(item);
			yield item;
		}
	}
}

// Usage
console.log("\n=== 15. Unique Values ===");
const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
console.log("Unique:", [...unique(duplicates)]);

// ============================================
// SUMMARY: Why Generators Are So Popular
// ============================================
/*
1. MEMORY EFFICIENCY: Only generate what you need, when you need it
2. LAZY EVALUATION: Compute values on-demand
3. CLEAN SYNTAX: More readable than manual iterator implementation
4. COMPOSABILITY: Easy to chain and combine generators
5. INFINITE SEQUENCES: Handle potentially infinite data streams
6. STATE MANAGEMENT: Encapsulate complex state logic
7. PERFORMANCE: Better for large datasets than arrays
8. ITERATOR PROTOCOL: Works with for...of, spread, destructuring
*/

// ============================================
// REAL-WORLD USE CASES (Where You'll See These)
// ============================================
/*
- React/Redux: State management, middleware
- Node.js: Stream processing, file reading
- Data Science: Large dataset processing
- Game Development: State machines, infinite sequences
- Web Scraping: Pagination, data extraction
- Compilers: Lexers, parsers, AST traversal
- API Clients: Pagination, streaming responses
- Functional Libraries: Lodash, Ramda alternatives
*/
