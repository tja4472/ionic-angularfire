import { Component } from '@angular/core';

import {
    ModalController,
    NavController,
} from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

import { TodoModalPage } from '../todo-modal/todo-modal.page';

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

@Component({
    selector: 'todos-page',
    templateUrl: 'todos.page.html'
})
export class TodosPage {
    items: FirebaseListObservable<any[]>;
    todos$: Observable<Todo[]>;

    constructor(
        public af: AngularFire,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        private todoService: TodoService,
    ) {
        this.items = af.database.list(FIREBASE_CURRENT_TODOS);
        /*    
              .subscribe(x => {
                console.log('x>', x);
              });
        */
    }

    createItem() {
        console.log('createItem');

        /*
        Create todoModalPage, todo-modal.page???
    let modal = this.modalCtrl.create(TodoPage);        
        */

        let modal = this.modalCtrl.create(TodoModalPage);

        modal.onDidDismiss((data: Todo) => {
            console.log('onDidDismiss>', data);

            if (!!data) {
               // this.todoService.save(data);
            }
        });

        modal.present()
    }

    loadData() {
        console.log('loadData');
        this.todos$ = this.todoService.getData();
        /*
                this.todoService.getData()
                    .subscribe(x => {
                        console.log('x>', x);
                    });
        */
    }
}  
