%% Dijkstra.gs
%% ===========
%% Computes the shortest path between two nodes by using the 
%% Dijkstra Algorithm
%%

%% some declarations
%file to read from
/infile (input.txt) (r) file def
%constants
/INFINITE 99999 def
/COMMENT 35 def %ASCII for '%'

% Read input.txt and create internal data structures
% internal data structures as dictionaries are:
% Q: list of all nodes (in the beginning)
% node-list. Array with:
%	array of edges
%	distance to startnode
%	predecessor-node (predecessor of the shortest path from nod to startnode

% edge
%	array of end-node and weight (distance)

% real example (from inputfile.txt) Node C would distance from A is 3
% C has three "neighbors": F, D and A with the distances
% /C = [[(F) 1][(D) 6][(A) 3] null 3]

/read_all { % ==>
	read_nodelist
	read_nodes
	read_start_end_node
	read_distances
	infile closefile
} bind def

% the actual algorithm
% computes the shortest path for all nodes in Q
/dijkstra {
	{
		get_next_node % holt den String fuer den nächsten node
		dup remove_from_Q
		% to be used when only distance to end-node	
		% dup END eq {exit} if
		update_neighbors
		Q length 0 eq { exit } if % bis Q leer
	} loop
} bind def

% prints the path from START to END
/print_path {
	END print_path_to_node
} bind def

% prints path from node on stack to START
/print_path_to_node {	% (s) ==> 
	(Path with cumulative distances:\n) print
	(===============================\n) print
	(--) exch 	% end-mark
	{	
		dup load 
		dup 2 get 3 string cvs exch 1 get %(s) (prev)
		dup null eq { pop exit } if
	} loop

	exch print (/) print print% first node
	{	
		dup (--) eq
		{
			pop	% remove marker
			exit
		}
		{ ( ==> ) print exch print (/) print print % arrow and next node
		} ifelse
	} loop
	(\n) print
} bind def

% gets name of node with shortest path of Q
/get_next_node { % ==> (string)
	/SMALEST INFINITE store
	Q {  
		dup /NODE exch store
		load 	% (node) node
		2 get dup SMALEST le 
			{ 
				/TORETURN NODE store 
				/SMALEST exch store
			} 
			{
				pop
			} ifelse	
	} forall
	TORETURN
} bind def

% updates all neighbours of node (if in Q)
% sourcenode as string on stack
/update_neighbors { % (node) ==> 
	dup /N_PRE exch store
	load	% (node) ==> (node) node
	dup 2 get /N_DIST exch store
	0 get		% node ==> array
	{
		dup 0 get %targetnode
		dup is_in_Q {
			load dup dup % array targetnode
			4 -1 roll 1 get N_DIST add	% compute distance
			dup 3 1 roll
			% is new distance smaller than already stored one?
			exch 2 get lt {
				2 exch put		% set new distance
				1 N_PRE put		% set predecessor
			} {
				pop
			} ifelse
		} { 
			pop % not in Q --> discard
			pop
		} ifelse
	} forall
	% da schwindle ich ein wenig.... Stackleichen entfernen
	clear
} bind def

%---------------------------------------------------------------------------------------------
% Helper functions
%---------------------------------------------------------------------------------------------
% asks for a filename to read the graph-def from
/get_file {
	(Please give filename for node defs\n) print
	(%stdin) (r) file
	128 string readline pop
	/infile exch (r) file store
} bind def



% reads list of nodes  (one line)
% node-formats: name1 name 2 .. namex
% sparated by spaces
/read_nodelist { % ==>
	(The nodes\n) print
	(=========\n) print
	{
		infile 1024 string readline pop 	% do not need the boolean
		is_empty_line { pop exit } if		% exit block 1
		is_comment_line { pop }				% do nothing
		{
			% parse the line
			print_line			% just to check...
			( ) split 			% array of nodes
			% store in dictionary
			/Q exch store	% store Q-list
			init_nodes
		} ifelse
	} loop
	(\n) print
} bind def

% reads list of nodes until empty line
% node-formats: name x-pos y-	pos
% sparated by spaces
/read_nodes {
	(The nodes and their positions\n) print
	(=============================\n) print
	{
		infile 256 string readline pop 	% do not need the boolean
		is_empty_line { pop exit } if		% exit block 1
		is_comment_line { pop }				% do nothing
		{
			% parse the line
			print_line			% just to check...
			% TODO wenn wir zeichnen wollen, muessen wir die irgendwie speichern...			
			pop % we do not need them now
		} ifelse
	} loop
	(\n) print
} bind def

% reads until first non-empty or uncommented line
% format: start_node end_node
% sparated by space
/read_start_end_node {
	(Start- and Endnode\n) print
	(==================\n) print
	{
		infile 256 string readline pop 	% do not need the boolean
		is_empty_line { pop exit } if		% exit block 1
		is_comment_line { pop }				% do nothing
		{
			print_line			% just to check...
			( ) split
			dup /START exch 0 get store
			/END exch 1 get store
		} ifelse
	} loop
	(\n) print
} bind def

% reads distances between two nodes
% format: node1 node2 distance 
% sparated by spaces
% reads from current position unti EOF
/read_distances {
	(Distances between nodes\n) print
	(=======================\n) print
	{
		infile 256 string readline pop 	% do not need the boolean
		is_empty_line { pop exit } if		% exit block 1
		is_comment_line { pop }				% do nothing
		{
			% parse the line
			print_line			% just to check...
			( ) split  			% [(node1) (node2) dist]
			dup dup 2 get cvi 2 exch put % replaces destance-string with integer
			update_nodes_list
			pop
		} ifelse
	} loop
	(\n) print
	init_start
} bind def

% initializes the node-elements
% each node is named like in the list above
/init_nodes {
/Q load {
		% array of edges (zero length), predecessor (null), distance (INFINITE)
		[ 0 array null INFINITE ] store
	} forall
} bind def

% updates the edge-list in the node
/update_nodes_list {
	aload 4 -3 roll 3 -2 roll % array --> array dist node node
	set_edge
	aload 4 -3 roll 3 -2 roll exch % array --> array dist node node
	set_edge
} bind def

% updates the edge-list in the node named by topmost node
/set_edge {	% dist (nodeto) (nodefrom) ==> array
	load 	% dist (nodeto) nodefrom
	3 1 roll exch		% nodefrom (nodeto) dist
	/NEW 3 1 roll 2 array astore bind store
	dup 0 get % dist edge-list
	[ exch
	{} forall NEW
	]
	0 exch put
} bind def

% sets the distance of startnode to 0
/init_start {
	START load
	2 0 put
} bind def

% if first character of the string begins is a comment put true on the stack
% false otherwise
/is_comment_line {	% string ==> string bool
	dup 0 get COMMENT eq
} bind def

% true if string length is 0
% false otherwise
/is_empty_line {	% string ==> string bool
	dup length 0 eq
} bind def

% prints the topmost line to stdout
/print_line { %string ==> string
	dup (\n) exch
	(%stdout) (w) file exch writestring
	(%stdout) (w) file exch writestring
} bind def


% gets index of node in /Q
% -1 if not in /Q
/get_index { % elem --> index
	/COMP exch store
	-1	
	0 1 Q length 1 sub % 0 .. Q.length-1
	{	
		dup
		Q exch get COMP eq
		{
			exch pop exit % remove -1
		} { pop } ifelse
	} for
} bind def

% removes stringname from Q by
% setting the value to null
/remove_from_Q { % string ==>
	/COMP exch store	
	[ Q { 
		dup COMP eq {pop} if
	} forall	
	]
	/Q exch store
} bind def

% checks if a given node is in Q
/is_in_Q {	% string ==> bool
	get_index -1 eq not
} bind def

% taken from stackoverflow
% splits a string into tokens based on delimiter
% string delimiter --> [ (tokens) ]
/split {              % str del
    [ 3 1 roll        % [ str del
    {                 % [ ... str del
        search {      % [ ... post match pre
            3 1 roll   % [ ... pre post match  %ie. [ ... pre str' del
        }{            % [ ... str
            exit       % [ ... str  %% break-from-loop
        }ifelse
    } loop             % [ ...
    ]                 % [ ... ]
} bind def

% ---------------------------------
