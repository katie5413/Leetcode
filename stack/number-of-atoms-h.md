# Number of Atoms (H)

Given a string `formula` representing a chemical formula, return _the count of each atom_.

The atomic element always starts with an uppercase character, then zero or more lowercase letters, representing the name.

One or more digits representing that element's count may follow if the count is greater than `1`. If the count is `1`, no digits will follow.

* For example, `"H2O"` and `"H2O2"` are possible, but `"H1O2"` is impossible.

Two formulas are concatenated together to produce another formula.

* For example, `"H2O2He3Mg4"` is also a formula.

A formula placed in parentheses, and a count (optionally added) is also a formula.

* For example, `"(H2O2)"` and `"(H2O2)3"` are formulas.

Return the count of all elements as a string in the following form: the first name (in sorted order), followed by its count (if that count is more than `1`), followed by the second name (in sorted order), followed by its count (if that count is more than `1`), and so on.

The test cases are generated so that all the values in the output fit in a **32-bit** integer.

&#x20;

**Example 1:**

<pre><code><strong>Input: formula = "H2O"
</strong><strong>Output: "H2O"
</strong><strong>Explanation: The count of elements are {'H': 2, 'O': 1}.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: formula = "Mg(OH)2"
</strong><strong>Output: "H2MgO2"
</strong><strong>Explanation: The count of elements are {'H': 2, 'Mg': 1, 'O': 2}.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: formula = "K4(ON(SO3)2)2"
</strong><strong>Output: "K4N2O14S4"
</strong><strong>Explanation: The count of elements are {'K': 4, 'N': 2, 'O': 14, 'S': 4}.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= formula.length <= 1000`
* `formula` consists of English letters, digits, `'('`, and `')'`.
* `formula` is always valid.



```typescript
function countOfAtoms(formula: string): string {
    let i = 0; // 用於追蹤當前字符位置

    function parse(): { [key: string]: number } {
        const stack: { [key: string]: number }[] = [{}]; // 堆疊初始化，開始一個新的範圍
        while (i < formula.length) {
            if (formula[i] === '(') {
                i++;
                stack.push({}); // 新的範圍推入堆疊
            } else if (formula[i] === ')') {
                i++;
                const top = stack.pop()!; // 彈出頂部範圍
                let num = '';
                while (i < formula.length && formula[i] >= '0' && formula[i] <= '9') {
                    num += formula[i++];
                }
                const multiplicity = parseInt(num || '1', 10); // 解析後面的數字
                for (const [element, count] of Object.entries(top)) {
                    stack[stack.length - 1][element] = (stack[stack.length - 1][element] || 0) + count * multiplicity;
                }
            } else {
                let start = i++;
                while (i < formula.length && formula[i] >= 'a' && formula[i] <= 'z') {
                    i++;
                }
                const element = formula.slice(start, i); // 讀取元素名稱
                let num = '';
                while (i < formula.length && formula[i] >= '0' && formula[i] <= '9') {
                    num += formula[i++];
                }
                const multiplicity = parseInt(num || '1', 10); // 解析數字
                stack[stack.length - 1][element] = (stack[stack.length - 1][element] || 0) + multiplicity;
            }
        }
        return stack[0]; // 返回最終結果
    }

    const counts = parse(); // 解析公式
    return Object.entries(counts)
        .sort(([a], [b]) => a.localeCompare(b)) // 按字母順序排序
        .map(([element, count]) => element + (count > 1 ? count.toString() : '')) // 格式化輸出
        .join('');
}
```



#### 程式碼概要

這段程式碼的目的是解析一個化學公式，計算並返回每個元素的數量，並以指定的格式輸出。

#### 函數 `countOfAtoms`

這個函數包含一個內部遞歸函數 `parse`，用來解析化學公式，並返回一個包含元素和其數量的物件。

#### 變數 `i`

這是一個指針，用來追蹤當前處理到的字符位置。

#### 函數 `parse`

這是遞歸解析函數，負責解析整個化學公式。

**`stack`**

這是一個堆疊，元素為物件，用來追蹤當前範圍內的元素和數量。每當遇到括號時會用到堆疊。

**主要解析邏輯**

1. **處理左括號 `(`**
   * 當遇到 `(` 時，表示開始一個新的範圍，因此將一個新的空物件推入堆疊。
2. **處理右括號 `)`**
   * 當遇到 `)` 時，表示結束一個範圍。從堆疊中彈出頂部的範圍，並計算後面的數字（如果有的話），將這個範圍內的元素數量乘以這個數字，然後合併到當前範圍中。
3. **處理元素**
   * 當遇到元素時（以大寫字母開頭，後面可能跟著小寫字母），讀取元素名稱。然後讀取後面的數字（如果有的話），並更新當前範圍內的元素數量。

#### 返回解析結果

`parse` 函數最終返回堆疊底部的物件，這個物件包含了所有元素及其最終的數量。

#### 格式化輸出

最後，將解析結果按字母順序排序，並格式化成所需的字符串形式。格式化過程中，如果某個元素的數量大於 1，會在元素名稱後加上數量。
