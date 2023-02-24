import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor() {
  }

  headingObject = new BehaviorSubject('');
  heading = this.headingObject.asObservable();
  setHeading(heading: string) {
    this.headingObject.next(heading);
  }
}
