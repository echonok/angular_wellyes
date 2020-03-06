import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  saveUser(user) {
    return this.http.post('http://localhost:3000/api/saveUser/', user)
      .map((response: Response) => response.json())
  }
  getUser (): Observable<users[]> {
    console.log(this.http.get<users[]>('http://localhost:3000/api/getUser/'))
    return this.http.get<users[]>('http://localhost:3000/api/getUser/')
      //.map((response: Response) => response.json())
  }
  deleteUser(id) {
    return this.http.post('http://localhost:3000/api/deleteUser/', {'id': id})
      .map((response: Response) => response.json())
  }
  test() {
    console.log('test!')
  }
}
