import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetsService, IPetOwner, IPet, genderEnum } from '../shared/services/pet';
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
  _sub: any
  constructor(private _petsService: PetsService) { }

  ngOnInit() {
    this._sub = this._petsService.getAllPetOwners().subscribe( petOwnersApi =>{
      //get all thge pet-owners from web service
      this.petOwners = petOwnersApi;

      // filter female owners and their cats
      this.femaleOwners= this.petOwners.filter(petowner => petowner.gender === genderEnum.female);
      this.catsForFemaleOwner = this.populatePets(this.femaleOwners, "cat");

      // filter male owners and their cats
      this.maleOwners= this.petOwners.filter(petowner => petowner.gender === genderEnum.male);
      this.catsForMaleOwner = this.populatePets(this.maleOwners, "cat");
    });
  }
    /**
    *   get list of pet-owners and returns all their "cat" pets
    */
    populatePets(owners: IPetOwner[], petType: string): IPet[] {
      let calculatedCats :IPet[] = [];
      for (let owner of owners){
        for (let pet of owner.pets) {
          if(pet.type.toLowerCase() === petType){
            calculatedCats.push(pet);
          }
         }
      }
      this.sortListByName(calculatedCats, true);
     return calculatedCats;
    }

    /**
    *   sort list based on the pet's name
    */
    sortListByName( petList : IPet[], isAsc: boolean){
      petList.sort(function (a,b) {

       var nameA = a.name;
       var nameB = b.name;

       if (nameA < nameB)
         return (isAsc=== true) ? -1 : 1;
       if (nameA > nameB)
         return (isAsc=== true) ? 1 : -1;
       return 0;  //no sorting

       });
     }

     ngOnDestroy() {
      if (this._sub) {
          this._sub.unsubscribe();
      }
  }

}
