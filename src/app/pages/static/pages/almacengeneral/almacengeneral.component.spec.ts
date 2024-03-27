import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacengeneralComponent } from './almacengeneral.component';

describe('AlmacengeneralComponent', () => {
  let component: AlmacengeneralComponent;
  let fixture: ComponentFixture<AlmacengeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacengeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmacengeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
