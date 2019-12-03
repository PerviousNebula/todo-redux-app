import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as fromTodo from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html'
})
export class TodoAddComponent implements OnInit {
  txtInput: FormControl;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.txtInput = new FormControl('', Validators.required);
  }
  agregarTodo(): void {
    if(this.txtInput.valid) {
      const ACTION = new fromTodo.AgregarTodoAction(this.txtInput.value);
      this.store.dispatch(ACTION);
      this.txtInput.setValue('');
    }
  }

}
