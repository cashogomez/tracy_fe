import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleesterilizadorComponent } from './detalleesterilizador.component';

describe('DetalleesterilizadorComponent', () => {
  let component: DetalleesterilizadorComponent;
  let fixture: ComponentFixture<DetalleesterilizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleesterilizadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleesterilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
