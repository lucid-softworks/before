import { invariant } from "@lucid-softworks/invariant";

/** Invokes at most `count` times, then returns the last successful result. */
export function before<TArguments extends readonly unknown[], TResult>(
  count: number,
  target: (...arguments_: TArguments) => TResult,
): (...arguments_: TArguments) => TResult | undefined {
  invariant(
    Number.isInteger(count) && count >= 0,
    "count must be a non-negative integer",
  );
  let calls = 0;
  let result: TResult | undefined;
  return (...arguments_) => {
    if (calls < count) {
      calls += 1;
      result = target(...arguments_);
    }
    return result;
  };
}
