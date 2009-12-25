/* Strongly inspired by the Wikipedia entry "http://en.wikipedia.org/wiki/A*_search_algorithm" */

/* To use this API, you'll want to create an AStar object, then
   override the following functions: actual_distance, guess_distance and
   neighbors.
 */

function AStar() {
  this.actual_distance = function(node1, node2) { return 1; };
  this.guess_distance = function(node1, node2) { return Math.max(Math.abs(node1.x - node2.x), Math.abs(node1.y - node2.y)); };
  this.neighbors = function(node1) { throw "No algorithm defined for AStar neighbors!"; };
  this.came_from = {};
}
AStar.fn = AStar.prototype;

AStar.fn.reset = function() {
  this.came_from = {};
};

AStar.fn.reconstruct_path = function() {
  if(typeof(this.came_from[current_node]) != "undefined") {
    p = reconstruct_path(came_from[current_node]);
    return (p + [ current_node ]);
  }
  return [];
};

AStar.fn.search = function(start_node, goal_node) {
  closed_set = {};
  open_set = new Heap();
  open_set.priority = function(node) { return -f_score[node]; };
  open_set.insert(start_node);
  g_score = {};
  h_score = {};
  f_score = {};

  g_score[start_node] = 0;
  h_score[start_node] = AStar.fn.distance(start_node, goal_node);
  f_score[start_node] = h_score[start_node];

  while(!open_set.empty()) {
    x = open_set.pop();
    if(x == goal_node) {
      return this.reconstruct_path(goal_node);
    }
    closed_set[x] = true;

    nn = self.neighbors(x);
    for(var y in nn) {
      if(closed_set[y]) { continue; }
      tentative_g = g_score[x] + self.distance(x, y);
      tentative_is_better = false;

      if(!open_set.contains(y)) {
        open_set.insert(y);
        tentative_is_better = true;
      } else if(tentative_g < g_score[y]) {
        tentative_is_better = true;
      }

      if(tentative_is_better) {
        this.came_from[y] = x;
        g_score[y] = tentative_g_score;
        h_score[y] = this.distance(y, goal_node);
        f_score[y] = g_score[y] + h_score[y];
      }
    }
  }

  return null;
};
