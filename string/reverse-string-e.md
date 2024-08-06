# Reverse String (E)

[344. Reverse String](https://leetcode.com/problems/reverse-string/)



把字串反轉

Write a function that reverses a string. The input string is given as an array of characters `s`.

You must do this by modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place\_algorithm) with `O(1)` extra memory.

**Example 1:**

```
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

```

**Example 2:**

```
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

```

**Constraints:**

* `1 <= s.length <= 10^5`
* `s[i]` is a [printable ascii character](https://en.wikipedia.org/wiki/ASCII#Printable\_characters).

### 用內建的函式偷懶

```jsx
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    s.reverse()
};
```



### Two Pointer + 語法糖

```typescript
function reverseString(s: string[]): void {
    let left: number = 0;
    let right: number = s.length - 1;
    
    while (left < right) {
        // Swap the characters at left and right indices
        [s[left], s[right]] = [s[right], s[left]];
        // Move the pointers towards the center
        left++;
        right--;
    }
}
```
