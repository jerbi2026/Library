import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuteurComponent } from './admin-auteur.component';

describe('AdminAuteurComponent', () => {
  let component: AdminAuteurComponent;
  let fixture: ComponentFixture<AdminAuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuteurComponent]
    });
    fixture = TestBed.createComponent(AdminAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
