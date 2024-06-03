import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalledistribucionentregaComponent } from './detalledistribucionentrega.component';

describe('DetalledistribucionentregaComponent', () => {
  let component: DetalledistribucionentregaComponent;
  let fixture: ComponentFixture<DetalledistribucionentregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalledistribucionentregaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalledistribucionentregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
