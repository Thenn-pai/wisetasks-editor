self.onmessage = function(e) {
    const { K, alphabet, allowRepeats, conditions } = e.data;
    let count = 0;
    const n = alphabet.length;
    const used = new Array(n).fill(false);
    const currentWord = [];
    const vowels = new Set(['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'a', 'e', 'i', 'o', 'u', 'y']);

    const isVowel = (char) => vowels.has(char);

    const countVowelsConsonants = (word) => {
        let v = 0; let c = 0;
        for (let char of word) {
            if (isVowel(char)) v++; else c++;
        }
        return { v, c };
    };

    const checkPrefixConditions = (word) => {
        const len = word.length;
        if (len < 2) return true;

        const prev = word[len - 2];
        const curr = word[len - 1];
        const prevIsV = isVowel(prev);
        const currIsV = isVowel(curr);

        if (conditions.includes('alternate')) {
            if (prevIsV === currIsV) return false;
        }
        if (conditions.includes('after_c_is_v')) {
            if (!prevIsV && !currIsV) return false;
        }
        if (conditions.includes('after_v_is_c')) {
            if (prevIsV && currIsV) return false;
        }
        return true;
    };

    const checkFinalConditions = (word) => {
        if (conditions.includes('palindrome')) {
            let left = 0;
            let right = word.length - 1;
            while (left < right) {
                if (word[left] !== word[right]) return false;
                left++; right--;
            }
        }

        const counts = conditions.some(c => c.startsWith('c_')) ? countVowelsConsonants(word) : null;
        
        if (conditions.includes('c_less_v') && counts.c >= counts.v) return false;
        if (conditions.includes('c_more_v') && counts.c <= counts.v) return false;
        if (conditions.includes('c_eq_v') && counts.c !== counts.v) return false;

        return true;
    };

    const dfs = (depth) => {
        if (depth === K) {
            if (checkFinalConditions(currentWord)) {
                count++;
            }
            return;
        }

        for (let i = 0; i < n; i++) {
            if (!allowRepeats && used[i]) continue;
            
            const char = alphabet[i];
            currentWord.push(char);
            used[i] = true;

            if (checkPrefixConditions(currentWord)) {
                dfs(depth + 1);
            }

            currentWord.pop();
            used[i] = false;
        }
    };

    dfs(0);
    self.postMessage(count);
};