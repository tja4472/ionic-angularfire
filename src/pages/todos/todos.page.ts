import { Component } from '@angular/core';

import {
  ModalController,
  NavController,
} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

import { TodoModalPage } from '../todo-modal/todo-modal.page';

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
    // this.todoService.remove(item);
  }
}   
