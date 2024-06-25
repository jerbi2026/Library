import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPropositionComponent } from './admin-view-proposition.component';

describe('AdminViewPropositionComponent', () => {
  let component: AdminViewPropositionComponent;
  let fixture: ComponentFixture<AdminViewPropositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewPropositionComponent]
    });
    fixture = TestBed.createComponent(AdminViewPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
