# Most Stones Removed with Same Row or Column (M)

[947. Most Stones Removed with Same Row or Column](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/)



On a 2D plane, we place `n` stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either **the same row or the same column** as another stone that has not been removed.

Given an array `stones` of length `n` where `stones[i] = [x_i, y_i]` represents the location of the `i_th` stone, return _the largest possible number of stones that can be removed_.

同一排或同一行有石頭才可以移除

&#x20;

**Example 1:**

<pre><code><strong>Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
</strong><strong>Output: 5
</strong><strong>Explanation: One way to remove 5 stones is as follows:
</strong>1. Remove stone [2,2] because it shares the same row as [2,1].
2. Remove stone [2,1] because it shares the same column as [0,1].
3. Remove stone [1,2] because it shares the same row as [1,0].
4. Remove stone [1,0] because it shares the same column as [0,0].
5. Remove stone [0,1] because it shares the same row as [0,0].
Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.
</code></pre>

**Example 2:**

<pre><code><strong>Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
</strong><strong>Output: 3
</strong><strong>Explanation: One way to make 3 moves is as follows:
</strong>1. Remove stone [2,2] because it shares the same row as [2,0].
2. Remove stone [2,0] because it shares the same column as [0,0].
3. Remove stone [0,2] because it shares the same row as [0,0].
Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.
</code></pre>

**Example 3:**

<pre><code><strong>Input: stones = [[0,0]]
</strong><strong>Output: 0
</strong><strong>Explanation: [0,0] is the only stone on the plane, so you cannot remove it.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= stones.length <= 1000`
* `0 <= x_i, y_i <= 10^4`
* No two stones are at the same coordinate point. （同一個位置只會有一顆）



### Union Find

題目是看得懂但看不懂這是怎麼解題的ＱＱ

下面是網友的解法，存參 [https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/solutions/5705563/dsu-approach-with-tc-o-n-n-beats-100-in-all-languages](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/solutions/5705563/dsu-approach-with-tc-o-n-n-beats-100-in-all-languages)

```typescript
function removeStones(stones: number[][]): number {
    // 初始化連通分量的計數
    let connectedComponentCount = 0;

    // 初始化代表元集合（最多20003個元素），每個位置初始為0
    const setRepresentatives = new Array<number>(20003).fill(0);

    // 遍歷每顆石頭，將其所在的行與列進行合併
    for (const stone of stones) {
        // `stone[0] + 1` 表示行，`stone[1] + 10002` 表示列
        // 這樣做是為了避免行和列之間的衝突
        mergeComponents(stone[0] + 1, stone[1] + 10002, setRepresentatives);
    }

    // 最大移除石頭的數量 = 總石頭數量 - 連通分量的數量
    return stones.length - connectedComponentCount;

    // 找到元素的代表元
    function findRepresentative(element: number, setRepresentatives: number[]): number {
        // 如果該元素還未被初始化（即為0），則將其自身設為代表元
        if (setRepresentatives[element] === 0) {
            setRepresentatives[element] = element;
            // 新增一個連通分量
            connectedComponentCount++;
        }
        // 遞迴尋找代表元，並壓縮路徑
        return setRepresentatives[element] === element 
            ? element 
            : (setRepresentatives[element] = findRepresentative(setRepresentatives[element], setRepresentatives));
    }

    // 合併兩個元素的集合
    function mergeComponents(elementA: number, elementB: number, setRepresentatives: number[]) {
        // 找到兩個元素的代表元
        const repA = findRepresentative(elementA, setRepresentatives);
        const repB = findRepresentative(elementB, setRepresentatives);
        // 如果兩者的代表元不同，則合併兩個集合
        if (repA !== repB) {
            setRepresentatives[repB] = repA;
            // 合併後，連通分量減少一個
            connectedComponentCount--;
        }
    }
}
```



chatGPT 的解釋

1. 初始化 connectedComponentCount：這個變數用來計算連通分量的數量。
2. setRepresentatives 初始化：一個長度為20003的數組來儲存每個元素的代表元（即該元素所在集合的「根」）。初始值為0，表示該元素未被設定。
3. mergeComponents 函數：這個函數用來合併兩個集合。對於每顆石頭，將它所在的行與列視為兩個元素，並將它們合併到同一個集合中。如果兩個元素的代表元不同，則將其中一個元素的代表元設為另一個元素的代表元，並減少連通分量的數量。
4. findRepresentative 函數：這個函數用來找到元素的代表元。如果元素尚未設定代表元，則將它設為自身的代表元，並增加連通分量的數量。當元素已經有代表元時，使用路徑壓縮技術加速查找。
5. 計算最終結果：可以移除的最大石頭數量等於總石頭數減去連通分量的數量。

\
這個解法通過將行和列分別編號，使用並查集來判斷哪些石頭可以合併成連通分量，從而確定最多可以移除多少顆石頭。

