# Sentence Similarity III (M)

[1813. Sentence Similarity III](https://leetcode.com/problems/sentence-similarity-iii/)



You are given two strings `sentence1` and `sentence2`, each representing a **sentence** composed of words. A sentence is a list of **words** that are separated by a **single** space with no leading or trailing spaces. Each word consists of only uppercase and lowercase English characters.

Two sentences `s1` and `s2` are considered **similar** if it is possible to insert an arbitrary sentence (_possibly empty_) inside one of these sentences such that the two sentences become equal. **Note** that the inserted sentence must be separated from existing words by spaces.

For example,

* `s1 = "Hello Jane"` and `s2 = "Hello my name is Jane"` can be made equal by inserting `"my name is"` between `"Hello"` and `"Jane"` in s1.
* `s1 = "Frog cool"` and `s2 = "Frogs are cool"` are **not** similar, since although there is a sentence `"s are"` inserted into `s1`, it is not separated from `"Frog"` by a space.

Given two sentences `sentence1` and `sentence2`, return **true** if `sentence1` and `sentence2` are **similar**. Otherwise, return **false**.

&#x20;

**Example 1:**

**Input:** sentence1 = "My name is Haley", sentence2 = "My Haley"

**Output:** true

**Explanation:**

`sentence2` can be turned to `sentence1` by inserting "name is" between "My" and "Haley".

**Example 2:**

**Input:** sentence1 = "of", sentence2 = "A lot of words"

**Output:** false

**Explanation:**

No single sentence can be inserted inside one of the sentences to make it equal to the other.

**Example 3:**

**Input:** sentence1 = "Eating right now", sentence2 = "Eating"

**Output:** true

**Explanation:**

`sentence2` can be turned to `sentence1` by inserting "right now" at the end of the sentence.

&#x20;

**Constraints:**

* `1 <= sentence1.length, sentence2.length <= 100`
* `sentence1` and `sentence2` consist of lowercase and uppercase English letters and spaces.
* The words in `sentence1` and `sentence2` are separated by a single space.



Ref. [https://leetcode.com/problems/sentence-similarity-iii/solutions/4418563/beats-92-o-n-docs-comments](https://leetcode.com/problems/sentence-similarity-iii/solutions/4418563/beats-92-o-n-docs-comments)

```typescript
function areSentencesSimilar(sentence1: string, sentence2: string): boolean {
    // 將句子轉換成單詞陣列
    const arr1 = sentence1.split(" ");
    const arr2 = sentence2.split(" ");

    let commonPreLength = 0;  // 計算頭部相同的單詞數量
    let commonSuffixLength = 0;  // 計算尾部相同的單詞數量

    // 遍歷兩個陣列，計算頭部相同的單詞數量
    for (let i = 0;; i++) {
        const [element1, element2] = [arr1[i], arr2[i]];
        // 如果任一個陣列已經沒有元素，說明頭部已經匹配完成，返回 true
        if (element1 == null || element2 == null) return true;
        
        // 如果兩個陣列對應位置的單詞相同，計算頭部匹配長度
        if (element1 === element2) commonPreLength++;
        else break;  // 如果找到不相同的單詞，結束頭部比較
    }

    // 遍歷兩個陣列，計算尾部相同的單詞數量
    for (let i = 0;; i++) {
        const [element1, element2] = [arr1[arr1.length - 1 - i], arr2[arr2.length - 1 - i]];
        // 如果任一個陣列已經沒有元素，說明尾部已經匹配完成，返回 true
        if (element1 == null || element2 == null) return true;
        
        // 如果尾部單詞相同，計算尾部匹配長度
        if (element1 === element2) commonSuffixLength++;
        else break;  // 如果找到不相同的單詞，結束尾部比較
    }

    // 總共相同的頭部和尾部單詞數量
    const equalOuter = commonPreLength + commonSuffixLength;

    // 如果相同的單詞總數大於等於任一個句子的長度，表示句子相似，返回 true
    if (equalOuter >= arr1.length || equalOuter >= arr2.length) return true;

    // 否則句子不相似，返回 false
    return false;
}

```



<figure><img src="../.gitbook/assets/截圖 2024-10-06 晚上11.48.01.png" alt=""><figcaption></figcaption></figure>



