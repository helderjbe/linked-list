function Node(value, next, prev) {
  // The node constructor function
  this.value = value;
  this.next = next;
  this.prev = prev;
}

function Main() {
  // Our "working" function - that's why there's no params passed, we work here
  this.head = null;
  this.tail = null;
  this.length = 0;
}

// Add node to the beginning of the LinkedList
Main.prototype.unshift = function(value) {
  const oldHead = this.head;

  // null for the prev argument as the head has no prev
  const newNode = new Node(value, oldHead, null);

  if (oldHead) {
    // Now the "old" head needs to have a previous node
    oldHead.prev = newNode;
  }
  // If the tail doesn't exist, make it the same as newHead
  if (!this.tail) {
    this.tail = newNode;
  }

  // Finally update the head
  this.head = newNode;

  // Update length
  this.length++;
};

// Add node to the end of the LinkedList
Main.prototype.push = function(value) {
  // Basically do the same as the unshift() but in reverse
  const oldTail = this.tail;

  // null for the next argument as the tail has no next
  const newNode = new Node(value, null, this.tail);

  if (oldTail) {
    // Now the "old" tail needs to have a next node
    oldTail.next = newNode;
  }
  // If the tail doesn't exist, make it the same as newTail
  if (!this.head) {
    this.head = newNode;
  }

  // Finally update the tail
  this.tail = newNode;

  // Update length
  this.length++;
};

// Remove first item in the LinkedList
Main.prototype.shift = function() {
  if (!this.head) {
    // If there is no head there's no reference to the first value, so just return
    return null;
  }

  // Capture the current head node
  const oldHead = this.head;

  // "Remove" the current head by replacing it for the next node
  this.head = this.head.next;

  // this.head.next can be null, and if so, this.head will also be null
  if (this.head) {
    // Now the new head shouldn't have a prev Node
    this.head.prev = null;
  } else {
    // If the new head "doesn't exist", then it means the LinkedList is empty, so we need to update the tail as well
    this.tail = null;
  }

  // Update length
  this.length--;

  return oldHead.value;
};

Main.prototype.pop = function() {
  // Same spiel as shift() method
  if (!this.tail) {
    // If there is no tail there's no reference to the last value, so just return
    return null;
  }

  // Capture the current tail node
  const oldTail = this.tail;

  // "Remove" the current tail by replacing it for the previous node
  this.tail = this.tail.prev;

  // this.tail.prev can be null, and if so, this.tail will also be null
  if (this.tail) {
    // Now the new tail shouldn't have a next Node
    this.head.next = null;
  } else {
    // If the new tail "doesn't exist", then it means the LinkedList is empty, so we need to update the head as well
    this.head = null;
  }

  // Update length
  this.length--;

  return oldTail.value;
};

// Return Node of the first value match
Main.prototype.getNode = function(value) {
  // Start at the head
  let currentNode = this.head;

  while (currentNode) {
    // Test of the value inputted is the same as the current Node value
    if (value === currentNode.value) {
      return currentNode;
    }

    // If progressing to the next node, we make the current node the same as the next node
    // So for example, if we wanted to move 2 Nodes forwards, we would to currentNode.next.next
    currentNode = currentNode.next;
  }

  // It doesn't exist
  return null;
};

// Return the index of the value in the LinkedList
Main.prototype.index = function(value) {
  // Start at the head
  let currentNode = this.head;

  for (let index = 0; currentNode; index++) {
    // Test of the value inputted is the same as the current Node value
    if (value === currentNode.value) {
      // Return the index of the loop
      return index;
    }

    // If progressing to the next node, we make the current node the same as the next node
    // So for example, if we wanted to move 2 Nodes forwards, we would to currentNode.next.next
    currentNode = currentNode.next;
  }

  // It doesn't exist
  return null;
};

// Tests
const newList = new Main();

newList.push(10);
newList.pop();

newList.push(5);

newList.unshift(4);

console.log(newList.index(10));
console.log(newList.index(4));
console.log(newList.index(5));

/* This should output:
 * null
 * 0 (because unshift adds to head)
 * 1 (comes after because push adds to tail)
 */
