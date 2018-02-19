
export enum GenderEnum {
    male,
    female,
    other
  }
  export interface IPetOwner {
    name: string,
    gender: GenderEnum,
    age: string,
    pets: IPet[]
  }
  export interface IPet {
    name: string,
    type: string
  }