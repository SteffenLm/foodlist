import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  public readonly paramMap;
  public readonly data;

  private subject = new ReplaySubject<ParamMap>();
  private dataSubject = new ReplaySubject<ParamMap>();
  constructor() {
    this.paramMap = this.subject.asObservable();
    this.data = this.dataSubject.asObservable();
    this.setParamMap({});
  }

  /** Set the paramMap observable's next value */
  setParamMap(params: Params = {}) {
    this.subject.next(convertToParamMap(params));
  }

  /** Set the paramMap observable's next value */
  setData(data: ParamMap = {} as ParamMap) {
    this.dataSubject.next(data);
  }
}
