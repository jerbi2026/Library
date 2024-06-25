import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAjouterLivreComponent } from './admin-ajouter-livre.component';

describe('AdminAjouterLivreComponent', () => {
  let component: AdminAjouterLivreComponent;
  let fixture: ComponentFixture<AdminAjouterLivreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAjouterLivreComponent]
    });
    fixture = TestBed.createComponent(AdminAjouterLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
