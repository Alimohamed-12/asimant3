// asimant 3
//  1. What is the Node.js Event Loop? 
// Node.js is single-threaded and non-blocking. 
// It handles asynchronous I/O operations using the Event Loop.
//  The Event Loop continuously checks if the Call Stack is empty, and when it is,
//  it moves callbacks from the Callback Queue to the Call Stack for execution.

// 2. What is Libuv and What Role Does It Play in Node.js? 
// Libuv is a cross-platform C library used by Node.js to handle asynchronous and
//  non-blocking I/O operations. It provides the Event Loop and Thread Pool,
//   allowing Node.js to perform I/O operations without blocking the Main Thread.

// 3
//  How Does Node.js Handle Asynchronous Operations Under the Hood? 
// Node.js handles asynchronous operations using libuv. When an asynchronous operation is requested
// , Node.js passes it to libuv, which uses the OS or Thread Pool to handle the operation
//  without blocking the Main Thread. When the operation completes, its callback is placed 
// in a queue, and the Event Loop moves it to the Call Stack when it is empty.

// 4 4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
// The Call Stack executes JavaScript code.
//  The Event Queue stores callbacks from completed asynchronous operations.
//  The Event Loop continuously checks the Call Stack and Event Queue and moves callbacks
//  to the Call Stack when it is empty
