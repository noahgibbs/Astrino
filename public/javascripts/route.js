// Requires astar.js and pqueue.js

function Node() {
    this.move_cost = 1;
    this.x = 0;
    this.y = 0;
};
Node.fn = Node.prototype;

function HexGridAStar() {
    this.min_x = 1;
    this.max_x = 10;
    this.min_y = 1;
    this.max_y = 10;

    this.nodes = {}
    this.actual_distance = function(node1, node2) {
	return node2.move_cost;
    };
    this.guess_distance = function(node1, node2) {
	// Use really simple guess for most versatility
	xdist = Math.abs(node1.x - node2.x);
	ydist = Math.abs(node1.y - node2.y);
	return Math.max(xdist, ydist);
    };
    this.get_node = function(x, y) {
	if(x < this.min_x || x > this.max_x) return false;
	if(y < this.min_y || y > this.max_y) return false;

	node = this.nodes[x + "," + y];
	if(node) return node;

	node = new Node;
	node.x = x;
	node.y = y;
	this.nodes[x + "," + y] = node;
	return node;
    };
    this.neighbors = function(node1) {
	x = node1.x; y = node1.y;
	is_even = (x % 2) ? 0 : 1;

	node_spots = [[x, y-1], [x, y+1]];
	node_spots += [[x-1, y-is_even], [x-1, y+1-is_even]];
	node_spots += [[x+1, y-is_even], [x+1, y+1-is_even]];

	neighbors = [];
	for(var ns in node_spots) {
	    node = this.get_node(ns[0], ns[1]);
	    if(node) neighbors += [ node ];
	}
	return neighbors;
    }
};
HexGridAStar.prototype = AStar;
