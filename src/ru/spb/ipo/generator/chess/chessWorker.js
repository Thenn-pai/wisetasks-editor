self.onmessage = function(e) {
    const { N, M, K, pType } = e.data;
    let count = 0;
    const totalCells = N * M;
    const placed = [];

    const isSafe = (x, y) => {
        for (let i = 0; i < placed.length; i++) {
            const px = placed[i].x;
            const py = placed[i].y;
            const dx = Math.abs(px - x);
            const dy = Math.abs(py - y);

            if (pType === 'bishop') {
                if (dx === dy) return false;
            } else if (pType === 'knight') {
                if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) return false;
            } else if (pType === 'queen') {
                if (dx === 0 || dy === 0 || dx === dy) return false;
            } else if (pType === 'king') {
                if (Math.max(dx, dy) === 1) return false;
            }
        }
        return true;
    };

    const dfs = (startIndex) => {
        if (placed.length === K) {
            count++;
            return;
        }

        if (totalCells - startIndex < K - placed.length) return;

        for (let i = startIndex; i < totalCells; i++) {
            const x = i % N;
            const y = Math.floor(i / N);

            if (isSafe(x, y)) {
                placed.push({x, y});
                dfs(i + 1);
                placed.pop();
            }
        }
    };

    dfs(0);
    
    self.postMessage(count);
};