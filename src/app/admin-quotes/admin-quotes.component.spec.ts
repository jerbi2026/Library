import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuotesComponent } from './admin-quotes.component';

describe('AdminQuotesComponent', () => {
  let component: AdminQuotesComponent;
  let fixture: ComponentFixture<AdminQuotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminQuotesComponent]
    });
    fixture = TestBed.createComponent(AdminQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
