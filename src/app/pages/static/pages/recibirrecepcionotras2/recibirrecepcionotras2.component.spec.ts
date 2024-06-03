import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recibirrecepcionotras2Component } from './recibirrecepcionotras2.component';

describe('Recibirrecepcionotras2Component', () => {
  let component: Recibirrecepcionotras2Component;
  let fixture: ComponentFixture<Recibirrecepcionotras2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recibirrecepcionotras2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Recibirrecepcionotras2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
