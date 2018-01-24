export default function equalByKeys(objA, objB, ...keys) {
  for (const key of keys) {
    if (objA[key] !== objB[key]) return false;
  }
  return true;
}
