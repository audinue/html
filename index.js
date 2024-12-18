const map = {
  "'": '&apos;',
  '"': '&quot;',
  '<': '&lt;',
  '&': '&amp;'
}

const t = {}

const escape = value => {
  if (value === false || value === null || value === undefined) {
    return ''
  } else if (Array.isArray(value)) {
    return value.map(escape).join('')
  } else if (value?.t === t) {
    return value
  } else {
    return String(value).replace(/['"<&]/g, char => map[char])
  }
}

export const safe = string => ({ t, toString: () => string })

export const html = (raw, ...values) => ({
  t,
  toString: () => String.raw({ raw }, ...values.map(escape))
})
