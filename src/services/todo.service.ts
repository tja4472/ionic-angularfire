import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { Todo } from '../models/todo';
import { AfoListObservable, AngularFireOfflineDatabase } from "../dsrc/index";

const FIREBASE_CURRENT_TODOS = '/todo/currentTodos';

// Multiple subscriptions on a FirebaseListObservable #574
// https://github.com/angular/angularfire2/issues/574
// beta.7 

// https://coryrylan.com/blog/angular-2-observable-data-services

// https://dzone.com/articles/how-to-build-angular-2-apps-using-observable-data-1

@Injectable()
export class TodoService {
    private fb_CurrentTodos$: AfoListObservable<any[]>;
    readonly todos$: Observable<Todo[]>

    constructor(
        db: AngularFireOfflineDatabase,
    ) {
        console.log('TodoService:constructor');
        this.fb_CurrentTodos$ = db.list(FIREBASE_CURRENT_TODOS);

        this.todos$ = this.fb_CurrentTodos$
            .map(x => x.map((d: any) => fromFirebaseTodo(d)));

        this.fb_CurrentTodos$.subscribe(x => {
            console.log('this.fb_CurrentTodos$.subscribe', x);
        });

    }

    getData(): Observable<Todo[]> {
        return this.todos$;

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
        this.fb_CurrentTodos$.remove(itemKey);
    }
    // {$key: "-KXpuvXAo3jYqlp5s8OH", description: "222", index: 1, isComplete: false, name: "second"}
    aaaaa() {
        console.log('aaaaa');

        let desc: string = 'a' + Math.random();
        let zzz: FirebaseTodo = { description: desc, index: 1, isComplete: false, name: "second" };
        this.fb_CurrentTodos$.update("-KXpuvXAo3jYqlp5s8OH", zzz);
        //this.fb_CurrentTodos$.update("-KXpuvXAo3jYqlp5s8OH", {description: desc, index: 1, isComplete: false, name: "second"});  
    }
    save(todo: Todo) {
        console.log('save>', todo);



        if (todo.$key === '') {
            // insert.
            this.fb_CurrentTodos$.push(toFirebaseTodo(todo));
        } else {
            // update.
            // this.fb_CurrentTodos$.update(todo.$key, toFirebaseTodo(todo));
            /*
                        // Single subscribe.
                        let desc: string = 'a' + Math.random();
                        let zzz: FirebaseTodo = {description: desc, index: 1, isComplete: false, name: "second"};
                        this.fb_CurrentTodos$.update("-KXpuvXAo3jYqlp5s8OH", zzz);
            */
            // Double subscribe. Property order different.
            let zzzTodo = Object.assign({}, todo);
            let desc: string = 'a' + Math.random();
            let zzz1: FirebaseTodo = {
                name: zzzTodo.name,
                isComplete: zzzTodo.isComplete,
                index: zzzTodo.index,
                description: desc,
            };
            let zzz: FirebaseTodo = { description: desc, index: 1, isComplete: false, name: "second" };

            console.log('A>', zzz);
            console.log('B>', zzz1);

            this.fb_CurrentTodos$.update("-KXpuvXAo3jYqlp5s8OH", zzz1);
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