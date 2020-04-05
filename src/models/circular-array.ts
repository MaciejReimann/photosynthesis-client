export class CircularArray {
  currentIndex: number

  constructor(readonly arr: any[], startIndex?: number) {
    this.arr = arr
    this.currentIndex = startIndex || 0
  }

  get() {
    return this.arr[this.currentIndex]
  }

  next() {
    if (this.currentIndex === this.arr.length - 1) this.currentIndex = 0
    this.currentIndex++
    return this.arr[this.currentIndex]
  }

  previous() {
    if (this.currentIndex === 0) this.currentIndex = this.arr.length - 1
    this.currentIndex--
    return this.arr[this.currentIndex]
  }
}
