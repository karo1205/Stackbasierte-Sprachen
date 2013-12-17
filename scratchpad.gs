%% Dijkstra.gs
%% ===========
%% Computes the shortest path between two nodes by using the 
%% Dijkstra Algorithm
%%

%% some declarations
%file to read from
/infile (input.txt) (r) file def
/outfile (%stdout) (w) file def

%constants
/INFINITE 99999 def
/NULL -1 def
/COMMENT 35 def %ASCII for '%'

% Read input.txt and create internal data structures
% internal data structures as dictionaries are:
% Q: list of all nodes (in the beginning)
% distance: element at position n in the list gives the distance of node n to the startnode
%			initializes with INFINITE (except startnode. This one is 0)
% predecessor: element at position n in the list gives the current predecessor of the node.
%			initializes with NULL

% we also need:
% a list of all neighbours of one node
% a list of distances beween two nodes
/read_all {
	read_nodelist
	read_nodes
	read_start_end_node
	read_distances
% TODO
%	init_data
%	do_dijskstra
} bind def


%---------------------------------------------------------------------------------------------
% Helper functions
%---------------------------------------------------------------------------------------------
% reads list of nodes  (one line)
% node-formats: name1 name 2 .. namex
% sparated by spaces
/read_nodelist {
	(The nodes\n) print
	(=========\n) print
	{
		infile 128 string readline pop 	% do not need the boolean
		is_empty_line { pop exit } if		% exit block 1
		is_comment_line { pop }				% do nothing
		{
			% parse the line
			print_line			% just to check...
			( ) split 			% array of nodes
			% store in dictionary
			/Q exch store	% store Q-list
		} ifelse
	} loop
	(\n) print
	% TODO wie speichern? Welche Strukturen?
	
} bind def

% reads list of nodes until empty line
% node-formats: name x-pos y-	pos
% sparated by spaces
/read_nodes {
	(The nodes and their positions\n) print
	(=============================\n) print
	{
		infile 128 string readline pop 	% do not need the boolean
		is_empty_line { pop exit } if		% exit block 1
		is_comment_line { pop }				% do nothing
		{
			% parse the line
			% TODO
			print_line			% just to check...
		} ifelse
	} loop
	(\n) print
	% TODO wie speichern? Welche Strukturen?
	
} bind def

% reads until first non-empty or uncommented line
% format: start_node end_node
% sparated by space
/read_start_end_node {
	(Start- and Endnode\n) print
	(==================\n) print
	{
		infile 128 string readline pop 	% do not need the boolean
		is_empty_line { pop exit } if		% exit block 1
		is_comment_line { pop }				% do nothing
		{
			print_line			% just to check...
			( ) split
			dup /BEGIN exch 0 get store
			/END exch 1 get store
		} ifelse
	} loop
	(\n) print
	% TODO wie speichern? Welche Strukturen?
} bind def

% reads distances between two nodes
% format: node1 node2 distance 
% sparated by spaces
% reads from current position unti EOF
/read_distances {
	(Distances between nodes\n) print
	(=======================\n) print
	{
		infile 128 string readline pop 	% do not need the boolean
		is_empty_line { pop exit } if		% exit block 1
		is_comment_line { pop }				% do nothing
		{
			% parse the line
			% TODO
			print_line			% just to check...
		} ifelse
	} loop
	(\n) print
	% TODO wie speichern? Welche Strukturen --> ich versuchs mal mit einem dictionary
	% count 2 * dict begin 
	% split % am stack: a b entf
			
} bind def

% if first character of the string begins is a comment put true on the stack
% false otherwise
/is_comment_line {	%string ==> string bool
	dup 0 get COMMENT eq
} bind def

% true if string length is 0
% false otherwise
/is_empty_line {	% string ==> string bool
	dup length 0 eq
} bind def

% prints the topmost line to stdout
/print_line { %string ==> 
	dup (\n) exch
	(%stdout) (w) file exch writestring
	(%stdout) (w) file exch writestring
} bind def

% puts index of node (string) to stack
% NULL if not found
/getindex { % array string getindex index
	dup length	
} bind def


% gets index of node in /Q
% -1 if not in /Q
/get_index { % (A) --> index
	/COMP exch store	
	0 1 /Q load length 1 sub
	{	
		dup
		/Q load exch get /COMP load eq
		{
			exit
		} { pop } ifelse
	} for
	-1
} def

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
