import { name, internet } from "faker"

import { CreateUserRequest } from "#/users/infrastructure/controllers/requests/create-user-request"

import { BaseBuilder } from "!tests/utils/base-builder"

export class CreateUserRequestBuilder extends BaseBuilder<CreateUserRequest, CreateUserRequestBuilder> {
  public constructor() {
    super(CreateUserRequestBuilder)
  }

  protected buildDefault(): CreateUserRequest {
    const request = new CreateUserRequest()

    request.name = name.firstName()
    request.email = internet.email()

    return request
  }
}
