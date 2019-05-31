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
  const newHead = new Node(value, oldHead, null);

  if (oldHead) {
    // Now the "old" head needs to have a previous node
    oldHead.prev = newHead;
  }
  // If the tail doesn't exist, make it the same as newHead
  if (!this.tail) {
    this.tail = newHead;
  }

  // Finally update the head
  this.head = newHead;

  // Update length
  this.length++;
};

// Add node to the end of the LinkedList
Main.prototype.push = function(value) {
  // Basically do the same as the unshift() but in reverse
  const oldTail = this.tail;

  // null for the next argument as the tail has no next
  const newTail = new Node(value, null, this.tail);

  if (oldTail) {
    // Now the "old" tail needs to have a next node
    oldTail.next = newTail;
  }
  // If the tail doesn't exist, make it the same as newTail
  if (!this.head) {
    this.head = newTail;
  }

  // Finally update the tail
  this.tail = newTail;

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
  const oldHead = Object.assign({}, this.head);

  // "Remove" the current head by replacing it for the next node
  this.head = this.head.next;

  // this.head.next can be null, and if so, this.head will also be null
  if (!this.head) {
    // Now the new tail should also be set to null
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
  const oldTail = Object.assign({}, this.tail);

  // "Remove" the current tail by replacing it for the previous node
  this.tail = this.tail.prev;

  // this.tail.prev can be null, and if so, this.tail will also be null
  if (!this.tail) {
    // Now the new head should also be set to null
    this.head = null;
  }

  // Update length
  this.length--;

  return oldTail.value;
};

// Return the index of the value in the LinkedList
Main.prototype.getValues = function(value) {
  // Start at the head
  let currentNode = this.head;

  let values = [];

  for (let index = 0; currentNode; index++) {
    // Push the values on the array to return later
    values.push(currentNode.value);

    // If progressing to the next node, we make the current node the same as the next node
    // So for example, if we wanted to move 2 Nodes forwards, we would to currentNode.next.next
    currentNode = currentNode.next;
  }

  // Return the array
  return values;
};

// Tests
const newList = new Main();

newList.unshift("World");
newList.unshift("Hello");

newList.push(1234);

newList.push({
  something: "oops"
});
newList.pop();
newList.push({
  something: "yolo"
});

console.log(newList.getValues());
console.log('Length: ' + newList.length);

/* Output:
  ["Hello", "World", 1234, Object]
  0: "Hello"
  1: "World"
  2: 1234
  3: Object
    something: "yolo"
  Length: 4
 */
