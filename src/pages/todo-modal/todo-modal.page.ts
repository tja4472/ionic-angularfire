import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Todo } from '../../models/todo';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'page-todo-modal',
    templateUrl: 'todo-modal.page.html',
})
export class TodoModalPage {
    public todoForm;

    private formResult: Todo =
    {
        $key: '',
        description: null,
        name: '',
        index: 0,
        isComplete: false
    };

    private isEditing: boolean;

    constructor(
        public formBuilder: FormBuilder,
        params: NavParams,
        public viewController: ViewController
    ) {
        console.log('params:get>', params.get('todo'));

        let paramTodo: Todo = params.get('todo');
        this.isEditing = !!paramTodo;

        if (this.isEditing) {
            this.formResult = paramTodo;
        }

        this.todoForm = this.formBuilder.group({
            nameA: [this.formResult.name, Validators.required],
            description: [this.formResult.description],
            isComplete: [this.formResult.isComplete]
        });
    }

    dismiss() {
        console.log('dismiss');
        this.viewController.dismiss();
    }

    save() {
        console.log('TodoModalPage:save');
        console.log('TodoModalPage:todoForm>', this.todoForm);

        if (!this.todoForm.valid) {
            return;
        }
/*
    if (this.userForm.dirty && this.userForm.valid) {
      alert(`Name: ${this.userForm.value.name} Email: ${this.userForm.value.email}`);
    }
*/

        // if(this.todoForm.touched)
        console.log(this.todoForm.value);
        console.log('this.formResult>', this.formResult);
        this.formResult.description = this.todoForm.value.description;
        this.formResult.isComplete = this.todoForm.value.isComplete;
        this.formResult.name = this.todoForm.value.nameA;

        this.viewController.dismiss(this.formResult);
        /*        
                    // Get error here with private todo when using popover.
                    // Hence local.
                
                    let localTodo = assign(this.todo, {
                      name: this.todoForm.value.name,
                      isComplete: this.todoForm.value.isComplete
                    });
                
                    // assign did not like optional property.
                    localTodo.description = this.todoForm.value.description;
                
                    this.viewController.dismiss(localTodo);
                  }
                */
    }
}
