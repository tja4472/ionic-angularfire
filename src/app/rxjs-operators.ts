// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable

// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators we need for THIS app.


// Statics
/*
// import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/from';
*/
import 'rxjs/add/observable/of';

// Operators
/*
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/operator/concatMap';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/let';

import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';

import '@ngrx/core/add/operator/select';
*/
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
// import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';

// import 'rxjs/add/operator/mergeMap';