import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetsService } from '../shared/services/pet';
import { genderEnum, IPetOwner, IPet } from '../shared/models/pet';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'sample-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})

export class DashboardPageComponent implements OnInit, OnDestroy {
  petOwners: IPetOwner[] = [];

  catsForFemaleOwner: IPet[] = [];
  catsForMaleOwner: IPet[] = [];

  petOwners_apparoach2: IPetOwner[] = [];
  catsForFemaleOwner_apparoach2: IPet[] = [];
  catsForMaleOwner_apparoach2: IPet[] = [];

  _sub: any;

  constructor(private _petsService: PetsService) { }

  ngOnInit() {
    this._sub = this._petsService.getAllPetOwners().subscribe(petOwners$ => {
      //get all thge pet-owners from web service
      this.petOwners = petOwners$;

      // filter female owners and their cats
      this.catsForFemaleOwner = this.populatePets(this.petOwners, "cat", genderEnum.female);

      // filter male owners and their cats
      this.catsForMaleOwner = this.populatePets(this.petOwners, "cat", genderEnum.male);
    });

    //second approach using RXJS(reactive programming)
    // this._petsService.getOwners();
    // this._sub_rxjs = this._petsService.owners$.subscribe(owners => {
    //   this.petOwners_apparoach2 = owners;
    //   // filter female owners and their cats
    //   this.catsForFemaleOwner_apparoach2 = this.populatePets(this.petOwners_apparoach2, "cat", genderEnum.female);

    //   // filter male owners and their cats
    //   this.catsForMaleOwner_apparoach2 = this.populatePets(this.petOwners_apparoach2, "cat", genderEnum.male);


    // });


  }

  /**
  *   get list of pet-owners and pet-type and gender 
  *   returns all the pets for the criteria( based on the owner-gender and pet-type)
  */
  populatePets(owners: IPetOwner[], petType: string, gender: genderEnum): IPet[] {
    let calculatedCats: IPet[] = [];

    calculatedCats = owners.filter(petowner => petowner.gender === gender)
      //map ===> it return array of pet[] 
      .map(owner => owner.pets)
      // now should faltten this array of array
      .reduce((a, b) => a.concat(b), [])
      .filter(pet => pet.type.toLowerCase() == petType)
      .sort(function (a, b) {
              if (a.name < b.name)
                return 1;
              if (a.name > b.name)
                return -1;
              return 0;  //no sorting
            });
    
    return calculatedCats;
  }



  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

}
