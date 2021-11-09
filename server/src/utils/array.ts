export const chunk = (array: Array<string>, count: number) => {
  if (count == null || count < 1) return [];
  let result = [];
  let index = 0 
  let length = array.length;
  while (index < length) {
    result.push(array.slice(index, index += count));
  }
  return result;
}