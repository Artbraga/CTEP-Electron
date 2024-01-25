import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentosMesComponent } from './pagamentos-mes.component';

describe('PagamentosMesComponent', () => {
  let component: PagamentosMesComponent;
  let fixture: ComponentFixture<PagamentosMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentosMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentosMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
