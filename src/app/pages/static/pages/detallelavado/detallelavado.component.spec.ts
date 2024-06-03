import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallelavadoComponent } from './detallelavado.component';

describe('DetallelavadoComponent', () => {
  let component: DetallelavadoComponent;
  let fixture: ComponentFixture<DetallelavadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallelavadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallelavadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
