import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLavadorasComponent } from './crear-lavadoras.component';

describe('CrearLavadorasComponent', () => {
  let component: CrearLavadorasComponent;
  let fixture: ComponentFixture<CrearLavadorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearLavadorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearLavadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
