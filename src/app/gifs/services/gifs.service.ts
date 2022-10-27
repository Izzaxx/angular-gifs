import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey   : string = 'MY4BaVccmHDwnR72uHcTnbqWbIUjL9yq';
  private _history : string[] = [];

  public results   : Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor( private http: HttpClient ) {

    this._history = JSON.parse( localStorage.getItem('history')! ) || [];

  }

  public searchGifs( query: string = '' ) {
    
    query = query.trim().toLocaleLowerCase();

    if ( query.trim().length === 0 ) return;
    
    if ( !this._history.includes( query ) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));

    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=MY4BaVccmHDwnR72uHcTnbqWbIUjL9yq&q=${ query }&limit=12`)
      .subscribe( ( res ) => {
        console.log( res.data );
        this.results = res.data;
      });
    
  }

}
