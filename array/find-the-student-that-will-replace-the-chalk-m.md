# Find the Student that Will Replace the Chalk (M)

[1894. Find the Student that Will Replace the Chalk](https://leetcode.com/problems/find-the-student-that-will-replace-the-chalk/)



There are `n` students in a class numbered from `0` to `n - 1`. The teacher will give each student a problem starting with the student number `0`, then the student number `1`, and so on until the teacher reaches the student number `n - 1`. After that, the teacher will restart the process, starting with the student number `0` again.

You are given a **0-indexed** integer array `chalk` and an integer `k`. There are initially `k` pieces of chalk. When the student number `i` is given a problem to solve, they will use `chalk[i]` pieces of chalk to solve that problem. However, if the current number of chalk pieces is **strictly less** than `chalk[i]`, then the student number `i` will be asked to **replace** the chalk.

Return _the **index** of the student that will **replace** the chalk pieces_.

&#x20;

**Example 1:**

<pre><code><strong>Input: chalk = [5,1,5], k = 22
</strong><strong>Output: 0
</strong><strong>Explanation: The students go in turns as follows:
</strong>- Student number 0 uses 5 chalk, so k = 17.
- Student number 1 uses 1 chalk, so k = 16.
- Student number 2 uses 5 chalk, so k = 11.
- Student number 0 uses 5 chalk, so k = 6.
- Student number 1 uses 1 chalk, so k = 5.
- Student number 2 uses 5 chalk, so k = 0.
Student number 0 does not have enough chalk, so they will have to replace it.
</code></pre>

**Example 2:**

<pre><code><strong>Input: chalk = [3,4,1,2], k = 25
</strong><strong>Output: 1
</strong><strong>Explanation: The students go in turns as follows:
</strong>- Student number 0 uses 3 chalk so k = 22.
- Student number 1 uses 4 chalk so k = 18.
- Student number 2 uses 1 chalk so k = 17.
- Student number 3 uses 2 chalk so k = 15.
- Student number 0 uses 3 chalk so k = 12.
- Student number 1 uses 4 chalk so k = 8.
- Student number 2 uses 1 chalk so k = 7.
- Student number 3 uses 2 chalk so k = 5.
- Student number 0 uses 3 chalk so k = 2.
Student number 1 does not have enough chalk, so they will have to replace it.
</code></pre>

&#x20;

**Constraints:**

* `chalk.length == n`
* `1 <= n <= 10^5`
* `1 <= chalk[i] <= 10^5`
* `1 <= k <= 10^9`

### 一開始使用扣減的方式

發現在數量大的時候會出現超時的錯誤

```typescript
function chalkReplacer(chalk: number[], k: number): number {
    let times = 0
    while (k > 0) {
        k -= chalk[times % chalk.length]
        times++
    }
    if (k === 0) {
        return times % chalk.length
    }
    return (times - 1) % chalk.length
};
```

優化這個函數的關鍵是減少不必要的迴圈計算：

可以先計算總粉筆消耗量，利用 `%` 運算來減少 `k`，然後再遍歷學生陣列找到需要替換粉筆的學生。

這樣做的好處是能夠大幅度降低時間複雜度，特別是在 `k` 很大的情況下，從原本的 O(k) 降到 O(n)

```typescript
function chalkReplacer(chalk: number[], k: number): number {
    const totalChalk = chalk.reduce((sum, c) => sum + c, 0);
    
    // 找到剩餘粉筆的數量，避免不必要的迴圈
    k %= totalChalk;
    
    for (let i = 0; i < chalk.length; i++) {
        if (k < chalk[i]) {
            return i;
        }
        k -= chalk[i];
    }
    
    // 預設情況（實際上永遠不會到達這裡）
    return -1;
}
```



### 推薦）更精練一點的寫法

```typescript
function chalkReplacer(chalk: number[], k: number): number {
    k = k % chalk.reduce((sum, value) => sum += value, 0);

    let student = 0;
    while (k > 0) {
        k -= chalk[student];
        if (k < 0) break;
        student++;
    }

    return student;
};
```
