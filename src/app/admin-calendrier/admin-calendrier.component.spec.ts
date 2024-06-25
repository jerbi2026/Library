import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendrierComponent } from './admin-calendrier.component';

describe('AdminCalendrierComponent', () => {
  let component: AdminCalendrierComponent;
  let fixture: ComponentFixture<AdminCalendrierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCalendrierComponent]
    });
    fixture = TestBed.createComponent(AdminCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
