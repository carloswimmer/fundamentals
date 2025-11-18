import { describe, expect, it } from "vitest";
import { sum } from "./sum";

describe("sum", () => {
	it("should return the sum of two numbers", () => {
		const result = sum(1, 2);
		expect(result).toBe(3);
	});

	it("should throw an error if the arguments are not numbers", () => {
		// @ts-expect-error - we want to test the error case
		expect(() => sum(1, "2")).toThrowError("Arguments must be numbers");
	});
});
