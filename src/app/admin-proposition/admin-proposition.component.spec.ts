import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropositionComponent } from './admin-proposition.component';

describe('AdminPropositionComponent', () => {
  let component: AdminPropositionComponent;
  let fixture: ComponentFixture<AdminPropositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPropositionComponent]
    });
    fixture = TestBed.createComponent(AdminPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
