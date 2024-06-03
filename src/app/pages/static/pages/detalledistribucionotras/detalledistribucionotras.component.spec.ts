import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalledistribucionotrasComponent } from './detalledistribucionotras.component';

describe('DetalledistribucionotrasComponent', () => {
  let component: DetalledistribucionotrasComponent;
  let fixture: ComponentFixture<DetalledistribucionotrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalledistribucionotrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalledistribucionotrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
