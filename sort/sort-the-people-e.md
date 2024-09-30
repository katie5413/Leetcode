# Sort the People (E)

[2418. Sort the People](https://leetcode.com/problems/sort-the-people/)



You are given an array of strings `names`, and an array `heights` that consists of **distinct** positive integers. Both arrays are of length `n`.

For each index `i`, `names[i]` and `heights[i]` denote the name and height of the `i_th` person.

Return `names` _sorted in **descending** order by the people's heights_.

&#x20;

**Example 1:**

<pre><code><strong>Input: names = ["Mary","John","Emma"], heights = [180,165,170]
</strong><strong>Output: ["Mary","Emma","John"]
</strong><strong>Explanation: Mary is the tallest, followed by Emma and John.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: names = ["Alice","Bob","Bob"], heights = [155,185,150]
</strong><strong>Output: ["Bob","Alice","Bob"]
</strong><strong>Explanation: The first Bob is the tallest, followed by Alice and the second Bob.
</strong></code></pre>

&#x20;

**Constraints:**

* `n == names.length == heights.length`
* `1 <= n <= 10^3`
* `1 <= names[i].length <= 20`
* `1 <= heights[i] <= 10^5`
* `names[i]` consists of lower and upper case English letters.
* All the values of `heights` are distinct.



### Map + Sort

Note. desc = b - a

```typescript
type Person = {
    name: string
    height: number
}

function sortPeople(names: string[], heights: number[]): string[] {
    const people: Person[] = names.map((name, index) => ({
        name: name,
        height: heights[index]
    }));

    people.sort((a, b) => b.height - a.height);

    return people.map(person => person.name);
}
```



### 濃縮成一行

```typescript
function sortPeople(names: string[], heights: number[]): string[] {
    return names.map((name, index) => ({ name, height: heights[index]}))
        .sort((a, b) => b.height - a.height)
        .map((human) => human.name);
};
```
