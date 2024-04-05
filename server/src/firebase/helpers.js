import { adminsArray } from './admins.js'

export const checkIsAdmin = (userId) => adminsArray.some(({ id }) => id === userId)
