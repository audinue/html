let map = {
  "'": '&apos;',
  '"': '&quot;',
  '<': '&lt;',
  '&': '&amp;'
}

let t = {}

let escape = value => {
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

export let safe = string => ({ t, toString: () => string })

export let html = (raw, ...values) => ({
  t,
  toString: () => String.raw({ raw }, ...values.map(escape))
})
