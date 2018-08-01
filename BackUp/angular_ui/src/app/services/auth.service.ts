import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { GlobalVariable } from '../globalConfig';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class  AuthService {
  public baseApiUrl = GlobalVariable.BASE_API_URL;
  public baseFolderUrl = GlobalVariable.BASE_FOLDER_URL;

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    if (localStorage.getItem('User')) {
        this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }
  constructor(
    private http: Http,
    private router: Router
  ) {}


  login(userDetail) {
   return this.http.post(this.baseApiUrl + 'user/login', userDetail)
    .share()
    .map((response: Response) => {
      const result = response.json();
      if (result.status === 400) {
        this.loggedIn.next(false);
      } else {
        this.loggedIn.next(true);
      }
       return response.json();
    });
  }

  logout() {
    localStorage.removeItem('User');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
