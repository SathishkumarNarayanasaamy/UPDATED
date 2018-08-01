import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { GlobalVariable } from '../globalConfig';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class  WinderService {
  public baseApiUrl = GlobalVariable.BASE_API_URL;
  public baseFolderUrl = GlobalVariable.BASE_FOLDER_URL;

  // private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private http: Http,
    private router: Router
  ) {}


  addJumbo(data) {
   return this.http.post(this.baseApiUrl + 'rewinder-prod/jumbo', data)
    .share()
    .map((response: Response) => {
       return response.json();
    });
  }

  //jumbo_breaks
  addJumboBreaks(data) {
    return this.http.post(this.baseApiUrl + 'rewinder-prod/jumbo_breaks', data)
     .share()
     .map((response: Response) => {
        return response.json();
     });
   }

  getJumboDetails() {
    return this.http.get(this.baseApiUrl + 'rewinder-prod/details')
     .share()
     .map((response: Response) => {
        return response.json();
     });
   }


  //  breaks_details
  getJumboBreaks(_id) {
    return this.http.get(this.baseApiUrl + 'rewinder-prod/breaks_details/'+_id)
     .share()
     .map((response: Response) => {
        return response.json();
     });
   }

  //  delete_breaks
  deleteJumboBreaks(_id) {
    return this.http.delete(this.baseApiUrl + 'rewinder-prod/delete_breaks/'+_id)
     .share()
     .map((response: Response) => {
        return response.json();
     });
   }
}
