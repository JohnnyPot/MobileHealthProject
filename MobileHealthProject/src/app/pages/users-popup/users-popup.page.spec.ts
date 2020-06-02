import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersPopupPage } from './users-popup.page';

describe('UsersPopupPage', () => {
  let component: UsersPopupPage;
  let fixture: ComponentFixture<UsersPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
