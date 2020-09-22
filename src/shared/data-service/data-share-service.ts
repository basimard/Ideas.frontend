import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataShareService {

    private messageSource = new BehaviorSubject("default message");
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    sendMessage(message: string) {
        this.messageSource.next(message);
    }

}