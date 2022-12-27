import { isValid } from 'date-fns'

export const isDate = (value) => {
  if (!value) {
    return false
  }

  if (isValid(value)) {
    return true
  } else {
    return false
  }
}
