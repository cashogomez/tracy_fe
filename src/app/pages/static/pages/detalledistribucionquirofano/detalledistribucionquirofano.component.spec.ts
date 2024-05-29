import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalledistribucionquirofanoComponent } from './detalledistribucionquirofano.component';

describe('DetalledistribucionquirofanoComponent', () => {
  let component: DetalledistribucionquirofanoComponent;
  let fixture: ComponentFixture<DetalledistribucionquirofanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalledistribucionquirofanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalledistribucionquirofanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
