import { describe, expect, it, vi } from "vitest";

import { before } from "../src/index.js";

describe("before", () => {
  it("invokes up to the limit then returns the last result", () => {
    const target = vi.fn<(value: number) => number>((value) => value * 2);
    const wrapped = before(2, target);
    expect(wrapped(1)).toBe(2);
    expect(wrapped(2)).toBe(4);
    expect(wrapped(3)).toBe(4);
    expect(target.mock.calls).toEqual([[1], [2]]);
  });

  it("never invokes with a zero limit", () => {
    const target = vi.fn<() => number>();
    expect(before(0, target)()).toBeUndefined();
    expect(target).not.toHaveBeenCalled();
  });

  it("does not replace the last successful result when a call throws", () => {
    const reason = new Error("failed");
    const target = vi
      .fn<(value: number) => number>()
      .mockReturnValueOnce(1)
      .mockImplementationOnce(() => {
        throw reason;
      });
    const wrapped = before(2, target);
    expect(wrapped(1)).toBe(1);
    expect(() => wrapped(2)).toThrow(reason);
    expect(wrapped(3)).toBe(1);
  });

  it.each([-1, 1.5, Number.NaN])("rejects the invalid count %s", (count) => {
    expect(() => before(count, () => {})).toThrow(
      "count must be a non-negative integer",
    );
  });
});
