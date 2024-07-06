# Pass the Pillow

There are `n` people standing in a line labeled from `1` to `n`. The first person in the line is holding a pillow initially. Every second, the person holding the pillow passes it to the next person standing in the line. Once the pillow reaches the end of the line, the direction changes, and people continue passing the pillow in the opposite direction.

* For example, once the pillow reaches the `nth` person they pass it to the `n - 1th` person, then to the `n - 2th` person and so on.

Given the two positive integers `n` and `time`, return _the index of the person holding the pillow after_ `time` _seconds_.

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 4, time = 5
</strong><strong>Output: 2
</strong><strong>Explanation: People pass the pillow in the following way: 1 -> 2 -> 3 -> 4 -> 3 -> 2.
</strong>After five seconds, the 2nd person is holding the pillow.
</code></pre>

**Example 2:**

<pre><code><strong>Input: n = 3, time = 2
</strong><strong>Output: 3
</strong><strong>Explanation: People pass the pillow in the following way: 1 -> 2 -> 3.
</strong>After two seconds, the 3rd person is holding the pillow.
</code></pre>

&#x20;

**Constraints:**

* `2 <= n <= 1000`
* `1 <= time <= 1000`

### 一個輪迴為一組

```typescript
function passThePillow(n: number, time: number): number {
    const gap = 2 * (n - 1);
    const modTime = time % gap;

    if (modTime < n) {
        return modTime + 1;
    } else {
        return 2 * n - modTime - 1;
    }
}
```

* 枕頭在一個完整的來回中（即從第一個人傳到最後一個人，再從最後一個人傳回第一個人），總共會傳遞 2×(n−1) 次。設這個值為 `gap`。
* 當 `time` 超過 `gap` 時，只需要考慮 `time % gap`，這樣就能知道在一個來回內的時間位置。
* 接下來，根據 `time % gap` 的值來計算當前持有枕頭的人的位置：
  * 如果 `time % gap` 小於 `n`，則枕頭還在前進，位置是 `time % gap + 1`。
  * 否則，枕頭在返回，位置是 `n - (time % gap - n + 1)`。

### 類似的解法

```typescript
function passThePillow(n: number, time: number): number {
    const gap = 2 * (n - 1);
    const modTime = time % gap;

    return n - (Math.abs(n - 1 - modTime));
}
```



### 用迴圈一個一個數

效能較差，但也是可以過

```typescript
function passThePillow(n: number, time: number): number {
    // 初始位置是第1個人
    let position = 1;
    // 初始方向是順向（1表示順向，-1表示反向）
    let direction = 1;
    
    for (let i = 0; i < time; i++) {
        position += direction;
        
        // 如果傳遞到第n個人，方向反轉
        if (position === n) {
            direction = -1;
        }
        // 如果傳遞到第1個人，方向反轉
        else if (position === 1) {
            direction = 1;
        }
    }
    
    return position;
}
```





