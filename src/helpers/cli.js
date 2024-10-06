/**
 * @description Format `Object.entries()` to preferred output
 * @param {[string, string][]} entries
 * @param {([string, string]) => string} mapper
 * @param {string} separatorOfItems
 * @param {string} separatorOfValues
 * @returns {string}
 */
export const formatEntries = ({
  entries,
  mapper = ([key, value]) => `${key}${separatorOfValues}${value}`,
  separatorOfItems,
  separatorOfValues
}) => {
  const mapped = entries.map(mapper)

  return mapped.join(separatorOfItems)
}
