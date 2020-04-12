// import { Repository } from "./repository-model"
export class Player {
  private name: string = ""
  private isActive: boolean = false

  constructor(readonly id: number) {
    this.id = id
    // this.repository = new Repository()
  }

  // setters

  setName(name: string): void {
    this.name = name
  }

  setIsActive(value: boolean): void {
    this.isActive = value
  }

  // getters

  getName(): string {
    return this.name
  }

  getIsActive(): boolean {
    return this.isActive
  }
}
