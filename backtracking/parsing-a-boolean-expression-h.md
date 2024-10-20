# Parsing A Boolean Expression (H)

[1106. Parsing A Boolean Expression](https://leetcode.com/problems/parsing-a-boolean-expression/)



A **boolean expression** is an expression that evaluates to either `true` or `false`. It can be in one of the following shapes:

解析布林表達式（Boolean Expression），並根據邏輯運算符計算結果。該表達式由邏輯運算符（`!`、`|`、`&`）以及布林值（`t` 表示 `true`，`f` 表示 `false`）組成

* `'t'` that evaluates to `true`.
* `'f'` that evaluates to `false`.
* `'!(subExpr)'` that evaluates to **the logical NOT** of the inner expression `subExpr`.
* `'&(subExpr1, subExpr2, ..., subExprn)'` that evaluates to **the logical AND** of the inner expressions `subExpr1, subExpr2, ..., subExprn` where `n >= 1`.
* `'|(subExpr1, subExpr2, ..., subExprn)'` that evaluates to **the logical OR** of the inner expressions `subExpr1, subExpr2, ..., subExprn` where `n >= 1`.

表達式可以包含以下幾種操作：

* `!`：NOT 操作，將接下來的布林值取反。
* `|`：OR 操作，表示邏輯或操作，當任何子表達式為 `true` 時返回 `true`。
* `&`：AND 操作，表示邏輯與操作，當所有子表達式為 `true` 時返回 `true`。
* `t`：表示布林值 `true`。
* `f`：表示布林值 `false`。



Given a string `expression` that represents a **boolean expression**, return _the evaluation of that expression_.

It is **guaranteed** that the given expression is valid and follows the given rules.

&#x20;

**Example 1:**

<pre><code><strong>Input: expression = "&#x26;(|(f))"
</strong><strong>Output: false
</strong><strong>Explanation: 
</strong>First, evaluate |(f) --> f. The expression is now "&#x26;(f)".
Then, evaluate &#x26;(f) --> f. The expression is now "f".
Finally, return false.
</code></pre>

**Example 2:**

<pre><code><strong>Input: expression = "|(f,f,f,t)"
</strong><strong>Output: true
</strong><strong>Explanation: The evaluation of (false OR false OR false OR true) is true.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: expression = "!(&#x26;(f,t))"
</strong><strong>Output: true
</strong><strong>Explanation: 
</strong>First, evaluate &#x26;(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
Then, evaluate !(f) --> NOT false --> true. We return true.
</code></pre>

&#x20;

**Constraints:**

* `1 <= expression.length <= 2 * 10^4`
* expression\[i] is one following characters: `'('`, `')'`, `'&'`, `'|'`, `'!'`, `'t'`, `'f'`, and `','`.



### Recursive DFS

* **時間複雜度**：`O(n)`，其中 `n` 是輸入表達式的長度，因為需要遍歷整個字串進行解析。
* **空間複雜度**：`O(n)`，遞迴深度取決於嵌套層數。

Ref. [https://leetcode.com/problems/parsing-a-boolean-expression/solutions/5939327/beats-100-o-n-log-n-working-20-10-2024](https://leetcode.com/problems/parsing-a-boolean-expression/solutions/5939327/beats-100-o-n-log-n-working-20-10-2024)

#### 解法思路：

1. **遞迴解析**：使用深度優先搜尋（DFS）來處理嵌套的子表達式。每次遇到一個運算符時，會進一步解析後續的子表達式。
2. **運算符處理**：
   * 遇到 `!` 時，將接下來的子表達式結果取反。
   * 遇到 `|` 時，解析後續的子表達式，並檢查是否有 `true` 值。
   * 遇到 `&` 時，解析後續的子表達式，並確保所有結果都為 `true`。
3. **布林值處理**：遇到 `t` 或 `f` 直接返回對應的布林值。
4. **括號處理**：遇到 `)` 時表示當前子表達式結束，返回結果。

```typescript
function parseBoolExpr(expression: string): boolean {
    // 儲存輸入的布林表達式
    const expr = expression;
    // 表達式的長度
    const n = expr.length;
    // 初始化一個指標來遍歷表達式
    let i = 0;

    // 定義遞迴的深度優先搜尋函數
    const dfs = (): boolean[] => {
        // 用來儲存子表達式的布林結果
        let res: boolean[] = [];

        // 開始遍歷表達式
        while (i < n) {
            // 取得當前字符，並移動指標
            const c = expr[i++];

            // 如果遇到結束括號，則結束這個子表達式
            if (c === ')') {
                break;
            }

            // 處理不同的運算符和布林值
            if (c === '!') {
                // NOT 運算符：將下一個子表達式的結果取反
                res.push(!dfs()[0]);
            } else if (c === '|') {
                // OR 運算符：只要有一個子表達式為 true，結果為 true
                res.push(dfs().some(v => v));
            } else if (c === '&') {
                // AND 運算符：只有當所有子表達式為 true，結果才為 true
                res.push(dfs().every(v => v));
            } else if (c === 't') {
                // 代表 true 的值
                res.push(true);
            } else if (c === 'f') {
                // 代表 false 的值
                res.push(false);
            }
            // 注意：開頭括號 '(' 的情況已由遞迴處理
        }

        // 返回當前解析出的布林結果
        return res;
    };

    // 開始解析並返回最終結果
    // 只需要返回結果陣列的第一個元素
    return dfs()[0];
};

```

<figure><img src="../.gitbook/assets/截圖 2024-10-20 晚上11.42.08.png" alt=""><figcaption></figcaption></figure>

