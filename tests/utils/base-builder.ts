import faker from "faker"

type ModifierCallback<T> = (dataToModify: T) => void

export abstract class BaseBuilder<T, TBuilder extends BaseBuilder<T, TBuilder>> {
  protected modifiers: Array<ModifierCallback<T>> = []

  protected constructor(private readonly innerType: (new () => TBuilder)) {
  }

  public build(): T {
    const instance = this.buildDefault()

    this.applyModifiers(instance)

    return instance
  }

  public buildMany(quantity?: number): T[] {
    const elements = []
    const elementsQuantity = quantity ?? faker.datatype.number({ min: 2, max: 6 })

    for (let count = 0; count < elementsQuantity; count++) {
      elements.push(this.build())
    }

    return elements
  }

  protected applyModifiers(instance: T): void {
    this.modifiers.forEach((modifier) => {
      modifier(instance)
    })
  }

  protected newBuilder(modifier: ModifierCallback<T>): TBuilder {
    const newBuilder = new this.innerType()

    newBuilder.modifiers = [...this.modifiers, modifier]

    return newBuilder
  }

  protected abstract buildDefault(): T
}
