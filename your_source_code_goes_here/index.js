const fs = require('fs')

function dropElement(array, el) {
  const arrayClone = [...array]

  const index = arrayClone.indexOf(el)

  if (!~index) return null

  arrayClone.splice(index, 1)
  return arrayClone
}

function parseInputData(src) {
  let data = fs.readFileSync(src, { encoding: 'utf-8' })
  data = data.split('\n')

  return data
}

function matchWord (wordLetters, letters){
  let lettersClone = [...letters]
  let match = true

  const length = wordLetters.length
  for (let i = 0; i < length; i++) {
    const currentLetter = wordLetters[i]
    lettersClone = dropElement(lettersClone, currentLetter)

    if (!lettersClone) {
      match = false
      break
    }
  }

  return match
}

function processInputs(wordsInputSrc, lettersInputSrc, outputFileSrc) {
  const words = parseInputData(wordsInputSrc)
  let letters = parseInputData(lettersInputSrc)

  const wordsOutput = []

  words.forEach((word, i) => {
    console.log(wordsInputSrc, word, i)
    const wordLetters = word.split('')

    if (matchWord(wordLetters, letters)) {
      wordsOutput.push(word)
      wordLetters.forEach(letter => {
        letters = dropElement(letters, letter)
      })
    }
  })

  const result = wordsOutput.join('\n')
  fs.writeFileSync(outputFileSrc, result)
}

processInputs('../input/a_words.txt', '../input/a_letters.txt', '../solutions/a_result.txt')
processInputs('../input/b_words.txt', '../input/b_letters.txt', '../solutions/b_result.txt')
processInputs('../input/c_words.txt', '../input/c_letters.txt', '../solutions/c_result.txt')
processInputs('../input/d_words.txt', '../input/d_letters.txt', '../solutions/d_result.txt')

