import { Tree } from "./classes.js";

const input = Array(20);
for (let i = 0; i < input.length; i++) {
  input[i] = Math.floor(Math.random() * 100);
}

let myTree = new Tree(input);
myTree.prettyPrint();
console.log(myTree.isBalanced());

myTree.preOrderForEach((node) => console.log(node.value));
console.log(' ');
myTree.postOrderForEach((node) => console.log(node.value));
console.log(' ');
myTree.inOrderForEach((node) => console.log(node.value));

myTree.insert(101);
myTree.insert(104);
myTree.insert(103);
myTree.prettyPrint();
console.log(myTree.isBalanced());

myTree.rebalance();
myTree.prettyPrint();
console.log(myTree.isBalanced());