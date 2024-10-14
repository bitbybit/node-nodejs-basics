/**
 * @description Format `Object.entries()` to preferred output
 * @param {Object} payload
 * @param {[string, string][]} payload.entries
 * @param {([string, string]) => string} payload.mapper
 * @param {string} payload.separatorOfItems
 * @param {string} payload.separatorOfValues
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
