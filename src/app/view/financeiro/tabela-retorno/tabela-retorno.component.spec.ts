import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaRetornoComponent } from './tabela-retorno.component';

describe('TabelaRetornoComponent', () => {
  let component: TabelaRetornoComponent;
  let fixture: ComponentFixture<TabelaRetornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaRetornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
