// Adapted from "http://www.csse.monash.edu.au/~lloyd/tildeAlgDS/Priority-Q/"

function Heap() {
  this.arr = [ 0 ];
  this.N = 0;
  this.elthash = {};
  this.priority = function(x) { return x; };
}
Heap.fn = Heap.prototype;

Heap.fn.upHeap = function( child_idx ) {
   var newElt = this.arr[child_idx];
   var parent_idx = Math.floor(child_idx/2);
   while( parent_idx >= 1) // child has a parent
    { // INV: this.arr[child_idx ..  ] is a Heap
      if( this.arr[parent_idx] < newElt )
       { this.arr[child_idx] = this.arr[parent_idx]; // move parent down
         child_idx  = parent_idx;
         parent_idx = Math.floor(child_idx/2);
       }
      else { break; }
    }
   // ASSERT: child_idx == 1 || newElt <= this.arr[parent_idx]
   this.arr[child_idx] = newElt;
};

Heap.fn.insert = function(value) {
  if(typeof(this.elthash[value]) == "undefined") {
    this.elthash[value] = 0;
  }
  this.elthash[value]++;

  this.N++;
  this.arr[this.N] = value;
  upHeap(this.N);
};

Heap.fn.downHeap = function( parent_idx ) {
// PRE:  this.arr[parent_idx+1..this.N] is a Heap, and parent_idx >= 1
// POST: this.arr[parent_idx  ..this.N] is a Heap
   var newElt = this.arr[parent_idx];
   var child_idx = 2*parent_idx; // left(parent_idx)
   while( child_idx <= this.N )   // parent has a child
    { // INV: this.arr[1 .. parent_idx] is a Heap
      if( child_idx < this.N )    // has 2 children
        {
          if( this.arr[child_idx+1] > this.arr[child_idx] )
            { child_idx++; }      // right child is bigger
        }
      if( newElt < this.arr[child_idx] )
       { this.arr[parent_idx] = this.arr[child_idx];
         parent_idx = child_idx;
         child_idx = 2*parent_idx;
       }
      else { break; }
    }
   // ASSERT: child_idx > this.N || newElt >= this.arr[child_idx]
   this.arr[parent_idx] = newElt;
};

Heap.fn.pop = function() {
  highest = this.arr[1];
  this.elthash[highest]--;
  this.arr[1] = this.arr[this.N];
  this.N--;
  downHeap(1);

  return highest;
};

Heap.fn.contains = function(elt) {
  return (elthash[elt] ? true : false);
};

Heap.fn.search = function(elt) {
  var idx;
  for(idx = 1; idx < this.N; idx++) {
    if(this.arr[idx] == elt) {
      return idx;
    }
  }

  return null;
};

Heap.fn.empty = function() {
  return this.N === 0 ? true : false;
};
