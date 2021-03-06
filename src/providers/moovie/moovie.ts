import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies() {
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=" + this.getApiKey());
  }

  getApiKey(): string{ 
    return "025e22d628147e2a913cfc6fdc88c3bc";
  }
}
