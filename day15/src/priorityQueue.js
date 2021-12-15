const Heap = require('mnemonist/heap').MinHeap; // no time to build my own today

// I wanted to use .NET 6 priority queue, but will test later with docker
const createMinHeap = () => new Heap(function(a, b) {
    if (a.priority < b.priority) {
        return -1;
    }
    if (a.priority > b.priority) {
        return 1;
    }
        
    return 0;
});


module.exports = {
    createMinHeap,
}
