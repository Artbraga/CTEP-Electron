import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarTurmaComponent } from './finalizar-turma.component';

describe('FinalizarTurmaComponent', () => {
  let component: FinalizarTurmaComponent;
  let fixture: ComponentFixture<FinalizarTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
