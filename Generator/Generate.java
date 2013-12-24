import java.util.Random;


/**
 * erzeugt zufällig Knoten und Verbindungen...
 * @author robert
 *
 */
public class Generate {
	private int countNodes;
	private int maxDist;
	private double prob;
	private String fileName;
	
	private final String nodePrefix = "N";
	private String header = "# File Format:\n"
			+ "# 1. Block: Knotenliste\n"
			+ "# 2. Block: Knotenkoordinaten\n"
			+ "# 3. Block: Start- und Endknoten\n"
			+ "# 4. Block: Entfernungen zw. Knoten\n"
			+ "#\n"
			+ "# Bloecke sind durch Leerzeilen getrennt\n"
			+ "#";
	
	private final String header1 = "# 1. Block: Eine Zeile mit allen beteiligten Knoten. Das macht die Sache einfacher...";
	
	private String header2 = "# 2. Block\n"
			+ "# Jeder Knoten in einer Zeile. Name x-pos ypos\n"
			+ "# Knoten und Pos\n"
			+ "# Nur zur graphischen Ausgabe gedacht. Keine Verwendung in Algorithmus";
	
	private String header3 = "# 3. Block: Start und Endknoten\n"
			+ "# Eine Zeile, zwei Eintraege";

	private String header4 = "# 4. Block: Entfernungen zwischen den Knoten\n"
			+ "# Entfernungen sind nicht-gerichtet";

	// ==============================================================================================0
	
	public Generate() {
		super();
	}
	
	private void openFile () {
		// TODO
	}
	
	/**
	 * generates the nodes...
	 */
	public void generate(int countNodes, int maxDist, double prob, String fileName) {
		this.countNodes = countNodes;
		this.maxDist = maxDist;
		this.prob = prob;
		this.fileName = fileName;

		outline(header);
		outline ("#");
		outline("# Paramter: ");
		outline("# countNodes: " + countNodes);
		outline("# maxDist: " + maxDist);
		outline("# prob: " + prob);
		outline("#");
		
		generateBlock1();
		generateBlock2();
		generateBlock3();
		generateBlock4();
}
	
	/**
	 * Ausgabe-routine
	 * @param s
	 */
	private void outline(String s) {
		System.out.println(s);
	}
	
	private void generateBlock1() {
		outline(header1);
		StringBuffer s = new StringBuffer();
		
		for (int i = 0; i < countNodes; i++) {
			s.append(nodePrefix+i + " "); 
		}
		
		outline(s.toString());
		outline ("#");		
	}
	
	private void generateBlock2() {
		outline(header2);
		outline ("N0 100 100");
		outline ("");
	}
	
	private void generateBlock3() {
		outline(header3);
		int start = (int)(Math.random()*countNodes);
		int end = (int)(Math.random()*countNodes);
		outline(nodePrefix+start + " " + nodePrefix+end);
	}
	private void generateBlock4() {
		outline(header4);

		// simple alg. Just goes through all the possible (undirected) edges
		// If prob is within random it generates an edge with random*maxDist length
		for (int i = 0; i < countNodes; i++) {
			for (int j = i; j < countNodes; j++) {
				if (Math.random() <= this.prob) {
					// create a edge between the two nodes...
					int dist = (int)(Math.random() * this.maxDist + 1);
					outline(nodePrefix+i + " " + nodePrefix+j + " " + dist);
				}
			}
		}
		outline ("");
	}
	public static void main(String[] args) {
		Generate g = new Generate();
		// Wenig Knoten, hoher Zusammenhalt
		g.generate(25, 20, 0.75, "");
		
		// mittlere Knotenanzahl, geringer Zusammenhalt
		g.generate(50, 40, 0.15, "");

		// hohe Knotenanzahl, mittlerer Zusammenhalt
		g.generate(50, 40, 0.5, "");
}
}