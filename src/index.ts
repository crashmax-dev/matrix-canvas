interface UserParams {
  firstName: string
  lastName: string
  age: number
}

export class User {
  private firstName: string
  private lastName: string
  private age: number

  constructor(params: UserParams) {
    const { firstName, lastName, age } = params

    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`
  }

  isOverEighteen(): boolean {
    return this.age > 18 ? true : false
  }
}