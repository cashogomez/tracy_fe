import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRbusquedaComponent } from './qrbusqueda.component';

describe('QRbusquedaComponent', () => {
  let component: QRbusquedaComponent;
  let fixture: ComponentFixture<QRbusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRbusquedaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QRbusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
