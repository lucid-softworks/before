# @lucid-softworks/before

Limit a function to a maximum number of invocations. Later calls return the
last successful result, or `undefined` when the limit is zero.

```ts
import { before } from "@lucid-softworks/before";

const initializeOnce = before(1, () => ({ ready: true }));

initializeOnce(); // Runs the initializer.
initializeOnce(); // Returns the first result without running it again.
```
