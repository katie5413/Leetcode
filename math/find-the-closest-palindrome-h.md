# Find the Closest Palindrome (H)

[564. Find the Closest Palindrome](https://leetcode.com/problems/find-the-closest-palindrome/)



Given a string `n` representing an integer, return _the closest integer (not including itself), which is a palindrome_. If there is a tie, return _**the smaller one**_.

The closest is defined as the absolute difference minimized between two integers.

&#x20;找最近的回文



**Example 1:**

<pre><code><strong>Input: n = "123"
</strong><strong>Output: "121"
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: n = "1"
</strong><strong>Output: "0"
</strong><strong>Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= n.length <= 18`
* `n` consists of only digits.
* `n` does not have leading zeros.
* `n` is representing an integer in the range `[1, 10^18 - 1]`.



```typescript
function nearestPalindromic(n: string): string {
    const length = n.length;
    const candidates = new Set<string>();
    
    // 候選回文數：基於原數字向下和向上的回文
    const prefix = n.slice(0, Math.ceil(length / 2));
    const prefixes = [BigInt(prefix) - 1n, BigInt(prefix), BigInt(prefix) + 1n];
    
    // 生成候選回文數
    // 生成三個候選的回文數字：一個是前綴減一、一個是前綴不變、還有一個是前綴加一
    for (const p of prefixes) {
        const s = p.toString();
        const palindrome = s + s.slice(0, length % 2 === 0 ? s.length : s.length - 1).split('').reverse().join('');
        candidates.add(palindrome);
    }
    
    // 考慮一些極端情況
    candidates.add('1' + '0'.repeat(length - 1) + '1'); // 比 n 大的回文，例如 1001 對於 999
    candidates.add('9'.repeat(length - 1)); // 比 n 小的回文，例如 999 對於 1000

    // 移除自己
    candidates.delete(n);
    
    let nearest = '';
    let minDiff = BigInt(Number.MAX_SAFE_INTEGER);
    
    // 從所有候選回文數中找到與 n 的差距最小的那一個（當有多個相同差距時，選擇較小的那一個）
    for (const candidate of candidates) {
        const diff = BigInt(candidate) - BigInt(n);
        const absDiff = diff < 0 ? -diff : diff;
        
        if (absDiff < minDiff || (absDiff === minDiff && BigInt(candidate) < BigInt(nearest))) {
            minDiff = absDiff;
            nearest = candidate;
        }
    }
    
    return nearest;
}
```
