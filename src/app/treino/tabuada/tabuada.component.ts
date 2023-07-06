import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Treino } from 'src/app/model/treino';
import { Tabuada } from './../../model/tabuada';

declare var window: any;

@Component({
  selector: 'app-tabuada',
  templateUrl: './tabuada.component.html',
  styleUrls: ['./tabuada.component.css']
})
export class TabuadaComponent implements OnInit {

  @ViewChild('relatorio', { static: false }) relatorioElement!: ElementRef;

  formModal: any;
  formFinalizarTreinoModal: any;
  tabuadaForm!: FormGroup;
  submitted = false;

  tabuada!:Tabuada;
  treino!:Treino;

  messageTitle: string = 'Resultado do treino';
  messageInfo!: string;

  tabuadas: any[];
  treinos: any[];

  tabuadaPreCalculada:boolean = true;

  id:number = 1

  constructor(
    private fb: FormBuilder
  ) { 
    this.tabuada = new Tabuada();
    this.tabuadas = [];
    this.treinos = [];

    this.gerarTabuadas();
    console.table(this.tabuadas);
  }

  ngOnInit(): void {

    this.novoTreino();

    this.tabuadaForm = this.fb.group({
      numero1: ['', [Validators.required]],
      numero2: ['', [Validators.required]],
      resultado: ['', Validators.required]
    });

    console.log(this.tabuada);
    this.tabuadaForm.patchValue(this.tabuada);

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('treinoModal')
    );

    this.formFinalizarTreinoModal = new window.bootstrap.Modal(
      document.getElementById('finalizarTreino')
    );

  }

  openFormModal() {
    if (this.tabuadaForm.valid) {
      this.formModal.show();
    }
  }
      
  random() : number {
    let min = 0, max = 10;
    return Math.floor(Math.random() * (max - min) + min);
  }

  random100() : number {
    let min = 0, max = 100;
    return Math.floor(Math.random() * (max - min) + min);
  }

  get tabuadaFormControl() {
    return this.tabuadaForm.controls;
  }

  onSubmit(value: Tabuada) {

    debugger;

    this.submitted = true;
    if (this.tabuadaForm.valid) {

      let certo = (this.tabuada.numero1 * this.tabuada.numero2) == parseInt(value.resultado);
      if(certo) {
        this.messageInfo = 'Você acertou, parabéns !!!';
      } else {
        this.messageInfo = 'Resposta errada, tente novamente!';
      }

      this.treinos.push(this.treino);
      this.treino.finalizarTreino(certo);

    }
  }

  novoTreino() {

    debugger;

    //if(this.treino) {
    //  this.treinos.push(this.treino);
    //  this.treino.finalizarTreino();
    //}
    
    this.id = this.id + 1;
    this.treino = new Treino();

    if(this.tabuadaPreCalculada) {
      let indice = this.random100();
      this.tabuada = this.tabuadas[indice];
    } else {
      this.tabuada.numero1 = this.random();
      this.tabuada.numero2 = this.random();
    }

    this.treino.criarTreino(this.id, this.tabuada);
    this.treinos.push(this.treino);

    if(this.tabuadaForm && this.formModal) {
      this.tabuadaForm.patchValue(this.tabuada);
      this.formModal.hide();
    }

  }

  terminarTreino() {
    debugger;

    //if(this.treino) {
    //  this.treinos.push(this.treino);
    //  this.treino.finalizarTreino();
    //}

    this.gerarRelatorioTreinos();
    this.formFinalizarTreinoModal.show();
    
    this.treino;
    this.treinos = [];
  }

  gerarTabuadas() {

    for(var i = 0; i <= 10; i++) {
      for(var j = 0; j <= 10; j++) {
        let tabuadaTemp = new Tabuada();
        tabuadaTemp.numero1 = i;
        tabuadaTemp.numero2 = j;

        this.tabuadas.push(tabuadaTemp);
      }
    }
  }

  gerarRelatorioTreinos() {
    let treino:Treino;
    
    for(var index = 0; index <= this.treinos.length - 1; index++) {
      treino = this.treinos[index];

      this.relatorioElement.nativeElement.innerHTML = '<font color=black></font>';

      this.relatorioElement.nativeElement.innerHTML += `
        ${this.treinos[index].tabuada.numero1} X ${this.treinos[index].tabuada.numero2} = ${this.treinos[index].tabuada.resultado}1
      `;

      if(this.treinos[index].certo) {
          this.relatorioElement.nativeElement.innerHTML += ' <font color=green>Certo</font><br>';
      } else {
        this.relatorioElement.nativeElement.innerHTML += ' <font color=green>Errado</font><br>';
      }


    }

    this.messageTitle = 'Resultado do treino';

  }

}
