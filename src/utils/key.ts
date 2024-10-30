interface IOptions {
  includeNumbers?: boolean
  includeSpecialChars?: boolean
  uppercase?: boolean
  lowercase?: boolean
  excludedChars?: string[]
}

const DEFAULT_LENGTH = 6

const generateKey = (
  length: number = DEFAULT_LENGTH,
  options: IOptions = {},
) => {
  const {
    includeNumbers = true,
    includeSpecialChars = false,
    uppercase = false,
    lowercase = true,
    excludedChars = [],
  } = options

  const numbers = "0123456789"
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"

  let chars = ""
  if (uppercase) chars += uppercaseChars
  if (lowercase) chars += lowercaseChars
  if (includeNumbers) chars += numbers
  if (includeSpecialChars) chars += specialChars

  chars = chars
    .split("")
    .filter((char) => !excludedChars.includes(char))
    .join("")

  if (chars.length === 0) {
    throw new Error("No characters available with current options")
  }

  let key = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    key += chars[randomIndex]
  }

  return key
}

export default generateKey
