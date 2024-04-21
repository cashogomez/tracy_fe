import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoQRComponent } from './codigo-qr.component';

describe('CodigoQRComponent', () => {
  let component: CodigoQRComponent;
  let fixture: ComponentFixture<CodigoQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodigoQRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodigoQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
