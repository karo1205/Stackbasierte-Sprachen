%% Dijkstra.gs
%% ===========
%% Computes the shortest path between two nodes by using the 
%% Dijkstra Algorithm
%%
%% some declarations

%file to read from
/infile (input.txt) (r) file def
/outfile (%stdout) (w) file def


% Read input.txt and create internal data structures
/read {
	% read cities
	infile 128 string readline pop %do not need the boolean
	( )	split % delimiter
		
	%read first and last node
	infile 128 string readline pop %do not need the boolean
			%outfile exch writestring
	{ %loop
		infile 128 string readline { %if
		}
		{ %else
			infile closefile
			pop exit	% exit the loop
		} ifelse
	} loop
} bind def


% taken from stackoverflow
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


