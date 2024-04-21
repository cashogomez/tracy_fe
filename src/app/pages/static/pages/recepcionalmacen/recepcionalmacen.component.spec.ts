import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionalmacenComponent } from './recepcionalmacen.component';

describe('RecepcionalmacenComponent', () => {
  let component: RecepcionalmacenComponent;
  let fixture: ComponentFixture<RecepcionalmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionalmacenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepcionalmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
