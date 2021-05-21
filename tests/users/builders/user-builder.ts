import { name, internet } from "faker"

import { User } from "#/users/domain/entities/user"

import { BaseBuilder } from "!tests/utils/base-builder"

export class UserBuilder extends BaseBuilder<User, UserBuilder> {
  public constructor() {
    super(UserBuilder)
  }

  protected buildDefault(): User {
    return new User(
      name.firstName(),
      internet.email()
    )
  }
}
