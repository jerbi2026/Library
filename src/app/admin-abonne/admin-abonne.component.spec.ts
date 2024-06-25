import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbonneComponent } from './admin-abonne.component';

describe('AdminAbonneComponent', () => {
  let component: AdminAbonneComponent;
  let fixture: ComponentFixture<AdminAbonneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAbonneComponent]
    });
    fixture = TestBed.createComponent(AdminAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
