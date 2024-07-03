import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsterilizadorComponent } from './esterilizador.component';

describe('EsterilizadorComponent', () => {
  let component: EsterilizadorComponent;
  let fixture: ComponentFixture<EsterilizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsterilizadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsterilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
