import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsterilizadorclaveComponent } from './esterilizadorclave.component';

describe('EsterilizadorclaveComponent', () => {
  let component: EsterilizadorclaveComponent;
  let fixture: ComponentFixture<EsterilizadorclaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsterilizadorclaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsterilizadorclaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
