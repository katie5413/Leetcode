# Remove Sub-Folders from the Filesystem (M)

[1233. Remove Sub-Folders from the Filesystem](https://leetcode.com/problems/remove-sub-folders-from-the-filesystem/)



Given a list of folders `folder`, return _the folders after removing all **sub-folders** in those folders_. You may return the answer in **any order**.

If a `folder[i]` is located within another `folder[j]`, it is called a **sub-folder** of it. A sub-folder of `folder[j]` must start with `folder[j]`, followed by a `"/"`. For example, `"/a/b"` is a sub-folder of `"/a"`, but `"/b"` is not a sub-folder of `"/a/b/c"`.

The format of a path is one or more concatenated strings of the form: `'/'` followed by one or more lowercase English letters.

* For example, `"/leetcode"` and `"/leetcode/problems"` are valid paths while an empty string and `"/"` are not.

&#x20;

**Example 1:**

<pre><code><strong>Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
</strong><strong>Output: ["/a","/c/d","/c/f"]
</strong><strong>Explanation: Folders "/a/b" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: folder = ["/a","/a/b/c","/a/b/d"]
</strong><strong>Output: ["/a"]
</strong><strong>Explanation: Folders "/a/b/c" and "/a/b/d" will be removed because they are subfolders of "/a".
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
</strong><strong>Output: ["/a/b/c","/a/b/ca","/a/b/d"]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= folder.length <= 4 * 10^4`
* `2 <= folder[i].length <= 100`
* `folder[i]` contains only lowercase letters and `'/'`.
* `folder[i]` always starts with the character `'/'`.
* Each folder name is **unique**.





Ref. [https://leetcode.com/problems/remove-sub-folders-from-the-filesystem/solutions/5964641/explained-step-by-step-beats-100-working-25-10-2024](https://leetcode.com/problems/remove-sub-folders-from-the-filesystem/solutions/5964641/explained-step-by-step-beats-100-working-25-10-2024)

#### 程式說明

1. **排序**：首先將資料夾按照字典順序排序，這樣每個父資料夾會在它的子資料夾之前出現。
2. **初始化結果**：將排序後的第一個資料夾加入 `ans`，因為它不可能是任何其他資料夾的子資料夾。
3. **逐一檢查**：
   * 對於每個資料夾，將 `ans` 中最後一個加入的資料夾（父資料夾）加上 `/`，這樣可以簡化判斷。
   * 使用 `startsWith` 方法來檢查當前資料夾是否以 `lastFolder` 開頭，如果是則代表它是子資料夾，否則就將當前資料夾加入結果陣列中。

```typescript
function removeSubfolders(folder: string[]): string[] {
    // 先對資料夾進行字典排序，讓父資料夾位於其子資料夾之前
    folder.sort();
    
    // 初始化結果陣列，包含第一個資料夾
    const ans: string[] = [folder[0]];
    
    // 從索引 1 開始遍歷剩餘資料夾
    for (let i = 1; i < folder.length; i++) {
        // 取得最後加入結果的資料夾並加上斜線
        const lastFolder = ans[ans.length - 1] + '/';
        
        // 檢查當前資料夾是否不是以 lastFolder 開頭
        // 如果不是以 lastFolder 開頭，則不是子資料夾
        if (!folder[i].startsWith(lastFolder)) {
            ans.push(folder[i]);
        }
    }
   

```

<figure><img src="../.gitbook/assets/截圖 2024-10-25 晚上11.10.25.png" alt=""><figcaption></figcaption></figure>

