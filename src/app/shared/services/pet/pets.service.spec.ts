import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { HttpClient } from '@angular/common/http';
import { PetsService } from './pets.service';
import { GenderEnum, IPetOwner, IPet } from '../../models/pet';

class MockHttpClient {
  public get(url: string): any {
    return Observable.of([
       {
        "name": "Bob",
        "gender": "Male",
        "age": 23,
        "pets": [
           {
              "name": "Garfield",
               "type": "Cat"
            },
            {
               "name": "Fido",
               "type": "Dog"
            }
         ]
      },
      {
         "name": "Jennifer",
         "gender": "Female",
         "age": 18,
         "pets": [
           {
               "name": "Garfield",
                "type": "Cat"
            }
          ]
      }
     
    ]);
  }
}

describe('PetsService', () => {
  let mockBackend: MockBackend;
  let petsService: PetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetsService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function(backend: any, defaultOptions: any): any {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    });
  });



  it('should return the pet owners list',
  inject([ PetsService], ( _service) => {
  
    let sut: any = [
      {
       "name": "Bob",
       "gender": GenderEnum.male,
       "age": 23,
       "pets": [
          {
             "name": "Garfield",
              "type": "Cat"
           },
           {
              "name": "Fido",
              "type": "Dog"
           }
        ]
     },
     {
        "name": "Jennifer",
        "gender": GenderEnum.female,
        "age": 18,
        "pets": [
          {
              "name": "Garfield",
               "type": "Cat"
           }
         ]
     }
    
   ]

    petsService = _service;

    petsService.getAllPetOwners().subscribe(petOwners => {
      expect(petOwners).toEqual(sut);
    });
  }));
});
