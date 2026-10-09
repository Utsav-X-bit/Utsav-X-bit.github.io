# Graph Report - Utsav-X-bit.github.io  (2026-10-09)

## Corpus Check
- 5 files · ~17,185 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 34 nodes · 44 edges · 5 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]

## God Nodes (most connected - your core abstractions)
1. `$()` - 6 edges
2. `startHero()` - 4 edges
3. `openModal()` - 4 edges
4. `accentCss()` - 3 edges
5. `archDiagram()` - 3 edges
6. `redrawHeat()` - 3 edges
7. `accentRgb()` - 2 edges
8. `finishLoad()` - 2 edges
9. `scramble()` - 2 edges
10. `revealHero()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `openModal()` --calls--> `$()`  [EXTRACTED]
  js/main.js → js/main.js  _Bridges community 1 → community 3_

## Communities

### Community 1 - "Community 1"
Cohesion: 0.33
Nodes (6): $(), redrawHeat(), renderCodolio(), renderDev(), renderHeatmap(), setStat()

### Community 2 - "Community 2"
Cohesion: 0.5
Nodes (4): finishLoad(), revealHero(), scramble(), startHero()

### Community 3 - "Community 3"
Cohesion: 0.5
Nodes (4): archDiagram(), archSVG(), launch(), openModal()

### Community 4 - "Community 4"
Cohesion: 0.67
Nodes (3): accentCss(), accentRgb(), renderChart()

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (2): dayKey(), windowCut()

## Knowledge Gaps
- **Thin community `Community 5`** (2 nodes): `dayKey()`, `windowCut()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `$()` connect `Community 1` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `startHero()` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `openModal()` connect `Community 3` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._