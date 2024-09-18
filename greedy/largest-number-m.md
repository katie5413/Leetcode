# Largest Number (M)

[179. Largest Number](https://leetcode.com/problems/largest-number/)



Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [10,2]
</strong><strong>Output: "210"
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [3,30,34,5,9]
</strong><strong>Output: "9534330"
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 100`
* `0 <= nums[i] <= 10^9`



### Sort

```typescript
function largestNumber(nums: number[]): string {
    nums.sort((a, b) => `${a}${b}` < `${b}${a}` ? 1 : -1)

    const joined = nums.join('');
    return parseInt(joined, 10) === 0 ? '0' : joined;
};
```

### map+localeCompare

Ref [https://leetcode.com/problems/largest-number/solutions/5785445/best-solution-simplified-easy-approach-java-c-python](https://leetcode.com/problems/largest-number/solutions/5785445/best-solution-simplified-easy-approach-java-c-python)

```typescript
function largestNumber(nums: number[]): string {
    // 將數字陣列轉換為字串陣列
    const array = nums.map(String);
    
    // 自訂排序規則，依據兩個字串組合後的結果來進行比較
    // 如果 b + a > a + b，則 b 應該排在 a 的前面
    array.sort((a, b) => (b + a).localeCompare(a + b));
    
    // 如果排序後的第一個字元是 "0"，說明所有數字都是 0，直接返回 "0"
    const joined = array.join('');
    // 將排序後的字串陣列合併成一個字串並返回
    return parseInt(joined, 10) === 0 ? '0' : joined;

};
```

localeCompare 是 JavaScript 中用來比較兩個字串的方法，根據指定的語言環境（locale）來確定它們的排列順序。它返回三個可能的結果：\


* \-1: 表示第一個字串應該排在第二個字串之前。
* 0: 表示兩個字串相等。
* 1: 表示第一個字串應該排在第二個字串之後。
