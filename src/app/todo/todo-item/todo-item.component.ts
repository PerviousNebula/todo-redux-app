import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';

import { Todo } from '../model/todo.model';
import { ToggleTodoAction, EditarTodoAction, EliminarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('txtInputFisico', { static: true }) txtInputFisico: ElementRef;
  chkField: FormControl;
  txtInput: FormControl;
  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkField.valueChanges.subscribe(valor => {
      const ACTION = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(ACTION);
    });
  }

  public editar(): void {
    this.editando = true;
    setTimeout(() => this.txtInputFisico.nativeElement.select(), 1);
  }

  public terminarEdicion(): void {
    this.editando = false;
    if (this.txtInput.valid && this.txtInput.value !== this.todo.texto) {
      const ACTION = new EditarTodoAction(this.todo.id, this.txtInput.value);
      this.store.dispatch(ACTION);
    }
  }

  public eliminarTodo(): void {
    const ACTION = new EliminarTodoAction(this.todo.id);
    this.store.dispatch(ACTION);
  }

}
