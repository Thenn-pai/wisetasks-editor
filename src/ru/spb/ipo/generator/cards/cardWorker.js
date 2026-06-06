self.onmessage = function(e) {
    try {
        const { K, deck, conds } = e.data;
        let count = 0;

        const generateCombinations = (start, combo) => {
            if (combo.length === K) {
                let isValid = true;
                for (let cond of conds) {
                    let matchCount = 0;
                    for (let card of combo) {
                        const parts = card.split('_');
                        if (cond.type === 'suit' && parts[1] === cond.value) matchCount++;
                        if (cond.type === 'rank' && parts[0] === cond.value) matchCount++;
                    }
                    if (matchCount !== cond.count) {
                        isValid = false;
                        break;
                    }
                }
                if (isValid) count++;
                return;
            }
            for (let i = start; i < deck.length; i++) {
                combo.push(deck[i]);
                generateCombinations(i + 1, combo);
                combo.pop();
            }
        };

        generateCombinations(0, []);
        self.postMessage(count);
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};