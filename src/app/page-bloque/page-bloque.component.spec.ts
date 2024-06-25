import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBloqueComponent } from './page-bloque.component';

describe('PageBloqueComponent', () => {
  let component: PageBloqueComponent;
  let fixture: ComponentFixture<PageBloqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageBloqueComponent]
    });
    fixture = TestBed.createComponent(PageBloqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
