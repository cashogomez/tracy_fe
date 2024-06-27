import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsidenciasComponent } from './insidencias.component';

describe('InsidenciasComponent', () => {
  let component: InsidenciasComponent;
  let fixture: ComponentFixture<InsidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsidenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
