import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ResultComponent } from './components/result/result.component';
import { SelectorComponent } from './components/selector/selector.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'result', component: ResultComponent },
  { path: 'selector', component: SelectorComponent },
  { path: '**', component: MainComponent },
];
@NgModule({
  declarations: [],
  imports: [[RouterModule.forRoot(routes)]],
  exports: [RouterModule],
})
export class AppRoutingModule {}
