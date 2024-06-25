import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuoteComponent } from './admin-quote.component';

describe('AdminQuoteComponent', () => {
  let component: AdminQuoteComponent;
  let fixture: ComponentFixture<AdminQuoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminQuoteComponent]
    });
    fixture = TestBed.createComponent(AdminQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
