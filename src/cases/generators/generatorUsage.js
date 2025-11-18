// ============================================
// Generators with Fetch API - Examples
// ============================================

// Example 1: Processing Streaming Response with Generators
// ============================================
async function* streamResponseGenerator(url) {
	const response = await fetch(url);
	const reader = response.body.getReader();
	const decoder = new TextDecoder();

	try {
		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				break;
			}

			// Yield chunks of data as they arrive
			yield decoder.decode(value, { stream: true });
		}
	} finally {
		reader.releaseLock();
	}
}

// Usage:
async function processStreamingData() {
	console.log("=== Example 1: Streaming Response ===");

	for await (const chunk of streamResponseGenerator(
		"https://jsonplaceholder.typicode.com/posts/1",
	)) {
		console.log("Received chunk:", chunk);
	}
}

// Example 2: Generator for Paginated API Responses
// ============================================
async function* fetchPaginatedData(baseUrl, pageSize = 10) {
	let page = 1;
	let hasMore = true;

	while (hasMore) {
		const url = `${baseUrl}?_page=${page}&_limit=${pageSize}`;
		const response = await fetch(url);
		const data = await response.json();

		if (data.length === 0) {
			hasMore = false;
		} else {
			yield data;
			page++;
		}
	}
}

// Usage:
async function processPaginatedData() {
	console.log("\n=== Example 2: Paginated API ===");

	for await (const page of fetchPaginatedData(
		"https://jsonplaceholder.typicode.com/posts",
		5,
	)) {
		console.log(`Page with ${page.length} items:`, page);
	}
}

// Example 3: Generator for Multiple Concurrent Fetches
// ============================================
async function* fetchMultipleUrls(urls) {
	// Fetch all URLs concurrently
	const promises = urls.map((url) => fetch(url).then((res) => res.json()));

	// Yield results as they complete
	for (const promise of promises) {
		yield await promise;
	}
}

// Usage:
async function processMultipleFetches() {
	console.log("\n=== Example 3: Multiple Concurrent Fetches ===");

	const urls = [
		"https://jsonplaceholder.typicode.com/posts/1",
		"https://jsonplaceholder.typicode.com/posts/2",
		"https://jsonplaceholder.typicode.com/posts/3",
	];

	for await (const data of fetchMultipleUrls(urls)) {
		console.log("Fetched:", data.title || data.id);
	}
}

// Example 4: Generator with Error Handling and Retry Logic
// ============================================
async function* fetchWithRetry(url, maxRetries = 3) {
	let attempt = 0;

	while (attempt < maxRetries) {
		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			yield { success: true, data, attempt: attempt + 1 };
			return; // Success, exit generator
		} catch (error) {
			attempt++;

			if (attempt >= maxRetries) {
				yield { success: false, error: error.message, attempts: attempt };
				return;
			}

			// Wait before retry (exponential backoff)
			await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 1000));
			yield { retrying: true, attempt };
		}
	}
}

// Usage:
async function demonstrateRetry() {
	console.log("\n=== Example 4: Fetch with Retry ===");

	for await (const result of fetchWithRetry(
		"https://jsonplaceholder.typicode.com/posts/1",
	)) {
		if (result.success) {
			console.log("Success on attempt", result.attempt, ":", result.data.title);
		} else if (result.retrying) {
			console.log("Retrying, attempt", result.attempt);
		} else {
			console.log("Failed after", result.attempts, "attempts:", result.error);
		}
	}
}

// Example 5: Generator for Processing Large Responses in Chunks
// ============================================
async function* processLargeResponse(url, chunkSize = 1024) {
	const response = await fetch(url);
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	try {
		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				if (buffer) {
					yield buffer; // Yield remaining buffer
				}
				break;
			}

			buffer += decoder.decode(value, { stream: true });

			// Process buffer in chunks
			while (buffer.length >= chunkSize) {
				const chunk = buffer.slice(0, chunkSize);
				buffer = buffer.slice(chunkSize);
				yield chunk;
			}
		}
	} finally {
		reader.releaseLock();
	}
}

// Example 6: Generator for SSE (Server-Sent Events) Simulation
// ============================================
async function* streamSSE(url) {
	const response = await fetch(url);
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	try {
		while (true) {
			const { done, value } = await reader.read();

			if (done) break;

			buffer += decoder.decode(value, { stream: true });

			// Process complete lines (SSE format)
			const lines = buffer.split("\n");
			buffer = lines.pop() || ""; // Keep incomplete line in buffer

			for (const line of lines) {
				if (line.startsWith("data: ")) {
					yield JSON.parse(line.slice(6));
				}
			}
		}
	} finally {
		reader.releaseLock();
	}
}

// Example 7: Generator Chain - Transform Data as it Streams
// ============================================
async function* transformStream(url, transformer) {
	for await (const chunk of streamResponseGenerator(url)) {
		yield transformer(chunk);
	}
}

// Usage:
async function demonstrateTransform() {
	console.log("\n=== Example 7: Transform Stream ===");

	const transformer = (chunk) => chunk.toUpperCase();

	for await (const transformed of transformStream(
		"https://jsonplaceholder.typicode.com/posts/1",
		transformer,
	)) {
		console.log("Transformed:", transformed);
	}
}

// Example 8: Generator with AbortController
// ============================================
async function* fetchWithAbort(url, signal) {
	try {
		const response = await fetch(url, { signal });
		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { done, value } = await reader.read();

			if (done) break;

			yield decoder.decode(value, { stream: true });
		}
	} catch (error) {
		if (error.name === "AbortError") {
			yield { aborted: true, message: "Fetch was aborted" };
		} else {
			throw error;
		}
	}
}

// Usage:
async function demonstrateAbort() {
	console.log("\n=== Example 8: Fetch with Abort ===");

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 1000); // Abort after 1s

	try {
		for await (const chunk of fetchWithAbort(
			"https://jsonplaceholder.typicode.com/posts/1",
			controller.signal,
		)) {
			if (chunk.aborted) {
				console.log(chunk.message);
			} else {
				console.log("Chunk:", chunk);
			}
		}
	} finally {
		clearTimeout(timeout);
	}
}

// ============================================
// Run Examples (uncomment to test)
// ============================================

// Uncomment the examples you want to run:

// processStreamingData();
processPaginatedData();
// processMultipleFetches();
// demonstrateRetry();
// demonstrateTransform();
// demonstrateAbort();

// ============================================
// Key Concepts:
// ============================================
// 1. async function* creates an async generator
// 2. yield pauses execution and returns a value
// 3. for await...of iterates over async generators
// 4. Generators are lazy - they only execute when iterated
// 5. Perfect for streaming, pagination, and processing large datasets
// 6. Can be chained and composed for complex data pipelines
