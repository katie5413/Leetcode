# 2 Keys Keyboard (M)

[650. 2 Keys Keyboard](https://leetcode.com/problems/2-keys-keyboard/)



There is only one character `'A'` on the screen of a notepad. You can perform one of two operations on this notepad for each step:

* Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).
* Paste: You can paste the characters which are copied last time.

Given an integer `n`, return _the minimum number of operations to get the character_ `'A'` _exactly_ `n` _times on the screen_.

&#x20;

可以透過複製所有字元並黏貼，或是反覆黏貼已經複製的字元。遞迴函式會探索這兩個選項：黏貼當前已複製的值，或複製整個當前的字串並黏貼，目的是找到步數最少的路徑。



**Example 1:**

<pre><code><strong>Input: n = 3
</strong><strong>Output: 3
</strong><strong>Explanation: Initially, we have one character 'A'.
</strong>In step 1, we use Copy All operation.
In step 2, we use Paste operation to get 'AA'.
In step 3, we use Paste operation to get 'AAA'.
</code></pre>

**Example 2:**

<pre><code><strong>Input: n = 1
</strong><strong>Output: 0
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 1000`



### 到達 n 所需的最小步數是其質因數的總和

#### Time complexity : $$O(n(1/2))$$ <a href="#time-complexity--on12" id="time-complexity--on12"></a>

#### Space complexity : $$O(1)$$ <a href="#space-complexity--o1" id="space-complexity--o1"></a>

\


```typescript
function minSteps(n: number): number {
    // 初始化步數計數器
    let steps: number = 0;

    // 從 2 開始，逐一檢查每個因數
    for (let i = 2; i <= n; i++) {
        // 如果 n 能被當前的因數 i 整除
        while (n % i === 0) {
            // 將因數 i 加到步數中，表示需要 i 步來達到當前的狀態
            steps += i;
            // 將 n 除以 i，繼續檢查剩下的數字
            n /= i;
        }
    }
    // 回傳最終的步數
    return steps;
}
```



<figure><img src="../.gitbook/assets/截圖 2024-08-19 晚上10.07.17.png" alt=""><figcaption></figcaption></figure>

### 模擬實際操作情況

```typescript
function minSteps(n: number): number {
    let screen = 1;
    let clipboard = 0;
    let countActions = 0;
    if(screen === n) return 0;
    function copy(): void {
        clipboard = screen; 
        countActions++;
    };
    function paste(): void {
        screen+=clipboard; 
        countActions++;
    };
    copy();
    while(screen < n) {
        paste();
        if(n%(screen) === 0 && screen+screen <= n) {
            copy();
        }
    }
    return countActions;
};
```

