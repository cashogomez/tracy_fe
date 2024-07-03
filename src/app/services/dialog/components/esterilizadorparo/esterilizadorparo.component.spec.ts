import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsterilizadorparoComponent } from './esterilizadorparo.component';

describe('EsterilizadorparoComponent', () => {
  let component: EsterilizadorparoComponent;
  let fixture: ComponentFixture<EsterilizadorparoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsterilizadorparoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsterilizadorparoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
