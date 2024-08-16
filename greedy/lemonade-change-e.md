# Lemonade Change (E)

[860. Lemonade Change](https://leetcode.com/problems/lemonade-change/)



At a lemonade stand, each lemonade costs `$5`. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a `$5`, `$10`, or `$20` bill. You must provide the correct change to each customer so that the net transaction is that the customer pays `$5`.

Note that you do not have any change in hand at first.

Given an integer array `bills` where `bills[i]` is the bill the `i_th` customer pays, return `true` _if you can provide every customer with the correct change, or_ `false` _otherwise_.



檢查是否有足夠的零錢來找錢，用賺的來付零錢

一次只會買一杯

有 5, 10, 20 這三種，每次都會付對應的幣種&#x20;

回傳是否有足夠的零錢



**Example 1:**

<pre><code><strong>Input: bills = [5,5,5,10,20]
</strong><strong>Output: true
</strong><strong>Explanation: 
</strong>From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.
</code></pre>

**Example 2:**

<pre><code><strong>Input: bills = [5,5,10,10,20]
</strong><strong>Output: false
</strong><strong>Explanation: 
</strong>From the first two customers in order, we collect two $5 bills.
For the next two customers in order, we collect a $10 bill and give back a $5 bill.
For the last customer, we can not give the change of $15 back because we only have two $10 bills.
Since not every customer received the correct change, the answer is false.
</code></pre>

&#x20;

**Constraints:**

* `1 <= bills.length <= 10^5`
* `bills[i]` is either `5`, `10`, or `20`.



### 找錢的時候優先使用幣值大的

```typescript
function lemonadeChange(bills: number[]): boolean {
    // 紀錄當前有多少錢
    let changes: { [key: number]: number } = {
        5: 0,
        10: 0
    };

    for (const bill of bills) {
        // 收錢
        changes[bill]++

        // 找錢
        if (bill === 10) {
            //檢查五元是否足夠
            if (changes[5] === 0) return false
            changes[5]--
        } else if (bill === 20) {
            // 10*1 +5*1
            if (changes[10] >= 1 && changes[5] >= 1) {
                changes[10]--
                changes[5]--

            } else if (changes[5] >= 3) {
                // 5*3
                changes[5] -= 3
            } else {
                return false
            }
        }
    }
    return true
};
```
