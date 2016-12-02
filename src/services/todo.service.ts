import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Todo } from '../models/todo';


import {Observer} from "rxjs/Observer";

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

// Multiple subscriptions on a FirebaseListObservable #574
// https://github.com/angular/angularfire2/issues/574
// beta.7 

// https://coryrylan.com/blog/angular-2-observable-data-services

// https://dzone.com/articles/how-to-build-angular-2-apps-using-observable-data-1

@Injectable()
export class TodoService {
    private fb_CurrentTodos: FirebaseListObservable<any[]>; // readonly

    // see https://embed.plnkr.co/0c9xQRHBgMrtsJXCZC3T/
    public isLoading$: Observable<Boolean> = Observable.of(false);
    private observer: Observer<boolean>;

    constructor(
        public af: AngularFire
    ) {
        this.fb_CurrentTodos = af.database.list(FIREBASE_CURRENT_TODOS);

/*
        this.fb_CurrentTodos
        .first()
        .subscribe(() => console.log('loading:false'));
*/

        // this.isLoading$.next(true);
        // this.observer.next()
    }

    getData(): Observable<Todo[]> {
        let result$: Observable<Todo[]>;

        result$ = this.fb_CurrentTodos
             .do(x => console.log('aaaaaaaa>', x))
            .map(x => x.map(d => fromFirebaseTodo(d)))
        .do(x => console.log('x>', x));
/*
        result$.subscribe(data => {
            console.log('subscribe>', data);
            this.isLoading$ = Observable.of(true);
        });
*/

        return result$;
        /*
        return this.fb_CurrentTodos
            .do(x => console.log('aaaaaaaa>', x))
            .map(x => x.map(d => fromFirebaseTodo(d)))
            .do(x => console.log('x>', x));
*/
        /*        
                let dummyData: Todo[] =
                    [{
                        $key: 'aaa',
                        description: 'AA-description',
                        name: 'AA-name',
                        index: 0,
                        isComplete: false
                    }];
        
                return Observable.of(dummyData);
        */
    }

    /*
        reorderItemsAndUpdate(indexes: Indexes, todos: ToDo[]) {
            const itemsToSave = [...todos];
            reorderArray(itemsToSave, indexes);
    
            for (let x = 0; x < itemsToSave.length; x++) {
                this.fb_CurrentTodos.update(itemsToSave[x].$key, { index: x });
            }
        }
    */

    removeItem(itemKey: string) {
        this.fb_CurrentTodos.remove(itemKey);
    }

    save(todo: Todo) {
        console.log('save>', todo);

        if (todo.$key === '') {
            // insert.
            this.fb_CurrentTodos.push(toFirebaseTodo(todo));
        } else {
            // update.
            this.fb_CurrentTodos.update(todo.$key, toFirebaseTodo(todo));
        }
    }
}

interface FirebaseTodo {
    description?: string;
    index: number;
    name: string;
    isComplete: boolean;
}

function toFirebaseTodo(todo: Todo): FirebaseTodo {
    //
    let result: FirebaseTodo = {
        description: todo.description,
        index: todo.index,
        name: todo.name,
        isComplete: todo.isComplete
    };

    console.log('toFirebaseTodo>', result);
    return result;
}

function fromFirebaseTodo(x: any): Todo {
    console.log('fromFirebaseTodo');

    let result: Todo = {
        $key: x.$key,
        description: x.description,
        index: x.index,
        isComplete: x.isComplete,
        name: x.name
    };

    if (result.description === undefined) {
        result.description = null;
    }

    if (result.isComplete === undefined) {
        result.isComplete = false;
    }

    return result;
}