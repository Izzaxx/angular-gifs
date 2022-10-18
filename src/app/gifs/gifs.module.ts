import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './pages/gifs-page/gifs-page.component';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    SearchComponent,
    ResultsComponent
  ],
  exports: [
    GifsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GifsModule { }
