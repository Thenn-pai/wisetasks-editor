self.onmessage = function(e) {
    const { maxD, K, firstNotZero, conditions } = e.data;
    let count = 0;

    const dfs = (depth, currentSeq) => {
        if (depth === K) {
            count++;
            return;
        }

        for (let i = 0; i <= maxD; i++) {
            if (depth === 0 && firstNotZero && i === 0) continue;

            if (depth > 0) {
                const prev = currentSeq[depth - 1];
                if (conditions.includes('distinct') && currentSeq.includes(i)) continue;
                if (conditions.includes('adjacent_distinct') && prev === i) continue;
                if (conditions.includes('descending') && prev <= i) continue;
                if (conditions.includes('ascending') && prev >= i) continue;
                if (conditions.includes('non_descending') && prev > i) continue;
                if (conditions.includes('non_ascending') && prev < i) continue;
            }

            currentSeq.push(i);
            dfs(depth + 1, currentSeq);
            currentSeq.pop();
        }
    };

    dfs(0, []);
    self.postMessage(count);
};