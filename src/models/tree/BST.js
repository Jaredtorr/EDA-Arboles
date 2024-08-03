import Node from "./Node.js";

class BST {
    #root;

    constructor() {
        this.#root = null;
    }

    add(value) {
        if (this.#root === null) {
            this.#root = new Node(value);
            return this.#root !== null;
        } else {
            return this.insertNode(this.#root, value);
        }
    }

    insertNode(node, value) {
        if (value.precioClothe < node.value.precioClothe) {
            if (node.left === null) {
                node.left = new Node(value);
                return node.left !== null;
            } else {
                return this.insertNode(node.left, value);
            }
        } else if (value.precioClothe > node.value.precioClothe) {
            if (node.right === null) {
                node.right = new Node(value);
                return node.right !== null;
            } else {
                return this.insertNode(node.right, value);
            }
        } else {
            return false;
        }
    }

    search(precioClothe) {
        return this.searchNode(this.#root, precioClothe);
    }

    searchNode(node, precioClothe) {
        if (node === null) {
            return null;
        } else if (precioClothe < node.value.precioClothe) {
            return this.searchNode(node.left, precioClothe);
        } else if (precioClothe > node.value.precioClothe) {
            return this.searchNode(node.right, precioClothe);
        } else {
            return node;
        }
    }

    min() {
        if (this.#root === null) {
            return null;
        }
        return this.minNode(this.#root);
    }

    minNode(node) {
        if (node === null) {
            return null;
        }
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    max() {
        if (this.#root === null) {
            return null;
        }
        return this.maxNode(this.#root);
    }

    maxNode(node) {
        if (node === null) {
            return null;
        }
        while (node.right !== null) {
            node = node.right;
        }
        return node;
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.#root, callback);
    }

    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.value);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
}

export default BST;
