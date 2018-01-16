import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { DashboardPageComponent } from './dashboard-page.component';
import { PetsService, IPetOwner, IPet } from '../shared/services/pet/pets.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';


class MockPetsService {
  public getAllPetOwners(): Observable<IPetOwner[]> {
    return Observable.of([
      {
       name: "Bob",
       gender: "Male",
       age: 23,
       pets: [{
        name: "Bob",
        type: "cat",
       }]
     }
     
    
   ]);
  }
}
describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPageComponent ],
      providers:    [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function(backend: any, defaultOptions: any): any {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: PetsService, useClass: MockPetsService },
        DashboardPageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  
});




