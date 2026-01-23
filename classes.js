export {Tree}

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

  #findValue(value, node) {
    if (value > node.value) {
      if (node.right == null) return
      if (node.right != null) return this.#findValue(value, node.right)
    }
    if (value < node.value) {
      if (node.left == null) return
      if (node.left != null) return this.#findValue(value, node.left)
    }
    if (value == node.value) return node
  }

  find(value) {
    return this.#findValue(value, this.root);
  }

  #getNodeQueue(callback, node, nodeQueue) {
    if (this.root == null) return
    nodeQueue.push(node);
    while (nodeQueue.length > 0) {
      const currentNode = nodeQueue[0];
      if (currentNode.left != null) nodeQueue.push(currentNode.left);
      if (currentNode.right != null) nodeQueue.push(currentNode.right);
      callback(currentNode);
      nodeQueue.shift();
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback != 'function') throw Error('levelorderForEach must be passed a callback function');
    this.#getNodeQueue(callback, this.root, []);
  }

  #printInorderWrapper(callback, node) {
    if (node == null) return
    this.#printInorderWrapper(callback, node.left);
    callback(node);
    this.#printInorderWrapper(callback, node.right);
  }

  inOrderForEach(callback) {
    this.#printInorderWrapper(callback, this.root);
  }

  #printPreorderWrapper(callback, node) {
    if (node == null) return
    callback(node);
    this.#printPreorderWrapper(callback, node.left);
    this.#printPreorderWrapper(callback, node.right);
  }

  preOrderForEach(callback) {
    this.#printPreorderWrapper(callback, this.root);
  }

  #printPostorderWrapper(callback, node) {
    if (node == null) return
    this.#printPostorderWrapper(callback, node.left);
    this.#printPostorderWrapper(callback, node.right);
    callback(node);
  }

  postOrderForEach(callback) {
    this.#printPostorderWrapper(callback, this.root);
  }
  #countEdges(value, node, i) {
    if (value > node.value) {
      if (node.right == null) return
      if (node.right != null) return this.#countEdges(value, node.right, ++i)
    }
    if (value < node.value) {
      if (node.left == null) return
      if (node.left != null) return this.#countEdges(value, node.left, ++i)
    }
    if (value == node.value) return i
  }

  height(value) {
    let breadthFirstValues = [];
    let inputNode = this.find(value);
    this.#getNodeQueue((node) => breadthFirstValues.push(node), inputNode, []);
    const leafNodeValue = breadthFirstValues.at(-1).value;
    return this.#countEdges(leafNodeValue, inputNode, 0)
  }

  depth(value) {
    return this.#countEdges(value, this.root, 0)
  }

  isBalanced() {
    let output = true;

    this.postOrderForEach((node) => {
      if (node.left == null && node.right == null) return
      if (node.left == null && node.right != null) {
        if (this.height(node.right.value) > 0) {
          output = false;
          return
        }
      }
      if (node.right == null && node.left != null) {
        if (this.height(node.left.value) > 0) {
          output = false;
          return
        }
      }
      if (node.left != null && node.right != null) {
        if (Math.abs(this.height(node.left.value) - this.height(node.right.value)) > 1) {
          output = false;
          return
        }
      }
    })
    return output
  }

  rebalance() {
    if (this.isBalanced()) return
    let newInputArray = [];
    this.inOrderForEach((node) => newInputArray.push(node.value));
    this.root = this.#buildTree(newInputArray);
  }
}