# Count Number of Teams (M)

[1395. Count Number of Teams](https://leetcode.com/problems/count-number-of-teams/)



There are `n` soldiers standing in a line. Each soldier is assigned a **unique** `rating` value.

You have to form a team of 3 soldiers amongst them under the following rules:

* Choose 3 soldiers with index (`i`, `j`, `k`) with rating (`rating[i]`, `rating[j]`, `rating[k]`).
* A team is valid if: (`rating[i] < rating[j] < rating[k]`) or (`rating[i] > rating[j] > rating[k]`) where (`0 <= i < j < k < n`).

Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).

&#x20;

**Example 1:**

<pre><code><strong>Input: rating = [2,5,3,4,1]
</strong><strong>Output: 3
</strong><strong>Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1). 
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: rating = [2,1,3]
</strong><strong>Output: 0
</strong><strong>Explanation: We can't form any team given the conditions.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: rating = [1,2,3,4]
</strong><strong>Output: 4
</strong></code></pre>

&#x20;

**Constraints:**

* `n == rating.length`
* `3 <= n <= 1000`
* `1 <= rating[i] <= 10^5`
* All the integers in `rating` are **unique**.





### Math

* 計算每個士兵左邊有多少士兵的評級低於和高於他們。
* 同樣，需要計算在他們右邊有多少士兵的評級低於和高於他們。
* 以這個士兵為中間元素的升序隊伍的數量是左邊評級低於他們的士兵數量和右邊評級高於他們的士兵數量的乘積。
* 以這個士兵為中間元素的降序隊伍的數量是左邊評級高於他們的士兵數量和右邊評級低於他們的士兵數量的乘積。
* 通過將這些計數加總，我們可以得到所有有效隊伍的總數。

```typescript
function numTeams(rating: number[]): number {
    let count: number = 0; // 初始化計數變數，用於儲存有效隊伍的總數

    // 從第二個元素到倒數第二個元素進行迭代，將它們視為潛在的中間元素
    for (let j = 1; j < rating.length - 1; j++) {
        // 初始化計數變數
        let leftSmaller = 0, leftLarger = 0;
        let rightSmaller = 0, rightLarger = 0;

        // 遍歷左邊的元素，計算比rating[j]小和大的元素數量
        for (let i = 0; i < j; i++) {
            if (rating[i] < rating[j]) leftSmaller++; // 計算左邊比rating[j]小的元素
            if (rating[i] > rating[j]) leftLarger++;  // 計算左邊比rating[j]大的元素
        }

        // 遍歷右邊的元素，計算比rating[j]小和大的元素數量
        for (let k = j + 1; k < rating.length; k++) {
            if (rating[k] < rating[j]) rightSmaller++; // 計算右邊比rating[j]小的元素
            if (rating[k] > rating[j]) rightLarger++;  // 計算右邊比rating[j]大的元素
        }

        // 計算有效隊伍的數量，並加到總計數變數中
        count += leftSmaller * rightLarger + leftLarger * rightSmaller;
    }
    return count; // 返回總計數，即有效隊伍的數量
};
```

<figure><img src="../.gitbook/assets/截圖 2024-07-29 下午2.05.56.png" alt=""><figcaption></figcaption></figure>



### 特別的寫法，存參

參考來源

{% embed url="https://leetcode.com/problems/count-number-of-teams/solutions/5542382/beats-100-o-n-log-n-binary-index-tree-java-python-c-javascript-typescript-go-rust" %}

```typescript
function numTeams(rating: number[]): number {
    const n: number = rating.length;
    if (n < 3) return 0;
    
    const soldiers: [number, number][] = rating.map((r, i): [number, number] => [r, i]).sort((a, b) => a[0] - b[0]);
    const indexMap: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        indexMap[soldiers[i][1]] = i;
    }
    
    const countTeams = (ascending: boolean): number => {
        const bit: number[] = new Array(n + 1).fill(0);
        let teams: number = 0;
        
        for (let i = 0; i < n; i++) {
            const rank: number = indexMap[i] + 1;
            const left: number = ascending ? getSum(bit, rank - 1) : getSum(bit, n) - getSum(bit, rank);
            const right: number = ascending ? n - rank - (getSum(bit, n) - getSum(bit, rank)) : rank - 1 - getSum(bit, rank - 1);
            teams += left * right;
            update(bit, rank, 1);
        }
        
        return teams;
    };
    
    const update = (bit: number[], index: number, val: number): void => {
        while (index < bit.length) {
            bit[index] += val;
            index += index & (-index);
        }
    };
    
    const getSum = (bit: number[], index: number): number => {
        let sum: number = 0;
        while (index > 0) {
            sum += bit[index];
            index -= index & (-index);
        }
        return sum;
    };
    
    return countTeams(true) + countTeams(false);
}
```
