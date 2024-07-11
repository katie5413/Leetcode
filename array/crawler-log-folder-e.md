# Crawler Log Folder (E)

The Leetcode file system keeps a log each time some user performs a _change folder_ operation.

The operations are described below:

* `"../"` : Move to the parent folder of the current folder. (If you are already in the main folder, **remain in the same folder**).
* `"./"` : Remain in the same folder.
* `"x/"` : Move to the child folder named `x` (This folder is **guaranteed to always exist**).

You are given a list of strings `logs` where `logs[i]` is the operation performed by the user at the `ith` step.

The file system starts in the main folder, then the operations in `logs` are performed.

Return _the minimum number of operations needed to go back to the main folder after the change folder operations._

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/09/sample\_11\_1957.png)

<pre><code><strong>Input: logs = ["d1/","d2/","../","d21/","./"]
</strong><strong>Output: 2
</strong><strong>Explanation: Use this change folder operation "../" 2 times and go back to the main folder.
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/09/09/sample\_22\_1957.png)

<pre><code><strong>Input: logs = ["d1/","d2/","./","d3/","../","d31/"]
</strong><strong>Output: 3
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: logs = ["d1/","../","../","../"]
</strong><strong>Output: 0
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= logs.length <= 103`
* `2 <= logs[i].length <= 10`
* `logs[i]` contains lowercase English letters, digits, `'.'`, and `'/'`.
* `logs[i]` follows the format described in the statement.
* Folder names consist of lowercase English letters and digits.



```typescript
function minOperations(logs: string[]): number {
    let depth = 0;

    for (const log of logs) {
        if (log === "../") {
            if (depth > 0) {
                depth--;
            }
        } else if (log !== "./") {
            depth++;
        }
    }

    return depth;
}

```

* 初始化 `depth` 為 0，表示目前在主目錄。
* 遍歷每個操作：
  * 如果操作是 `"../"`，且 `depth` 大於 0，則將 `depth` 減 1，表示返回上一層目錄。
  * 如果操作是 `"./"`，則不變，表示留在當前目錄。
  * 否則，表示進入一個子目錄，將 `depth` 加 1。
* 最後返回 `depth`，即為返回主目錄所需的最少操作次數。

### Reduce

```typescript
function minOperations(logs: string[]): number {
    return logs.reduce((a, c) => {
        if (c === '../') return Math.max(0, a - 1)
        if (c === './') return a
        return a + 1
    }, 0)
};
```
