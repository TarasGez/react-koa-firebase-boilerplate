export const parseString = (input, level) => {
  if (typeof input === 'string') return input
  else {
    console.warn('Problem with parsing string value at ', level, ': ', input)
    return ''
  }
}

const guest = {
  name: 'Guest',
  email: 'test@email.com',
  providerId: 'test',
  uid: 'testUID',
}

export const mapUser = (input) => {
  const mappedUser = input
    ? {
        name: input.displayName ? parseString(input.displayName, 'user displayName') : '',
        email: input.email ? parseString(input.email, 'user email') : '',
        phoneNumber: input.phoneNumber ? parseString(input.phoneNumber, 'user phoneNumber') : undefined,
        photoURL: input.photoURL ? parseString(input.photoURL, 'user photoURL') : undefined,
        providerId: input.providerId ? parseString(input.providerId, 'user providerId') : '',
        uid: input.uid ? parseString(input.uid, 'user uid') : '',
      }
    : guest

  return mappedUser
}
