import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaBoletoComponent } from './tabela-boleto.component';

describe('TabelaBoletoComponent', () => {
  let component: TabelaBoletoComponent;
  let fixture: ComponentFixture<TabelaBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
