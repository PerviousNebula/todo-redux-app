import { Component, OnInit } from '@angular/core';
import { ToggleAllTodoAction } from './todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  public completado = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  public toggleAll(): void {
    this.completado = !this.completado;
    const ACTION = new ToggleAllTodoAction(this.completado);
    this.store.dispatch(ACTION);
  }

}
