import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacioncirugiaComponent } from './programacioncirugia.component';

describe('ProgramacioncirugiaComponent', () => {
  let component: ProgramacioncirugiaComponent;
  let fixture: ComponentFixture<ProgramacioncirugiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramacioncirugiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramacioncirugiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
