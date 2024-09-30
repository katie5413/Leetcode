# My Calendar II (M)

[731. My Calendar II](https://leetcode.com/problems/my-calendar-ii/)



You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a **triple booking**.

A **triple booking** happens when three events have some non-empty intersection (i.e., some moment is common to all the three events.).

The event can be represented as a pair of integers `start` and `end` that represents a booking on the half-open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

Implement the `MyCalendarTwo` class:

* `MyCalendarTwo()` Initializes the calendar object.
* `boolean book(int start, int end)` Returns `true` if the event can be added to the calendar successfully without causing a **triple booking**. Otherwise, return `false` and do not add the event to the calendar.

&#x20;

**Example 1:**

<pre><code><strong>Input
</strong>["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
<strong>Output
</strong>[null, true, true, true, false, true, true]

<strong>Explanation
</strong>MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked. 
myCalendarTwo.book(50, 60); // return True, The event can be booked. 
myCalendarTwo.book(10, 40); // return True, The event can be double booked. 
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.
</code></pre>

&#x20;

**Constraints:**

* `0 <= start < end <= 10^9`
* At most `1000` calls will be made to `book`.





Ref [https://leetcode.com/problems/my-calendar-ii/solutions/5838176/easy-beats-100-images-fully-explained-dry-run-optimum-solution](https://leetcode.com/problems/my-calendar-ii/solutions/5838176/easy-beats-100-images-fully-explained-dry-run-optimum-solution)

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
