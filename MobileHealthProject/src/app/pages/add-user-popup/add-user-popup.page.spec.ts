import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUserPopupPage } from './add-user-popup.page';

describe('AddUserPopupPage', () => {
  let component: AddUserPopupPage;
  let fixture: ComponentFixture<AddUserPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
