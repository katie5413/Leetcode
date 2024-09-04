# Walking Robot Simulation (M)

[874. Walking Robot Simulation](https://leetcode.com/problems/walking-robot-simulation/)



A robot on an infinite XY-plane starts at point `(0, 0)` facing north. The robot can receive a sequence of these three possible types of `commands`:

* `-2`: Turn left `90` degrees.
* `-1`: Turn right `90` degrees.
* `1 <= k <= 9`: Move forward `k` units, one unit at a time.

Some of the grid squares are `obstacles`. The `ith` obstacle is at grid point `obstacles[i] = (xi, yi)`. If the robot runs into an obstacle, then it will instead stay in its current location and move on to the next command.

Return _the **maximum Euclidean distance** that the robot ever gets from the origin **squared** (i.e. if the distance is_ `5`_, return_ `25`_)_.

**Note:**

* North means +Y direction.
* East means +X direction.
* South means -Y direction.
* West means -X direction.
* There can be obstacle in \[0,0].

&#x20;

**Example 1:**

<pre><code><strong>Input: commands = [4,-1,3], obstacles = []
</strong><strong>Output: 25
</strong><strong>Explanation: The robot starts at (0, 0):
</strong>1. Move north 4 units to (0, 4).
2. Turn right.
3. Move east 3 units to (3, 4).
The furthest point the robot ever gets from the origin is (3, 4), which squared is 32 + 42 = 25 units away.
</code></pre>

**Example 2:**

<pre><code><strong>Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
</strong><strong>Output: 65
</strong><strong>Explanation: The robot starts at (0, 0):
</strong>1. Move north 4 units to (0, 4).
2. Turn right.
3. Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).
4. Turn left.
5. Move north 4 units to (1, 8).
The furthest point the robot ever gets from the origin is (1, 8), which squared is 12 + 82 = 65 units away.
</code></pre>

**Example 3:**

<pre><code><strong>Input: commands = [6,-1,-1,6], obstacles = []
</strong><strong>Output: 36
</strong><strong>Explanation: The robot starts at (0, 0):
</strong>1. Move north 6 units to (0, 6).
2. Turn right.
3. Turn right.
4. Move south 6 units to (0, 0).
The furthest point the robot ever gets from the origin is (0, 6), which squared is 62 = 36 units away.
</code></pre>

&#x20;

**Constraints:**

* `1 <= commands.length <= 10^4`
* `commands[i]` is either `-2`, `-1`, or an integer in the range `[1, 9]`.
* `0 <= obstacles.length <= 10^4`
* `-3 * 10^4 <= x_i, y_i <= 3 * 10^4`
* The answer is guaranteed to be less than `2^31`.



Simulation

Ref [https://leetcode.com/problems/walking-robot-simulation/solutions/5734216/easy-to-understand-beats-100](https://leetcode.com/problems/walking-robot-simulation/solutions/5734216/easy-to-understand-beats-100)

```typescript
function robotSim(commands: number[], obstacles: number[][]): number {
  // 建立一個 Map 來儲存障礙物的位置
  const OBS = new Map<number, Set<number>>();
  for (const [x, y] of obstacles) {
    if (!OBS.has(x)) {
      OBS.set(x, new Set());
    }
    OBS.get(x).add(y);
  }

  // 定義四個方向的移動方式（北、東、南、西）
  const DIRECTIONS = [
    [0, 1],   // 北 (向上)
    [1, 0],   // 東 (向右)
    [0, -1],  // 南 (向下)
    [-1, 0],  // 西 (向左)
  ];
  
  let dirIndex = 0; // 初始化方向索引為北方
  let maxEculidian = 0; // 儲存最大歐氏距離平方
  let x = 0, y = 0; // 機器人的起始位置
  
  for (const c of commands) {
    if (c === -1) { // 右轉指令
      dirIndex += 1;
      dirIndex = dirIndex === 4 ? 0 : dirIndex; // 確保索引在 0 到 3 之間循環
      continue;
    }
    if (c === -2) { // 左轉指令
      dirIndex -= 1;
      dirIndex = dirIndex < 0 ? 3 : dirIndex; // 確保索引在 0 到 3 之間循環
      continue;
    }

    const [dx, dy] = DIRECTIONS[dirIndex]; // 取得當前方向的移動增量
    for (let i = 0; i < c; i++) {
      const newX = x + dx;
      const newY = y + dy;
      
      // 檢查新位置是否有障礙物
      if (OBS.has(newX) && OBS.get(newX).has(newY)) {
        break; // 如果有障礙物，停止移動
      }
      
      // 更新機器人的位置
      x = newX;
      y = newY;
    }
    
    // 計算當前位置的歐氏距離平方，並更新最大值
    maxEculidian = Math.max(maxEculidian, x * x + y * y);
  }

  return maxEculidian; // 返回最大歐氏距離平方
}
```
