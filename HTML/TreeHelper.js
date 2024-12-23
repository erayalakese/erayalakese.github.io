/*
// Create nodes
const nodeA = new TreeNode('A');
const nodeB = new TreeNode('B');
const nodeC = new TreeNode('C');
const nodeD = new TreeNode('D');

// Create the tree
const tree = new Tree();

// Add root nodes
tree.addRootNode(nodeA);
tree.addRootNode(nodeB);

// Build relationships
nodeA.addChild(nodeC);
nodeB.addChild(nodeC);
nodeC.addChild(nodeD);

// Access relationships
console.log(nodeC.getParents()); // [nodeA, nodeB]
console.log(nodeC.getChildren()); // [nodeD]
console.log(nodeD.getParents()); // [nodeC]
console.log(tree.findNodeByData('D')); // nodeD

// Remove a relationship
nodeA.removeChild(nodeC);
console.log(nodeA.getChildren()); // []

// Remove root node
tree.removeRootNode(nodeB);
console.log(tree.getRootNodes()); // [nodeA]
*/

class TreeNode {
  constructor(data, icon, clue) {
    this.data = data;
    this.parents = new Set();  // Multiple parents
    this.children = new Set(); // Multiple children
    this.icon = icon;
    this.clue = clue;
  }

  addParent(parentNode) {
    // Avoid adding the same parent multiple times
    if (!this.parents.has(parentNode)) {
      this.parents.add(parentNode);
      parentNode.addChildWithoutRecursion(this);  // Ensure no recursion when adding a child
    }
  }

  addChild(childNode) {
    // Avoid adding the same child multiple times
    if (!this.children.has(childNode)) {
      this.children.add(childNode);
      childNode.addParentWithoutRecursion(this);  // Ensure no recursion when adding a parent
    }
  }

  // Add parent without triggering the addChild method on the parent
  addParentWithoutRecursion(parentNode) {
    this.parents.add(parentNode);
  }

  // Add child without triggering the addParent method on the child
  addChildWithoutRecursion(childNode) {
    this.children.add(childNode);
  }

  removeParent(parentNode) {
    this.parents.delete(parentNode);
    parentNode.removeChild(this);
  }

  removeChild(childNode) {
    this.children.delete(childNode);
    childNode.removeParent(this);
  }

  getChildren() {
    return Array.from(this.children);  // Make sure it returns an array
  }

  getParents() {
    return Array.from(this.parents);  // Make sure it returns an array
  }
}

class Tree {
  constructor() {
    this.rootNodes = new Set();
  }

  addRootNode(node) {
    this.rootNodes.add(node);
  }

  removeRootNode(node) {
    this.rootNodes.delete(node);
  }

  getRootNodes() {
    return Array.from(this.rootNodes);
  }

  findNodeByData(data) {
    const dfs = (node) => {
      if (node.data === data) {
        return node;
      }
      for (let child of node.getChildren()) {
        const result = dfs(child);
        if (result) return result;
      }
      return null;
    };

    for (let rootNode of this.rootNodes) {
      const result = dfs(rootNode);
      if (result) return result;
    }

    return null;
  }

  // Function to find nodes with both node1 and node2 as parents
  findNodesWithParents(node1, node2) {
    const resultNodes = [];  // Use an array to store the result
    const processedNodes = new Set();  // Track already processed nodes

    const dfs = (node) => {
      // Check if node has already been processed (added to the result)
      if (processedNodes.has(node)) return;

      const parents = node.getParents();
      const hasNode1AsParent = parents.some(parent => parent.data === node1);
      const hasNode2AsParent = parents.some(parent => parent.data === node2);

      if (hasNode1AsParent && hasNode2AsParent) {
        resultNodes.push(node);  // Add node to the result array

        if (node1 === "You" || node2 === "You") {
          resultNodes.push(new TreeNode("You", 'fa-solid fa-person'));
        }

        processedNodes.add(node);  // Mark node as processed
      }

      for (let child of node.getChildren()) {
        dfs(child);
      }
    };

    for (let rootNode of this.rootNodes) {
      dfs(rootNode);
    }

    return resultNodes;  // Return the array of result nodes
  }
}
