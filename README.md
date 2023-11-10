# cslib

This is a TypeScript library for Counter-Strike-related applications.

## `CS_Economy` class

Before using `CS_Economy` class or related functions, you need to set the items:

```typescript
import { CS_Economy, CS_ITEMS } from "cslib";

CS_Economy.initialize(CS_ITEMS);
```

Normally, it is not necessary to import `CS_ITEM_DEFS` into the client bundle.

## Feature Overview

-   [ ] Economy Items - Grafitti
-   [ ] Economy Items - Tools
-   [x] Economy Items - Agent Patches
-   [x] Economy Items - Agents
-   [x] Economy Items - Cases
-   [x] Economy Items - Gloves
-   [x] Economy Items - Knives
-   [x] Economy Items - Music Kits
-   [x] Economy Items - Pins
-   [x] Economy Items - Weapon Skins
-   [x] Economy Items - Weapon Stickers
-   [x] Misc - Active Pool Maps
-   [x] Misc - Teams
-   [x] Misc - Veto
