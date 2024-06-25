import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuteursComponent } from './admin-auteurs.component';

describe('AdminAuteursComponent', () => {
  let component: AdminAuteursComponent;
  let fixture: ComponentFixture<AdminAuteursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuteursComponent]
    });
    fixture = TestBed.createComponent(AdminAuteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
