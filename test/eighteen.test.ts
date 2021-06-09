import { User } from '../src'

const user = new User({
  firstName: 'Vitalij',
  lastName: 'Ryndin',
  age: 22
})

test('Is over eighteen', () => {
  expect(user.isOverEighteen()).toBe(true)
})