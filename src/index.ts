const notEmpty = (value: string | undefined | null): value is string => !!value;
const isDefined = <T>(value: T | undefined | null): value is T => value != null;

/** Sort that doesn't mutate original array */
export const safeSort = <T>(arr: T[], compareFn?: (a: T, b: T) => number) =>
  arr.slice().sort(compareFn);

/** Reverse that doesn't mutate original array */
export const safeReverse = <T>(arr: T[]) => arr.slice().reverse();

export const safeSplice = <T>(
  arr: T[],
  index: number,
  deleteCount: number,
  insert?: T
) =>
  isDefined(insert)
    ? arr.slice().splice(index, deleteCount, insert)
    : arr.slice().splice(index, deleteCount);

export const isSame = <T>(a: T[], b: T[]) =>
  a.length === b.length && a.every((val) => b.includes(val));

export const containsOne = <T>(target: T[], check: T[]) =>
  check.filter((val) => target.indexOf(val) !== -1).length > 0;

export const lazyJoin = (
  arr: Array<string | undefined | null>,
  separator: string
) => arr.filter(notEmpty).join(separator);

export const first = <T>(arr: T[]) => arr[0];

export const last = <T>(arr: T[]) => arr[arr.length - 1];

export const without = <T>(target: T[], ...checks: T[]) =>
  target.filter((item) => !checks.includes(item));

export const intersection = <T>(target: T[], check: T[]) =>
  target.filter((item) => check.includes(item));

export const stepItem = <T>(
  arr: T[],
  index: number,
  direction: "up" | "down"
) => {
  const step = (() => {
    switch (direction) {
      case "up": {
        return -1;
      }
      case "down": {
        return 1;
      }
    }
  })();
  const to = index + step;
  const [fromItem] = safeSplice(arr, index, 1);
  const [toItem] = safeSplice(arr, to, 1);
  const result = arr.slice();
  if (fromItem) result[to] = fromItem;
  if (toItem) result[index] = toItem;
  return result;
};

/** Create a simple array with a specified length */
export const fromLength = (length: number) => [...Array(length).keys()];
