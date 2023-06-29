import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory:string [] = [];
  private apiKey: string = '1k7qBIjf1Hh4aE8qOWbTCEUqaHXaX8lM';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';
  public gifList :Gif [] = [];
  constructor( private http: HttpClient) {
    this.loadHistory();
    console.log('History loaded sucessfull');
   }


  get tagHistory(){
    return [...this._tagsHistory];
  }

  searchTag (tag:string): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams ()
    .set('api_key', this.apiKey)
    .set('q', tag)
    .set('limit','10')
    this.http.get<SearchResponse> (`${this.serviceUrl}/search`, {params})
    .subscribe (resp => {
      this.gifList = resp.data;
    });
  }

  private saveLocalStorage (): void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadHistory ():void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory=JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length===0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldtag) => oldtag !== tag );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }
}
