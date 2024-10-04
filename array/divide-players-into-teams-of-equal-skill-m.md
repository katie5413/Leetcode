# Divide Players Into Teams of Equal Skill (M)

[2491. Divide Players Into Teams of Equal Skill](https://leetcode.com/problems/divide-players-into-teams-of-equal-skill/)



You are given a positive integer array `skill` of **even** length `n` where `skill[i]` denotes the skill of the `ith` player. Divide the players into `n / 2` teams of size `2` such that the total skill of each team is **equal**.

The **chemistry** of a team is equal to the **product** of the skills of the players on that team.

Return _the sum of the **chemistry** of all the teams, or return_ `-1` _if there is no way to divide the players into teams such that the total skill of each team is equal._

&#x20;

**Example 1:**

<pre><code><strong>Input: skill = [3,2,5,1,3,4]
</strong><strong>Output: 22
</strong><strong>Explanation: 
</strong>Divide the players into the following teams: (1, 5), (2, 4), (3, 3), where each team has a total skill of 6.
The sum of the chemistry of all the teams is: 1 * 5 + 2 * 4 + 3 * 3 = 5 + 8 + 9 = 22.
</code></pre>

**Example 2:**

<pre><code><strong>Input: skill = [3,4]
</strong><strong>Output: 12
</strong><strong>Explanation: 
</strong>The two players form a team with a total skill of 7.
The chemistry of the team is 3 * 4 = 12.
</code></pre>

**Example 3:**

<pre><code><strong>Input: skill = [1,1,2,3]
</strong><strong>Output: -1
</strong><strong>Explanation: 
</strong>There is no way to divide the players into teams such that the total skill of each team is equal.
</code></pre>

&#x20;

**Constraints:**

* `2 <= skill.length <= 10^5`
* `skill.length` is even.
* `1 <= skill[i] <= 1000`



```typescript
function dividePlayers(skill: number[]): number {
    skill.sort((a, b) => a - b);
    const n = skill.length;
    const targetSum = skill[0] + skill[n - 1];
    let i = 0, j = n - 1;
    let ans = 0;
    
    while (i < j) {
        const tempSum = skill[i] + skill[j];
        if (tempSum === targetSum) {
            ans += skill[i] * skill[j];
        } else {
            return -1;
        }
        i++;
        j--;
    }
    
    return ans;
}
```
