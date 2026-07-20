// ---------- Graph Data ----------
const n = 7;

const edges = [
    [7, 0, 1],
    [5, 0, 3],
    [8, 1, 2],
    [9, 1, 3],
    [7, 1, 4],
    [5, 2, 4],
    [15, 3, 4],
    [6, 3, 5],
    [8, 4, 5],
    [9, 4, 6],
    [11, 5, 6]
];

// Build adjacency list
const adj = {};

for (const [w, u, v] of edges) {
    if (!adj[u]) adj[u] = [];
    if (!adj[v]) adj[v] = [];

    adj[u].push([v, w]);
    adj[v].push([u, w]);
}

// ---------- Union Find ----------
class UnionFind {

    constructor(n) {
        this.parent = [];
        this.rank = [];

        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    find(x) {
        if (this.parent[x] !== x)
            this.parent[x] = this.find(this.parent[x]);

        return this.parent[x];
    }

    union(x, y) {

        let rx = this.find(x);
        let ry = this.find(y);

        if (rx === ry)
            return false;

        if (this.rank[rx] < this.rank[ry]) {
            let temp = rx;
            rx = ry;
            ry = temp;
        }

        this.parent[ry] = rx;

        if (this.rank[rx] === this.rank[ry])
            this.rank[rx]++;

        return true;
    }
}

// ---------- Kruskal ----------
function kruskal() {

    let sortedEdges = [...edges].sort((a, b) => a[0] - b[0]);

    let uf = new UnionFind(n);

    let mst = [];
    let cost = 0;

    for (const [w, u, v] of sortedEdges) {

        if (uf.union(u, v)) {

            mst.push([u, v, w]);
            cost += w;

            if (mst.length === n - 1)
                break;
        }
    }

    return { mst, cost };
}

// ---------- Prim ----------
function prim() {

    const visited = new Array(n).fill(false);
    const key = new Array(n).fill(Infinity);
    const parent = new Array(n).fill(-1);

    key[0] = 0;

    let mst = [];
    let cost = 0;

    for (let count = 0; count < n; count++) {

        let u = -1;

        for (let i = 0; i < n; i++) {
            if (!visited[i] && (u === -1 || key[i] < key[u]))
                u = i;
        }

        visited[u] = true;

        if (parent[u] !== -1) {
            mst.push([parent[u], u, key[u]]);
            cost += key[u];
        }

        if (adj[u]) {

            for (const [v, wt] of adj[u]) {

                if (!visited[v] && wt < key[v]) {

                    key[v] = wt;
                    parent[v] = u;
                }
            }
        }
    }

    return { mst, cost };
}

// ---------- Display ----------
function runKruskal() {

    const result = kruskal();

    let output = "=== KRUSKAL'S MST ===\n\n";

    result.mst.forEach(edge => {

        output += `Edge (${edge[0]} - ${edge[1]})   Weight: ${edge[2]}\n`;

    });

    output += `\nTotal MST Cost : ${result.cost}`;

    document.getElementById("result").textContent = output;
}

function runPrim() {

    const result = prim();

    let output = "=== PRIM'S MST ===\n\n";

    result.mst.forEach(edge => {

        output += `Edge (${edge[0]} - ${edge[1]})   Weight: ${edge[2]}\n`;

    });

    output += `\nTotal MST Cost : ${result.cost}`;

    document.getElementById("result").textContent = output;
}