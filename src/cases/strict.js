// ============================================
// SUMMARY: REDUNDANT "use strict" EXPLAINED
// ============================================
/*
If you have "use strict" at the TOP of your file:
  ✅ All functions are automatically in strict mode
  ❌ Adding "use strict" inside functions is REDUNDANT (unnecessary)

If you DON'T have "use strict" at the top:
  ✅ You can add it inside individual functions
  ✅ Each function needs its own "use strict" if you want strict mode

BEST PRACTICE:
  ✅ Put "use strict" at the top of your file (global)
  ✅ Don't put it inside functions (redundant)
  ✅ Modern JavaScript modules (ES6+) are automatically in strict mode
*/

// Once you enable strict mode globally, it applies to:
// - All code in this file
// - All functions defined in this file
// - All nested functions
// - All classes and methods

// This means if you put "use strict" at the top, you DON'T need to
// put it inside each function - that would be REDUNDANT (unnecessary)

// Example of REDUNDANT "use strict":
function redundantExample() {
	// This function is already in strict mode because of the global declaration
	return "This works, but the 'use strict' here is unnecessary";
}

// Example of CORRECT usage:
function correctExample() {
	// ✅ No need for "use strict" here - already in strict mode globally
	return "This is in strict mode automatically";
}

// 2. FUNCTION-LEVEL STRICT MODE - only needed if file is NOT in strict mode
// If you DON'T have "use strict" at the top, you can enable it per function:
function strictFunction() {
	// strict mode applies only inside this function
}

// ============================================
// WHAT STRICT MODE PREVENTS:
// ============================================

// 1. Prevents accidental global variables
// Without strict mode: creates global variable (bad!)
// With strict mode: throws ReferenceError
function preventGlobalVariables() {
	// accidentalGlobal = 10; // ReferenceError: accidentalGlobal is not defined
	const properVariable = 10; // Correct way
	return properVariable;
}

// 2. Prevents deleting undeletable properties
function preventDeletingProperties() {
	const obj = { name: "John" };
	// delete Object.prototype; // TypeError in strict mode
	delete obj.name; // OK - can delete own properties
}

// 3. Prevents duplicate parameter names
function preventDuplicateParams() {
	// function bad(a, a) { } // SyntaxError: Duplicate parameter name
	function good(a, b) {
		return a + b;
	}
	return good(1, 2);
}

// 4. Prevents using reserved words as variable names
function preventReservedWords() {
	// let let = 10; // SyntaxError
	// let implements = 10; // SyntaxError
	const myVar = 10; // OK
	return myVar;
}

// 5. Prevents octal literals
function preventOctalLiterals() {
	// let octal = 010; // SyntaxError in strict mode
	const decimal = 8; // Use decimal instead
	return decimal;
}

// 6. Prevents 'this' from being undefined in functions
function demonstrateThisBinding() {
	function regularFunction() {
		return this; // undefined in strict mode (instead of global object)
	}

	const arrowFunction = () => {
		return this; // arrow functions don't have their own 'this'
	};

	const obj = {
		method: function () {
			return this; // 'this' refers to obj when called as obj.method()
		},
	};

	return {
		regular: regularFunction(),
		arrow: arrowFunction(),
		method: obj.method(),
	};
}

// 7. Prevents 'eval' from creating variables in outer scope
function preventEvalScopeLeak() {
	// Note: eval is generally discouraged and should be avoided
	// In strict mode, eval() cannot create variables in the outer scope
	// Uncomment the line below to see the behavior (not recommended in production):
	// eval("var x = 10;");
	// console.log(x); // ReferenceError in strict mode (x is not accessible)
	// Without strict mode, x would be accessible here, which is a security risk
}

// ============================================
// EXAMPLES:
// ============================================

// Example 1: Catching undeclared variables
function example1() {
	try {
		// This will throw an error in strict mode
		undeclaredVar = 5; // Uncomment to see the error
	} catch (error) {
		console.log("Error caught:", error.message);
		// Error: undeclaredVar is not defined
	}
}

// Example 2: Safer code with strict mode
function calculateTotal(price, tax) {
	// If you accidentally use the same parameter name, strict mode will catch it
	// function calculateTotal(price, price) { } // SyntaxError

	if (typeof price !== "number" || typeof tax !== "number") {
		throw new TypeError("Price and tax must be numbers");
	}

	return price * (1 + tax);
}

// Example 3: Using strict mode in a class/module
class Calculator {
	constructor() {
		this.result = 0;
	}

	add(number) {
		if (typeof number !== "number") {
			throw new TypeError("Argument must be a number");
		}
		this.result += number;
		return this;
	}

	getResult() {
		return this.result;
	}
}

// ============================================
// WHEN TO USE STRICT MODE:
// ============================================
// ✅ Always use strict mode in modern JavaScript
// ✅ It helps catch common errors
// ✅ It prevents unsafe operations
// ✅ It makes code more secure and easier to debug
// ✅ Modern JavaScript modules (ES6+) are automatically in strict mode

// ============================================
// TESTING:
// ============================================

console.log("=== Strict Mode Examples ===");

// Test 1: Prevent global variables
console.log("\n1. Testing preventGlobalVariables:");
console.log(preventGlobalVariables());

// Test 2: Prevent duplicate params
console.log("\n2. Testing preventDuplicateParams:");
console.log(preventDuplicateParams());

// Test 3: This binding
console.log("\n3. Testing this binding:");
console.log(demonstrateThisBinding());

// Test 4: Calculator
console.log("\n4. Testing Calculator:");
const calc = new Calculator();
calc.add(5).add(10).add(15);
console.log("Result:", calc.getResult());

// Test 5: Calculate total
console.log("\n5. Testing calculateTotal:");
console.log("Total:", calculateTotal(100, 0.1)); // 110
