# Compare Version Numbers (M)

[165. Compare Version Numbers](https://leetcode.com/problems/compare-version-numbers/)



Given two **version strings**, `version1` and `version2`, compare them. A version string consists of **revisions** separated by dots `'.'`. The **value of the revision** is its **integer conversion** ignoring leading zeros.

To compare version strings, compare their revision values in **left-to-right order**. If one of the version strings has fewer revisions, treat the missing revision values as `0`.

Return the following:

* If `version1 < version2`, return -1.
* If `version1 > version2`, return 1.
* Otherwise, return 0.

&#x20;

**Example 1:**

**Input:** version1 = "1.2", version2 = "1.10"

**Output:** -1

**Explanation:**

version1's second revision is "2" and version2's second revision is "10": 2 < 10, so version1 < version2.

**用點來分組，這裡很容易漏掉**



**Example 2:**

**Input:** version1 = "1.01", version2 = "1.001"

**Output:** 0

**Explanation:**

Ignoring leading zeroes, both "01" and "001" represent the same integer "1".

**Example 3:**

**Input:** version1 = "1.0", version2 = "1.0.0.0"

**Output:** 0

**Explanation:**

version1 has less revisions, which means every missing revision are treated as "0".

&#x20;

**Constraints:**

* `1 <= version1.length, version2.length <= 500`
* `version1` and `version2` only contain digits and `'.'`.
* `version1` and `version2` **are valid version numbers**.
* All the given revisions in `version1` and `version2` can be stored in a **32-bit integer**.



### Two Pointer

用兩個指針來記錄當前兩組數字的位置

```typescript
function compareVersion(version1: string, version2: string): number {
    let v1 = 0
    let v2 = 0
    // 用 . 作為分割標準來分組
    const s1: string[] = version1.split('.')
    const s2: string[] = version2.split('.')

    while (v1 < s1.length || v2 < s2.length) {
        // 避免一長一短指標超過
        const n1 = !s1[v1] ? 0 : parseInt(s1[v1], 10)
        const n2 = !s2[v2] ? 0 : parseInt(s2[v2], 10)

        if (n1 > n2) {
            return 1
        } else if (n1 < n2) {
            return -1
        }

        v1++
        v2++
    }

    return 0
};
```
