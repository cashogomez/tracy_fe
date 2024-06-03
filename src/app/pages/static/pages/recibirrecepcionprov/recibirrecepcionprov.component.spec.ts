import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirrecepcionprovComponent } from './recibirrecepcionprov.component';

describe('RecibirrecepcionprovComponent', () => {
  let component: RecibirrecepcionprovComponent;
  let fixture: ComponentFixture<RecibirrecepcionprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecibirrecepcionprovComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecibirrecepcionprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
