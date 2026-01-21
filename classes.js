class Node {
  constructor(value, leftChild, rightChild) {
    this.value = value;
    this.left = leftChild;
    this.right = rightChild;
  }
}

class Tree {
  constructor(array) {
    let inputArray = array.sort((a, b) => a - b)
    inputArray = inputArray.filter((element, index, array) => {
      if (index == array.length - 1) return true
      if (element != array[index + 1]) return true
    })
    console.log(inputArray)
    this.root = this.#buildTree(inputArray);
  }

  #buildTree(myArray) {
    let root, leftChild, rightChild;
    if (myArray.length == 1) {
      root = myArray[0]
      leftChild = null;
      rightChild = null
    } else {
      const midIndex = Math.floor((myArray.length - 1) / 2);
      root = myArray[midIndex];
      leftChild = (midIndex == 0) ? null : this.#buildTree(myArray.slice(0, midIndex));
      rightChild = (midIndex == myArray.length - 1) ? null : this.#buildTree(myArray.slice(midIndex + 1));
    }
    const node = new Node(root, leftChild, rightChild);
    return node
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  #addValue(value, node) {
    const newNode = new Node(value, null, null);
    if (value == node.value) return
    if (value > node.value && node.right == null) {
      node.right = newNode;
      return
    }
    if (value < node.value && node.left == null) {
      node.left = newNode;
      return
    }
    if (value > node.value) return this.#addValue(value, node.right)
    if (value < node.value) return this.#addValue(value, node.left)
  }

  insert(value) {
    this.#addValue(value, this.root);
  }

  #deleteValue(value, node, predecessor, right) {
    if (value == node.value && node.left == null && node.right == null) {
      if (predecessor == null) {
        node.value = null;
        return 
      }
      if (right == 1) {
        predecessor.right = null;
        return
      }
      if (right == 0) {
        predecessor.left = null;
        return
      }
    }

    if (value == node.value && node.left != null && node.right == null) {
      if (predecessor == null) {
        this.root = node.left;
        return 
      }
      if (right == 1) {
        predecessor.right = node.left;
        return
      }
      if (right == 0) {
        predecessor.left = node.left;
        return
      }
    }
    if (value == node.value && node.left == null && node.right != null) {
      if (predecessor == null) {
        this.root = node.right;
        return 
      }
      if (right == 1) {
        predecessor.right = node.right;
        return
      }
      if (right == 0) {
        predecessor.left = node.right;
        return
      }
    }

    //using the inorder successor when the node has two children
    if (value == node.value && node.left != null && node.right != null) {
      let successor = node.right;
      let predecessor = node;
      if (successor.left == null) {
        node.value = successor.value;
        node.right = successor.right
      } else {
        while (successor.left != null) {
          predecessor = successor;
          successor = successor.left;
        }
        node.value = successor.value;
        if (successor.right != null) {
        predecessor.left = successor.right;
        }
      }      
      return
    }

    if (value > node.value) return this.#deleteValue(value, node.right, node, 1)
    if (value < node.value) return this.#deleteValue(value, node.left, node, 0)
  }
  
  deleteItem(value) {
    this.#deleteValue(value, this.root, null, null);
  }
}

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
// console.dir(test, {depth: null})
// test.prettyPrint()
test.insert(3000)
console.dir(test, {depth: null})
test.prettyPrint()
test.deleteItem(8)
// console.dir(test, {depth: null})
test.prettyPrint()

// console.log([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
//               .sort((a, b) => a - b)
//               .filter((element, index, array) => {
//                 if (index == array.length - 1) return true //if last element return true
//                 if (element != array[index + 1]) return true //else return true if next element is not equal to current one
//               }))