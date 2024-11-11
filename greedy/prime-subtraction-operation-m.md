# Prime Subtraction Operation (M)

[2601. Prime Subtraction Operation](https://leetcode.com/problems/prime-subtraction-operation/)



You are given a **0-indexed** integer array `nums` of length `n`.

You can perform the following operation as many times as you want:

* Pick an index `i` that you haven’t picked before, and pick a prime `p` **strictly less than** `nums[i]`, then subtract `p` from `nums[i]`.

Return _true if you can make `nums` a strictly increasing array using the above operation and false otherwise._

A **strictly increasing array** is an array whose each element is strictly greater than its preceding element.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [4,9,6,10]
</strong><strong>Output: true
</strong><strong>Explanation: In the first operation: Pick i = 0 and p = 3, and then subtract 3 from nums[0], so that nums becomes [1,9,6,10].
</strong>In the second operation: i = 1, p = 7, subtract 7 from nums[1], so nums becomes equal to [1,2,6,10].
After the second operation, nums is sorted in strictly increasing order, so the answer is true.
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [6,8,11,12]
</strong><strong>Output: true
</strong><strong>Explanation: Initially nums is sorted in strictly increasing order, so we don't need to make any operations.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [5,8,3]
</strong><strong>Output: false
</strong><strong>Explanation: It can be proven that there is no way to perform operations to make nums sorted in strictly increasing order, so the answer is false.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 1000`
* `1 <= nums[i] <= 1000`
* `nums.length == n`



Ref. [https://leetcode.com/problems/prime-subtraction-operation/solutions/6031906/beats-100-video-best-explaining-greedy-sieve-of-eratosthenes-atkin-working-11-11-2024](https://leetcode.com/problems/prime-subtraction-operation/solutions/6031906/beats-100-video-best-explaining-greedy-sieve-of-eratosthenes-atkin-working-11-11-2024)

```typescript
function primeSubOperation(nums: number[]): boolean {
    const getMaxElement = (nums: number[]): number => {
        let max = -1;
        for (const num of nums) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    };

    const fill = (arr: boolean[], value: boolean): void => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = value;
        }
    };

    const maxElement = getMaxElement(nums);

    // Create Sieve of Eratosthenes array
    const sieve: boolean[] = new Array(maxElement + 1);
    fill(sieve, true);
    sieve[1] = false;
    for (let i = 2; i <= Math.sqrt(maxElement + 1); i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= maxElement; j += i) {
                sieve[j] = false;
            }
        }
    }

    // Check if array can be made strictly increasing
    let currValue = 1;
    let i = 0;
    while (i < nums.length) {
        const difference = nums[i] - currValue;

        if (difference < 0) {
            return false;
        }

        if (sieve[difference] === true || difference === 0) {
            i++;
            currValue++;
        } else {
            currValue++;
        }
    }
    return true;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-11-11 晚上11.56.54.png" alt=""><figcaption></figcaption></figure>

