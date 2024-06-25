import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAuteurComponent } from './admin-add-auteur.component';

describe('AdminAddAuteurComponent', () => {
  let component: AdminAddAuteurComponent;
  let fixture: ComponentFixture<AdminAddAuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddAuteurComponent]
    });
    fixture = TestBed.createComponent(AdminAddAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
