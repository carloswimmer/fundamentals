export const sum = (a: number, b: number) => {
	if (typeof a !== "number" || typeof b !== "number") {
		throw new Error("Arguments must be numbers");
	}
	return a + b;
};
