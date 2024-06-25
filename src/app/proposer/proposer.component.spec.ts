import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposerComponent } from './proposer.component';

describe('ProposerComponent', () => {
  let component: ProposerComponent;
  let fixture: ComponentFixture<ProposerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposerComponent]
    });
    fixture = TestBed.createComponent(ProposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
