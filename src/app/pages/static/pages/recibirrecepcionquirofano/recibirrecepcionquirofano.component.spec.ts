import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirrecepcionquirofanoComponent } from './recibirrecepcionquirofano.component';

describe('RecibirrecepcionquirofanoComponent', () => {
  let component: RecibirrecepcionquirofanoComponent;
  let fixture: ComponentFixture<RecibirrecepcionquirofanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecibirrecepcionquirofanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecibirrecepcionquirofanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
