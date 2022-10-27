import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey      : string = 'MY4BaVccmHDwnR72uHcTnbqWbIUjL9yq';
  private serviceUrl  : string = 'https://api.giphy.com/v1/gifs';
  private _history    : string[] = [];

  public results   : Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor( private http: HttpClient ) {

    this._history = JSON.parse( localStorage.getItem('history')! ) || [];
    this.results = JSON.parse( localStorage.getItem('results')! ) || [];

  }

  public searchGifs( query: string = '' ) {
    
    query = query.trim().toLocaleLowerCase();

    if ( query.trim().length === 0 ) return;
    
    if ( !this._history.includes( query ) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));

    }

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>( `${ this.serviceUrl }/search`, { params} )
      .subscribe( ( res ) => {
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
    
  }

}
