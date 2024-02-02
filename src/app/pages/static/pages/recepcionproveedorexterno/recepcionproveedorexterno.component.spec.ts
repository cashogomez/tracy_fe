import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionproveedorexternoComponent } from './recepcionproveedorexterno.component';

describe('RecepcionproveedorexternoComponent', () => {
  let component: RecepcionproveedorexternoComponent;
  let fixture: ComponentFixture<RecepcionproveedorexternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionproveedorexternoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepcionproveedorexternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
