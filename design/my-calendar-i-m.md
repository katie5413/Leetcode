# My Calendar I (M)

[729. My Calendar I](https://leetcode.com/problems/my-calendar-i/)



You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a **double booking**.

A **double booking** happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers `start` and `end` that represents a booking on the half-open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

Implement the `MyCalendar` class:

* `MyCalendar()` Initializes the calendar object.
* `boolean book(int start, int end)` Returns `true` if the event can be added to the calendar successfully without causing a **double booking**. Otherwise, return `false` and do not add the event to the calendar.

&#x20;

**Example 1:**

<pre><code><strong>Input
</strong>["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
<strong>Output
</strong>[null, true, false, true]

<strong>Explanation
</strong>MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
</code></pre>

&#x20;

**Constraints:**

* `0 <= start < end <= 10^9`
* At most `1000` calls will be made to `book`.



```typescript
class MyCalendar {
  private tree: Node | null;
  constructor() {
    this.tree = null;
  }

  book(start: number, end: number): boolean {
    if (!this.tree) {
      this.tree = new Node(start, end);
      return true;
    }
    return this.tree.add(start, end);
  }
}

class Node {
  private _start: number;
  private _end: number;
  private _left: Node | null;
  private _right: Node | null;

  constructor(start: number, end: number) {
    this._start = start;
    this._end = end;
    this._left = null;
    this._right = null;
  }

  public add(start: number, end: number): boolean {
    if (start >= this._end) {
      if (!this._right) {
        this._right = new Node(start, end);
        return true;
      }
      return this._right.add(start, end);
    } else if (end <= this._start) {
      if (!this._left) {
        this._left = new Node(start, end);
        return true;
      }
      return this._left.add(start, end);
    }
    return false;
  }
}
```



<figure><img src="../.gitbook/assets/截圖 2024-09-26 晚上11.31.53.png" alt=""><figcaption></figcaption></figure>
