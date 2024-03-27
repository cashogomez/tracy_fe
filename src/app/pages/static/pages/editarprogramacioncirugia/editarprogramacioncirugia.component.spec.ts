import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarprogramacioncirugiaComponent } from './editarprogramacioncirugia.component';

describe('EditarprogramacioncirugiaComponent', () => {
  let component: EditarprogramacioncirugiaComponent;
  let fixture: ComponentFixture<EditarprogramacioncirugiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarprogramacioncirugiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarprogramacioncirugiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
