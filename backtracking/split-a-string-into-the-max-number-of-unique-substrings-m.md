# Split a String Into the Max Number of Unique Substrings (M)

[1593. Split a String Into the Max Number of Unique Substrings](https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings/)



Given a string `s`, return _the maximum number of unique substrings that the given string can be split into_.

You can split string `s` into any list of **non-empty substrings**, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are **unique**.

A **substring** is a contiguous sequence of characters within a string.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "ababccc"
</strong><strong>Output: 5
</strong><strong>Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "aba"
</strong><strong>Output: 2
</strong><strong>Explanation: One way to split maximally is ['a', 'ba'].
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: s = "aa"
</strong><strong>Output: 1
</strong><strong>Explanation: It is impossible to split the string any further.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 16`
* `s` contains only lower case English letters.



### Backtracking

#### 時間複雜度： O(2^n)，因為每個字串都可以被拆分為多種方式，導致存在指數級別的拆分組合。

空間複雜度： O(n)，因為 `strings` 集合最多可以包含 n 個子字串，n 是輸入字串的長度。

```typescript
function maxUniqueSplit(s: string): number {
  // 初始化結果為 1（最小可能的拆分數）
  let res = 1;
  // 建立一個 Set 來儲存唯一的子字串
  let strings = new Set<string>();

  // 定義一個遞迴搜尋函數
  function search(s: string) {
    // 如果當前字串不在 Set 中
    if (!strings.has(s)) {
      // 將字串加入 Set
      strings.add(s);
      // 更新結果為當前結果與 Set 的大小中的較大值
      res = Math.max(res, strings.size);
      // 移除字串（回溯）
      strings.delete(s);
    }

    // 遍歷所有可能的拆分位置
    for (let i = 1; i < s.length; i++) {
      // 取得從開頭到當前位置的子字串
      const sub = s.substring(0, i);
      // 如果子字串已經在 Set 中，跳過該次迭代
      if (strings.has(sub)) continue;
      // 將子字串加入 Set
      strings.add(sub);
      // 遞迴搜尋剩餘部分的字串
      search(s.substring(i));
      // 移除子字串（回溯）
      strings.delete(sub);
    }
  }

  // 從整個字串開始搜尋
  search(s);
  // 返回找到的最大唯一子字串數量
  return res;
};

```

<figure><img src="../.gitbook/assets/截圖 2024-10-21 晚上11.42.32.png" alt=""><figcaption></figcaption></figure>

#### 主要步驟：

1. **初始化結果和字串集合**：
   * `res` 用來記錄最大唯一子字串數，初始值為 1。
   * `strings` 是用來儲存已經選擇的唯一子字串的集合（`Set`）。
2. **定義遞迴函數 `search(s: string)`**：
   * 這個函數負責遞迴處理剩餘的字串，並且嘗試所有可能的拆分組合。
   * 主要邏輯如下：
     * 如果當前的字串 `s` 還沒有被包含在 `strings` 集合中，則將其加入集合。
     * 更新 `res` 為當前集合的大小與之前結果中的較大值，因為 `strings.size` 代表當前拆分的唯一子字串數。
     * **回溯**：在處理完這個子字串後，將其從集合中刪除，這樣可以繼續嘗試其他拆分方式。
3. **嘗試所有拆分位置**：
   * 從字串 `s` 的位置 1 開始，嘗試將字串劃分成兩部分。
   * 如果劃分出的子字串已經在 `strings` 中，則跳過該子字串，避免重複。
   * 對於每個新劃分出的子字串，進行遞迴，繼續對剩餘的部分進行同樣的處理。
4. **啟動遞迴**：
   * 最後，對整個字串 `s` 開始遞迴處理，找出最大唯一拆分。
5. **回傳結果**：
   * 回傳 `res`，即最大唯一子字串的數量。
