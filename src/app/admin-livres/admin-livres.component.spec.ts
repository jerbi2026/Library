import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLivresComponent } from './admin-livres.component';

describe('AdminLivresComponent', () => {
  let component: AdminLivresComponent;
  let fixture: ComponentFixture<AdminLivresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLivresComponent]
    });
    fixture = TestBed.createComponent(AdminLivresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
