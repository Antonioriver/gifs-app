import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}
  searchTag () {
    const newTag = this.tagInput.nativeElement.value;
    // console.log({newTag});
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value='';
  }
}