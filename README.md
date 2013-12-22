Stackbasierte-Sprachen
======================

Dijkstra algorithm in PS

Gerichtete Graphen:
http://de.wikipedia.org/wiki/Graph_(Graphentheorie)

Finden des kürzesten Weges mittels Algorithmus von Dijkstra:
http://de.wikipedia.org/wiki/Algorithmus_von_Dijkstra

Input: Adjazenzmatrix mit "0" für keine Verbindung zw. den Knoten für Richtung.


Programmbeschreibung:
=====================
Inputfile:
----------
Inputfilebeschreibung:
Das Inputfile besteht aus drei Teilen. Eine List von Städten (Knoten), Anfangs- und Endstadt und die Entfernungen zwischen den Städten.
Es hat eine gewisses, einzuhaltendes Format:
1.) Zeile: Liste von Namen (Ohne Leerzeichen), welche Städte bezeichnen
2.) Zeile: Anfangs- und Endstadt
3.) 3. - n. Zeile: Abstand zwichen je zwei Städten. Spätere Einträge überschreiben frühere

Erste Tests:
------------
Starten des Programms mittels
gs progname

Im gs-prompt dann einfach den Befehl "read_all" eingeben.
Liest input.txt und schreibt das Zeugs dann mal auf den stack

Ausführen des Programms:
========================
1.) Starten von der Kommandozeile mit gs scratchpad.gs
2.) Einlesen der Daten mit "read_all" vom gs-prompt
3.) Ausführen des Algorithmus mit Eingabe von "dijkstra" im gs-prompt
4.) Ausgabe des kürzesten Pfades:
  a) print_path (Pfad zw. START und AND
  b) (node) print_path_to_node (Pfad zw. START und node am stack)

Momentan gibts noch jede Menge Zeugs am stack. Weiß nicht genau, wo das herkommt.
Dennoch werden alle Knoten korrekt berechnet. Einfach ausgeben mit "Knoten ==", also 
z.B. "A ==" "B ==" ...
Immer ohne Anführungsstricherln...
