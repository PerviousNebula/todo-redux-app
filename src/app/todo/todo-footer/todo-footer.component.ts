import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../../todo/todo.actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html'
})
export class TodoFooterComponent implements OnInit {
  public filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  public filtroActual: fromFiltro.filtrosValidos;
  public pendientes: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    });
  }
  public cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos): void {
    const ACCION = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(ACCION);
  }
  public contarPendientes(todos: Todo[]): void {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }
  public limpiarCompletados(): void {
    const ACCION = new fromTodo.EliminarCompletadasTodo();
    this.store.dispatch(ACCION);
  }
}
