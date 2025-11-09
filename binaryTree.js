// ============================================
// BINARY TREE IMPLEMENTATION
// ============================================

// Node constructor function for binary tree
function Node(value) {
	this.value = value;
	this.left = null;
	this.right = null;
}

// Binary Tree constructor function
function BinaryTree() {
	this.root = null;
}

// Insert a value into the binary tree
BinaryTree.prototype.insert = function (value) {
	const newNode = new Node(value);

	if (this.root === null) {
		this.root = newNode;
		return this;
	}

	let current = this.root;

	while (true) {
		if (value === current.value) {
			// Value already exists, you can handle this as needed
			return undefined;
		}

		if (value < current.value) {
			if (current.left === null) {
				current.left = newNode;
				return this;
			}
			current = current.left;
		} else {
			if (current.right === null) {
				current.right = newNode;
				return this;
			}
			current = current.right;
		}
	}
};

// Search for a value in the binary tree
BinaryTree.prototype.search = function (value) {
	if (this.root === null) {
		return false;
	}

	let current = this.root;

	while (current) {
		if (value === current.value) {
			return true;
		}

		if (value < current.value) {
			current = current.left;
		} else {
			current = current.right;
		}
	}

	return false;
};

// In-order traversal (Left, Root, Right)
BinaryTree.prototype.inOrderTraversal = function (
	node = this.root,
	result = [],
) {
	if (node !== null) {
		this.inOrderTraversal(node.left, result);
		result.push(node.value);
		this.inOrderTraversal(node.right, result);
	}
	return result;
};

// Pre-order traversal (Root, Left, Right)
BinaryTree.prototype.preOrderTraversal = function (
	node = this.root,
	result = [],
) {
	if (node !== null) {
		result.push(node.value);
		this.preOrderTraversal(node.left, result);
		this.preOrderTraversal(node.right, result);
	}
	return result;
};

// Post-order traversal (Left, Right, Root)
BinaryTree.prototype.postOrderTraversal = function (
	node = this.root,
	result = [],
) {
	if (node !== null) {
		this.postOrderTraversal(node.left, result);
		this.postOrderTraversal(node.right, result);
		result.push(node.value);
	}
	return result;
};

// Find the minimum value in the tree
BinaryTree.prototype.findMin = function (node = this.root) {
	if (node === null) {
		return null;
	}

	while (node.left !== null) {
		node = node.left;
	}

	return node.value;
};

// Find the maximum value in the tree
BinaryTree.prototype.findMax = function (node = this.root) {
	if (node === null) {
		return null;
	}

	while (node.right !== null) {
		node = node.right;
	}

	return node.value;
};

// Get the height of the tree
BinaryTree.prototype.getHeight = function (node = this.root) {
	if (node === null) {
		return -1;
	}

	const leftHeight = this.getHeight(node.left);
	const rightHeight = this.getHeight(node.right);

	return Math.max(leftHeight, rightHeight) + 1;
};

// Count the number of nodes in the tree
BinaryTree.prototype.countNodes = function (node = this.root) {
	if (node === null) {
		return 0;
	}

	return 1 + this.countNodes(node.left) + this.countNodes(node.right);
};

// ============================================
// INVERT BINARY TREE - WHY IT'S USEFUL
// ============================================
/*
Inverting a binary tree (mirroring it) is useful in several scenarios:

1. **SYMMETRY CHECKING**
   - Check if a tree is symmetric by comparing it with its mirror
   - Useful in image processing and pattern recognition

2. **VISUALIZATION & UI**
   - Mirror tree visualizations for different display orientations
   - Convert left-to-right trees to right-to-left (useful for RTL languages)
   - Flip tree diagrams for better presentation

3. **ALGORITHM PROBLEMS**
   - Common interview problem to test recursion understanding
   - Foundation for more complex tree manipulation algorithms
   - Helps understand tree traversal patterns

4. **DATA STRUCTURE CONVERSIONS**
   - Convert between different tree representations
   - Transform trees for specific algorithm requirements
   - Some algorithms work better with inverted structures

5. **MATHEMATICAL OPERATIONS**
   - In expression trees, inversion can represent different evaluation orders
   - Useful in compiler design for expression parsing

6. **TESTING & VALIDATION**
   - Verify tree operations work correctly in both orientations
   - Test tree algorithms with mirrored structures

Note: Inverting a BST (Binary Search Tree) will break the BST property
      (left < root < right), but the tree structure itself is preserved.
*/

