/**
 * const graph = {
  "nodes": [
    { "id": "node-1", "title": "Belediye Binası", "type": "Character", "children": ["node-2"], "hooks": { "beforeDrag": () => console.log('Belediye Binası: beforeDrag hook') }},
    { "id": "node-2", "title": "Çöp Kutusu", "type": "Character", "children": ["node-3"], "hooks": { "beforeDrag": () => console.log('Çöp Kutusu: beforeDrag hook') }},
    { "id": "node-3", "title": "Kan Izleri", "type": "Character", "children": ["node-4"], "hooks": { "beforeDrag": () => console.log('Kan Izleri: beforeDrag hook') }},
    { "id": "node-4", "title": "Kan Izleri", "type": "Character", "children": [], "hooks": { "beforeDrag": () => console.log('Kan Izleri (second instance): beforeDrag hook') }},
    // More nodes...
  ],
  "edges": [
    {"from": "node-1", "to": "node-2"},
    {"from": "node-2", "to": "node-3"},
    {"from": "node-3", "to": "node-4"},
    {"from": "node-1", "to": "node-4"}, // Adding a direct edge to test the combineNodes functionality
    // More edges...
  ]
};

const graphHelper = new GraphHelper(graph);
graphHelper.setCurrentNode('node-3');
console.log(graphHelper.combineNodes({id: "node-1"}, {id: "node-2"})); // Should return a node or nodes that are common children to node-1 and node-2

 */

const graph = {
    "nodes": [
      { "id": "You", "title": "You", "type": "Character", "hooks": { "beforeDrag": () => console.log('You: beforeDrag hook') }},
      { "id": "Dış Kapı", "title": "Dış Kapı", "type": "Character", "hooks": { "beforeDrag": () => console.log('Dış Kapı: beforeDrag hook') }},
      { "id": "Araba Anahtarı", "title": "Araba Anahtarı", "type": "Character", "hooks": { "beforeDrag": () => console.log('Araba Anahtarı: beforeDrag hook') }},
      { "id": "Otomobil", "title": "Otomobil", "type": "Character", "hooks": { "beforeDrag": () => console.log('Otomobil: beforeDrag hook') }},
      // More nodes...
    ],
    "edges": [
      {"from": "You", "to": "node-2"},
      {"from": "node-2", "to": "node-3"},
      {"from": "node-3", "to": "node-4"},
      {"from": "node-1", "to": "node-4"}, // Adding a direct edge to test the combineNodes functionality
      // More edges...
    ]
  };

  class GraphHelper {
    constructor(nodes, edges) {
      this.nodes = nodes;  // List of nodes
      this.edges = edges;  // List of edges
      this.currentNodeId = null;  // Current node ID (set manually or via a method)
    }
  
    // Set the current node by its ID
    setCurrentNode(nodeId) {
      this.currentNodeId = nodeId;
    }
  
    // Get the current node's object
    currentNode() {
      return this.nodes.find(node => node.id === this.currentNodeId);
    }
  
    // Get all the children of the current node
    getAllChildren() {
      return this.edges.filter(edge => edge.from === this.currentNodeId).map(edge => {
        return this.nodes.find(node => node.id === edge.to);
      });
    }
  
    // Get all the parents of the current node
    getAllParents() {
      return this.edges.filter(edge => edge.to === this.currentNodeId).map(edge => {
        return this.nodes.find(node => node.id === edge.from);
      });
    }
  
    // Get all siblings of the current node (nodes sharing the same parent)
    allSiblings() {
      const parents = this.getAllParents();
      let siblings = [];
      
      parents.forEach(parent => {
        const siblingEdges = this.edges.filter(edge => edge.from === parent.id);
        siblings = siblings.concat(siblingEdges.map(edge => this.nodes.find(node => node.id === edge.to)));
      });
      
      // Remove the current node from the siblings list
      return siblings.filter(sibling => sibling.id !== this.currentNodeId);
    }
  
    // Get the hooks of the current node
    getCurrentHooks() {
      const node = this.currentNode();
      return node ? node.hooks : null;
    }
  
    // Run a specific hook function by its name
    runHook(hookName) {
      const hooks = this.getCurrentHooks();
      if (hooks && hooks[hookName]) {
        const hookFunction = hooks[hookName];
        if (typeof hookFunction === 'function') {
          hookFunction();  // Execute the hook function
        } else {
          console.log(`${hookName} is not a valid function`);
        }
      } else {
        console.log(`No hook found with the name ${hookName}`);
      }
    }
  }