import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
    constructor() {
    }

    getData(): Observable<Todo[]> {
        let dummyData: Todo[] =
            [{
                $key: 'aaa',
                description: 'a',
                name: 'a',
                index: 0,
                isComplete: false
            }];

        return Observable.of(dummyData);
    }
}    