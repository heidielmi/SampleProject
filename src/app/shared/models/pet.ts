
export enum genderEnum {
    male,
    female,
    other
  }
  export interface IPetOwner {
    name: string,
    gender: genderEnum,
    age: string,
    pets: IPet[]
  }
  export interface IPet {
    name: string,
    type: string
  }