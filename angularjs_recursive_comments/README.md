#AngularJS Recursive Comments

This is a simple AngularJS app that does not persist data to any database, it indents comments using a recursive algorithm thanks to the ng-include function.  The idea is that I wanted to store comments in a database with just an id, parent_id, and text, but when actually printing the comments I want them to be in a JSON tree structure, so there are JavaScript methods that search for children of a node.
