import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabuadaComponent } from './treino/tabuada/tabuada.component';

const routes: Routes = [
  {
    path: 'treino/tabuada', component: TabuadaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
