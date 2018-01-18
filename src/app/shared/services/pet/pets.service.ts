import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';
import { genderEnum, IPetOwner, IPet } from '../../models/pet';

export interface IPetService {
  getAllPetOwners(): Observable<IPetOwner[]>;
}
/**
 * Pets Service class to handle pet related information.
 */
@Injectable()
export class PetsService implements IPetService {
  private store: {
    owners: IPetOwner[],
};
  private _owners: BehaviorSubject<Array<IPetOwner>> = new BehaviorSubject([]);
  public readonly owners$: Observable<Array<IPetOwner>> = this._owners.asObservable();
  constructor(private http: HttpClient) {
    this.store = { owners: []};
  }

  /**
   * user an other approach with reactive programming(RXJS)
   * getAllPetOwners - get the all pet owners
   * @param  
   * @return return  Observable<IPetOwner[]>
   */
  public getAllPetOwners(): Observable<IPetOwner[]> {
    return this.transformToPetOwnerArray(this.http.get('http://agl-developer-test.azurewebsites.net/people.json'));
  }
   /**
   * use RXJS logic to get all petowners as a stream
   * shared/models/people.json is what azure service returns
   */
  getOwners(){
    this.transformToPetOwnerArray(this.http.get('http://agl-developer-test.azurewebsites.net/people.json')).subscribe( peoples$ => {
         this.store.owners = peoples$;
         this._owners.next(this.store.owners);
    })
  }

  /**
  *   transform any[] into Observable<IPet[]>
  * @return {Observable<IPetOwner[]>}  return Angular2 Observable IPetOwner[] object
  */
  private mapPets(petsResponse: any[]): IPet[] {
    return petsResponse.map((pet) => {
      return <IPet>{
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
    return petOwners$.map((response: any[]) => {
      return response.map((petOwner) => {
        return <IPetOwner>{
          name: petOwner.name,
          gender: this.ParseGender(petOwner.gender),
          age: petOwner.age,
          pets: (petOwner.pets) ? this.mapPets(petOwner.pets) : []
        }
      });
    });
  }

  public ParseGender(value: string): genderEnum {
    if (value.trim().toLowerCase() === 'male') {
      return genderEnum.male;
    }
    else if (value.trim().toLowerCase() === 'female') {
      return genderEnum.female;
    }
    return genderEnum.other;
  }

}
