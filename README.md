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
<ol>
<li>Zeile: Liste von Namen (Ohne Leerzeichen), welche Städte bezeichnen</li>
<li>Zeile: Anfangs- und Endstadt</li>
<li>3. - n. Zeile: Abstand zwichen je zwei Städten. Spätere Einträge überschreiben frühere</li>
</ol>
Erste Tests:
------------
Starten des Programms mittels:
gs progname

Im gs-prompt dann einfach den Befehl "read_all" eingeben.
Liest input.txt und schreibt das Zeugs dann mal auf den stack

Ausführen des Programms:
========================
<ol>
<li>Starten von der Kommandozeile mit gs scratchpad.gs</li>
<li>Optional: Eingabe eines anderen input-files mit "get_file"</li>
<li>Einlesen der Daten mit "read_all" vom gs-prompt</li>
<li>Ausführen des Algorithmus mit Eingabe von "dijkstra" im gs-prompt</li>
<li>Ausgabe des kürzesten Pfades:
  <ul>
    <li>print_path (Pfad zw. START und AND</li>
    <li>(node) print_path_to_node (Pfad zw. START und node am stack)</li>
  </ul>
 </li>
</ol>
Momentan gibts noch jede Menge Zeugs am stack. Weiß nicht genau, wo das herkommt.
Dennoch werden alle Knoten korrekt berechnet. Einfach ausgeben mit "Knoten ==", also 
z.B. "A ==" "B ==" ...
Immer ohne Anführungsstricherln...

Generator
=========
Starten des Generators:
	ant run

Die Parameter werden im Java-File in der main-Methode gesetzt (im Aufruf g.generate(..).

