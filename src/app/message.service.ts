import { Injectable } from '@angular/core';
import { Message, Severity } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = this.getDummyMessages();

  constructor() { }

  add(message: Message): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }

  getDummyMessages(): Message[] {
    let messages = [];
    let msg = new Message('This is an info message', Severity.INFO, new Date(), null);
    messages.push(msg);
    msg = new Message('This is a warning message', Severity.WARNING, new Date(), null);
    messages.push(msg);
    msg = new Message('This is a debug message', Severity.DEBUG, new Date(), null);
    messages.push(msg);
    msg = new Message('This is an error message', Severity.ERROR, new Date(), null);
    messages.push(msg);
    msg = new Message('This is a fatal message', Severity.FATAL, new Date(), null);
    messages.push(msg);

    return messages;
  }
}
