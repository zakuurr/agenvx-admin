/**
 *
 * Capitalize every word in a text
 *
 * @param {string} text
 * @return Capitalize string in every word
 *
 */
const capsEveryWord = text => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ')
}

export { capsEveryWord }
