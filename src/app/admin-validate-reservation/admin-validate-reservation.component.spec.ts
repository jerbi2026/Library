import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminValidateReservationComponent } from './admin-validate-reservation.component';

describe('AdminValidateReservationComponent', () => {
  let component: AdminValidateReservationComponent;
  let fixture: ComponentFixture<AdminValidateReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminValidateReservationComponent]
    });
    fixture = TestBed.createComponent(AdminValidateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
