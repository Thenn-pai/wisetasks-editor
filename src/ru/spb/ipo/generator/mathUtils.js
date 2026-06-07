export const MathUtils = {
    fact(n) {
        let nBig = BigInt(n);
        if (nBig <= 1n) return 1n;
        let res = 1n;
        for (let i = 2n; i <= nBig; i++) {
            res *= i;
        }
        return res;
    },

    combinations(n, k) {
        let nBig = BigInt(n);
        let kBig = BigInt(k);
        if (kBig < 0n || kBig > nBig) return 0n;
        if (kBig === 0n || kBig === nBig) return 1n;
        
        return this.fact(nBig) / (this.fact(kBig) * this.fact(nBig - kBig));
    },

    permutations(n, k) {
        let nBig = BigInt(n);
        let kBig = BigInt(k);
        if (kBig < 0n || kBig > nBig) return 0n;
        
        return this.fact(nBig) / this.fact(nBig - kBig);
    }
};