import { Injectable }  from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';

export enum genderEnum {
   male,
   female,
   other
}

export interface IPetOwner {
  name: string,
  gender: genderEnum,
  age: string,
  pets:IPet[]
}
export interface IPet {
  name: string,
  type: string
}
export interface IPetService {
  getAllPetOwners(): Observable<IPetOwner[]>;
}
/**
 * Pets Service class to handle pet related information.
 */
@Injectable()
export class PetsService implements IPetService {

    constructor(private http: HttpClient) {
   }

  /**
   * getAllPetOwners - get the all pet owners
   * @param  
   * @return return  Observable<IPetOwner[]>
   */
  public getAllPetOwners(): Observable<IPetOwner[]> {
       return this.transformToPetOwnerArray(this.http.get('http://agl-developer-test.azurewebsites.net/people.json'));
  }

   /**
   *   transform any[] into Observable<IPet[]>
   * @return {Observable<IPetOwner[]>}  return Angular2 Observable IPetOwner[] object
   */
  private mapPets(petsResponse: any[]): IPet[] {
      return petsResponse.map( (pet) =>  {
                return <IPet> {
                   name: pet.name,
                   type: pet.type
                }
       })
  }
  /**
   *   transform what webApi is returning(Observable<any[]) into Observable<IPetOwner[]>
   * @return {Observable<IPetOwner[]>}  return Angular2 Observable IPetOwner[] object
   */
  private transformToPetOwnerArray(petOwners$: Observable<any>): Observable<IPetOwner[]> {
    return petOwners$ .map((response: any[]) => {
     return response.map( (petOwner) =>  {
      return <IPetOwner>{
        name: petOwner.name,
        gender: this.ParseGender(petOwner.gender),
        age: petOwner.age,
        pets: (petOwner.pets)? this.mapPets(petOwner.pets) :[]
      }
     });
    });
  }

  public  ParseGender(value: string): genderEnum {
    if(value.trim().toLowerCase() === 'male'){
             return genderEnum.male;
    }
    else if(value.trim().toLowerCase() === 'female'){
      return genderEnum.female;
    }
    return genderEnum.other;
  }
  
}
