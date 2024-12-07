# Node.js Server Unresponsiveness Bug

This repository demonstrates a common issue in Node.js servers: unresponsiveness due to long-running request handlers.  When a request takes a significant amount of time to process (e.g., due to database queries, complex calculations, or external API calls), the server may appear to hang or become unresponsive to new requests if not handled properly.  This is because Node.js uses a single-threaded event loop.  A long-running operation blocks the event loop, preventing other requests from being processed.

The `bug.js` file shows an example of a server that introduces a 5-second delay in processing each request, leading to unresponsiveness under load. The `bugSolution.js` file provides a solution using worker threads.