import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBoletoComponent } from './filtro-boleto.component';

describe('FiltroBoletoComponent', () => {
  let component: FiltroBoletoComponent;
  let fixture: ComponentFixture<FiltroBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