// Invert the tree
BinaryTree.prototype.invert = function (node = this.root) {
	if (node === null) {
		return null;
	}

	// Swap left and right children
	const left = node.left;
	const right = node.right;

	node.left = right;
	node.right = left;

	// Recursively invert the subtrees
	this.invert(node.left);
	this.invert(node.right);

	return node;
};

// Visualize the tree structure
BinaryTree.prototype.visualize = function () {
	if (this.root === null) {
		console.log("Tree is empty");
		return;
	}

	const lines = [];
	const buildTreeLines = (node, prefix = "", isLast = true) => {
		if (node === null) {
			return;
		}

		const value = node.value.toString();
		const connector = isLast ? "└── " : "├── ";
		lines.push(prefix + connector + value);

		const newPrefix = prefix + (isLast ? "    " : "│   ");

		// Check if node has children
		const hasRight = node.right !== null;
		const hasLeft = node.left !== null;

		// Process right child first (so it appears on top when displayed)
		if (hasRight) {
			buildTreeLines(node.right, newPrefix, !hasLeft);
		}
		if (hasLeft) {
			buildTreeLines(node.left, newPrefix, true);
		}
	};

	lines.push(this.root.value.toString());
	const hasRight = this.root.right !== null;
	const hasLeft = this.root.left !== null;

	if (hasRight) {
		buildTreeLines(this.root.right, "", !hasLeft);
	}
	if (hasLeft) {
		buildTreeLines(this.root.left, "", true);
	}

	console.log("\n" + lines.join("\n") + "\n");
};

// ============================================
// EXAMPLE USAGE
// ============================================

console.log("=== Binary Tree Examples ===\n");

// Create a new binary tree
const tree = new BinaryTree();
const values = [50, 10, 30, 25, 75, 60, 90, 5, 15, 27, 35, 55, 65, 85, 95];
values.map((val) => tree.insert(val));

// Insert values
console.log(
	"1. Inserting values: 50, 10, 30, 25, 75, 60, 90, 5, 15, 27, 35, 55, 65, 85, 95",
);

// Visualize tree after insertion
console.log("\n📊 Tree Visualization (After Insertion):");
tree.visualize();

// Search for values
console.log("\n2. Searching for values:");
console.log("Search 75:", tree.search(75)); // true
console.log("Search 20:", tree.search(20)); // false
console.log("Search 60:", tree.search(60)); // true

// Traversals
console.log("\n3. Tree Traversals:");
console.log("In-order:", tree.inOrderTraversal()); // [5, 10, 15, 25, 27, 30, 35, 50, 55, 60, 65, 75, 85, 90, 95]
console.log("Pre-order:", tree.preOrderTraversal()); // [50, 25, 10, 5, 15, 27, 30, 35, 75, 60, 55, 65, 85, 90, 95]
console.log("Post-order:", tree.postOrderTraversal()); // [5, 15, 10, 27, 35, 30, 25, 55, 65, 60, 90, 85, 95, 75, 50]

// Min and Max
console.log("\n4. Min and Max values:");
console.log("Minimum:", tree.findMin()); // 5
console.log("Maximum:", tree.findMax()); // 95

// Tree properties
console.log("\n5. Tree Properties:");
console.log("Height:", tree.getHeight()); // 3
console.log("Total nodes:", tree.countNodes()); // 15

// Invert the tree
console.log("\n6. Inverting the tree:");
tree.invert();

// Visualize tree after inversion
console.log("\n📊 Tree Visualization (After Inversion):");
tree.visualize();

console.log("In-order:", tree.inOrderTraversal()); // [95, 90, 85, 75, 65, 60, 55, 50, 35, 30, 27, 25, 15, 10, 5]
console.log("Pre-order:", tree.preOrderTraversal()); // [50, 75, 90, 95, 85, 60, 65, 55, 25, 30, 35, 27, 10, 15, 5]
console.log("Post-order:", tree.postOrderTraversal()); // [95, 85, 90, 65, 55, 60, 75, 35, 27, 30, 15, 5, 10, 25, 50]
