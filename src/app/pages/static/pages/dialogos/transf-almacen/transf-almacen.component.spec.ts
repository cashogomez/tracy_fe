import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfAlmacenComponent } from './transf-almacen.component';

describe('TransfAlmacenComponent', () => {
  let component: TransfAlmacenComponent;
  let fixture: ComponentFixture<TransfAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfAlmacenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransfAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
