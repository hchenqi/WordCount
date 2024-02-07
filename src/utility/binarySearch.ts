export function binarySearch<T>(array : Array<T>, value : T, cmp: (a: T, b: T) => number) {
  let begin = 0, end = array.length;
  while (begin < end) {
    let mid = Math.floor((begin + end) / 2);
    if (cmp(array[mid], value) < 0) {
      begin = mid + 1;
    } else {
      end = mid
    }
  }
  return begin;
}