import { Model } from "objection"

export class UserModel extends Model {
  public static tableName = "users"

  public readonly id!: number

  public name!: string

  public email!: string

  public createdAt?: Date

  public updatedAt?: Date

  public $beforeInsert(): void {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date()
  }
}
