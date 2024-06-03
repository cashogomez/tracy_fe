import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirrecepcionotrasComponent } from './recibirrecepcionotras.component';

describe('RecibirrecepcionotrasComponent', () => {
  let component: RecibirrecepcionotrasComponent;
  let fixture: ComponentFixture<RecibirrecepcionotrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecibirrecepcionotrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecibirrecepcionotrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
