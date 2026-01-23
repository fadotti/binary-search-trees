# binary-search-trees

A Tree class that allows for the creation of binary tree instances with several methods. An instance is created by calling `new Tree(input)` where `input` is an array of numbers.

Several methods have been written for the class:

- `prettyPrint()` prints the tree nicely in the terminal.
- `insert(value)` and `delete(value)` add/remove nodes with the corresponding values. `value` must be an number.
- `find(value)` returns the node with the given value, if it exists in the tree.
- `levelOrderForEach(callback)` accepts a callback, traverses the tree breadth-first, and calls the callback function on each node.
- `inOrderForEach(callback)`, `preOrderForEach(callback)`, and `postOrderForEach(callback)` accept a callback function, traverse the tree depth-first, and call the callback function on each node.
- `height(value)` returns the height of the node with `node.value == value`, where height is defined as the number of edges in the longest path from that node to a leaf node.
- `depth(value)` returns the depth of the node with `node.value == value`, where depth is defined as the number of edges in the path from that node to the root node.
- `isBalanced()` returns `true` if the tree is balanced and `false` otherwise.
- `rebalance()` rebalances an unbalanced tree.
