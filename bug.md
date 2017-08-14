```typescript
export class TodoService {
    private fb_CurrentTodos$: AfoListObservable<any[]>;

    constructor(
        db: AngularFireOfflineDatabase,
    ) {
        console.log('TodoService:constructor');
        this.fb_CurrentTodos$ = db.list(FIREBASE_CURRENT_TODOS);

        this.fb_CurrentTodos$.subscribe(x => {
            console.log('this.fb_CurrentTodos$.subscribe', x);
        });
    }
```
When connected this will cause the subscribe to be called once.
```typescript
let desc: string = 'a' + Math.random();
this.fb_CurrentTodos$.update("-KXpuvXAo3jYqlp5s8OH",
    {
        description: desc,
        index: 1,
        isComplete: false,
        name: "second",
    });
```
When connected this will cause the subscribe to be called twice.
```typescript
let desc: string = 'a' + Math.random();
this.fb_CurrentTodos$.update("-KXpuvXAo3jYqlp5s8OH",
    {
        description: desc,
        isComplete: false,                
        index: 1,
        name: "second",
    }); 
```
Note that the order of the fields is different.

```typescript
  uniqueNext(newValue) {
    console.log('uniqueNext');
    // Sort
    if (this.previousValue) { this.previousValue.sort((a, b) => a.$key - b.$key); }
    if (newValue) { newValue.sort((a, b) => a.$key - b.$key); }

    console.log('uniqueNext:previousValue', this.previousValue);
    console.log('uniqueNext:newValue', newValue);

    if (this.updated > 1 || (stringify(this.previousValue) !== stringify(newValue))) {
      this.previousValue = Object.assign([], newValue);
      console.log('uniqueNext:this.next(newValue) ***********');
      this.next(newValue);
      this.updated++;
    }
  }
```
Chrome log

```
internal-list-observable.ts:126 updateSubscribers
internal-list-observable.ts:72 uniqueNext
internal-list-observable.ts:77 uniqueNext:previousValue [{…}]0: {description: "a0.9693274861715127", index: 1, isComplete: false, name: "second", $exists: ƒ, …}length: 1__proto__: Array(0)
internal-list-observable.ts:78 uniqueNext:newValue [{…}]0: {description: "a0.12690608011070337", isComplete: false, index: 1, name: "second", $exists: ƒ, …}length: 1__proto__: Array(0)
internal-list-observable.ts:82 uniqueNext:this.next(newValue) ***********

internal-list-observable.ts:72 uniqueNext
internal-list-observable.ts:77 uniqueNext:previousValue [{…}]0: {description: "a0.12690608011070337", isComplete: false, index: 1, name: "second", $exists: ƒ, …}length: 1__proto__: Array(0)
internal-list-observable.ts:78 uniqueNext:newValue [{…}]0: {description: "a0.12690608011070337", index: 1, isComplete: false, name: "second", $exists: ƒ, …}length: 1__proto__: Array(0)
internal-list-observable.ts:82 uniqueNext:this.next(newValue) ***********

todo.service.ts:34 this.fb_CurrentTodos$.subscribe [{…}]0: {description: "a0.12690608011070337", isComplete: false, index: 1, name: "second", $exists: ƒ, …}length: 1__proto__: Array(0)
todo.service.ts:134 fromFirebaseTodo
todo.service.ts:34 this.fb_CurrentTodos$.subscribe [{…}]0: {description: "a0.12690608011070337", index: 1, isComplete: false, name: "second", $exists: ƒ, …}length: 1__proto__: Array(0)
todo.service.ts:134 fromFirebaseTodo
```

For the second 'this.next' the array is identical apart from the field ordering

previousValue
```
0: {description: "a0.12690608011070337", isComplete: false, index: 1, name: "second", $exists: ƒ, …}
```
newValue
```
0: {description: "a0.12690608011070337", index: 1, isComplete: false, name: "second", $exists: ƒ, …}
```

