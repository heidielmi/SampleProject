import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetsService, IPetOwner, IPet, genderEnum } from '../shared/services/pet';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
export type OwnersAndPets = { catsForFemales$: Observable<IPet[]>, catsForMales$: Observable<IPet[]> };
@Component({
  selector: 'sample-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})

export class DashboardPageComponent implements OnInit, OnDestroy {
  petOwners: IPetOwner[] = [];
  femaleOwners: IPetOwner[] = [];
  maleOwners: IPetOwner[] = [];
  catsForFemaleOwner: IPet[] = [];
  catsForMaleOwner: IPet[] = [];

  petOwners_apparoach2: IPetOwner[] = [];
  catsForFemaleOwner_apparoach2: IPet[] = [];
  catsForMaleOwner_apparoach2: IPet[] = [];
  _sub: any;
  _sub_rxjs: any;

  ownersAndPets$: BehaviorSubject<IPetOwner[]> = new BehaviorSubject<IPetOwner[]>([]);
  constructor(private _petsService: PetsService) { }

  ngOnInit() {
    this._sub = this._petsService.getAllPetOwners().subscribe(petOwnersApi => {
      //get all thge pet-owners from web service
      this.petOwners = petOwnersApi;

      // filter female owners and their cats
      this.catsForFemaleOwner = this.populatePets(this.petOwners, "cat", genderEnum.female);

      // filter male owners and their cats
      this.catsForMaleOwner = this.populatePets(this.petOwners, "cat", genderEnum.male);
    });

    //second approach using RXJS(reactive programming)
    this._petsService.getOwners();
    this._sub_rxjs = this._petsService.owners$.subscribe(owners => {
      this.petOwners_apparoach2 = owners;
      // filter female owners and their cats
      this.catsForFemaleOwner_apparoach2 = this.populatePets(this.petOwners_apparoach2, "cat", genderEnum.female);

      // filter male owners and their cats
      this.catsForMaleOwner_apparoach2 = this.populatePets(this.petOwners_apparoach2, "cat", genderEnum.male);


    });


  }

  /**
  *   get list of pet-owners and returns all their "cat" pets
  */
  populatePets(owners: IPetOwner[], petType: string, gender: genderEnum): IPet[] {
    let calculatedCats: IPet[] = [];

    calculatedCats = owners.filter(petowner => petowner.gender === gender)
      //map ===> it return array of pet[] 
      .map(owner => owner.pets)
      // now should faltten this array of array
      .reduce((a, b) => a.concat(b), [])
      .filter(pet => pet.type.toLowerCase() == petType);
    this.sortListByName(calculatedCats, true);
    return calculatedCats;
  }

  /**
  *   sort list based on the pet's name
  */
  sortListByName(petList: IPet[], isAsc: boolean) {
    petList.sort(function (a, b) {

      var nameA = a.name;
      var nameB = b.name;

      if (nameA < nameB)
        return (isAsc === true) ? -1 : 1;
      if (nameA > nameB)
        return (isAsc === true) ? 1 : -1;
      return 0;  //no sorting

    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
    if (this._sub_rxjs) {
      this._sub_rxjs.unsubscribe();
    }
  }

}
