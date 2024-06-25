import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLivreComponent } from './admin-livre.component';

describe('AdminLivreComponent', () => {
  let component: AdminLivreComponent;
  let fixture: ComponentFixture<AdminLivreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLivreComponent]
    });
    fixture = TestBed.createComponent(AdminLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
