import { Component } from '@angular/core';

import {
  ModalController,
  NavController,
} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

import { TodoModalPage } from '../todo-modal/todo-modal.page';

interface IItem {
  a: string,
  b: string;
  c: string;
}

@Component({
  selector: 'todos-page',
  templateUrl: 'todos.page.html'
})
export class TodosPage {
  todos$: Observable<Todo[]>;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private todoService: TodoService,
  ) {
    this.todos$ = this.todoService.getData();
  }

  createItem() {
    console.log('createItem');
    let modal = this.modalCtrl.create(TodoModalPage);

    modal.onDidDismiss((data: Todo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present()
  }
  aa() {
    this.todoService.aaaaa();
  }

  bb() {
    console.log('bb');
    let objectA: IItem = {
      a: '1',
      b: '2',
      c: '3',
    };
    let objectB: IItem = { // Different order.
      c: '3',
      a: '1',
      b: '2',
    };    
    console.log('objectA>', objectA);
    console.log('objectB>', objectB);
    
    let objectC = {...objectA, b: '22'};
    console.log('objectC>', objectC); // Order maintained.
    let objectD = {...objectA, objectB};
    console.log('objectD>', objectD); // ObjectB added to ObjectA as property.

    let objectE = Object.assign(objectA, objectB);
    console.log('objectE>', objectE); // Order maintained.

    let objectF: IItem = Object.assign({}, objectB);
    console.log('objectF>', objectF); // Order not maintained.    

    let objectH: {
      b: '2#####',
    };

    let objectI = Object.assign(objectA, objectH);
    console.log('objectI>', objectI); // Order maintained.    
  }
  toggleCompleteItem(item: Todo) {
    console.log('completeItem:item>', item);
  }

  editItem(item: Todo) {
    console.log('editItem:item>', item);
    // let todo: ToDo;
    // todo = assign(todo, item);


    let modal = this.modalCtrl.create(TodoModalPage, { todo: item });

    modal.onDidDismiss((data: Todo) => {
      console.log('onDidDismiss>', data);

      if (!!data) {
        this.todoService.save(data);
      }
    });

    modal.present();
  }

  reorderItems(indexes: any) {
    console.log('reorderItems:indexes>', indexes);
    console.log('reorderItems:indexes.from>', indexes.from);
    console.log('reorderItems:indexes.to>', indexes.to);
    // this.todoService.reorderItems(indexes);
    // http://ionicframework.com/docs/v2/api/components/item/ItemReorder/
    // this.items = reorderArray(this.items, indexes);
  }

  removeItem(item: Todo) {
    console.log('removeItem:item>', item);
    this.todoService.removeItem(item.$key);
  }
}   
