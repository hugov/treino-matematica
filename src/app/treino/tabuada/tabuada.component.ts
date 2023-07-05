import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Tabuada } from './../../model/tabuada';

declare var window: any;

@Component({
  selector: 'app-tabuada',
  templateUrl: './tabuada.component.html',
  styleUrls: ['./tabuada.component.css']
})
export class TabuadaComponent implements OnInit {

  formModal: any;
  tabuadaForm!: FormGroup;
  submitted = false;

  numero1 = 0;
  numero2 = 0;
  resultado = 0;

  messageTitle: string = 'Resultado do treino';;
  messageInfo!: string;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.numero1 = this.randomArbitrary(0, 10);
    this.numero2 = this.randomArbitrary(0, 10);

    this.tabuadaForm = this.fb.group({
      numero1: [this.numero1, [Validators.required]],
      numero2: [this.numero2, [Validators.required]],
      resultado: ['', Validators.required]
    });

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('treinoModal')
    );
  }

  openFormModal() {
    this.formModal.show();
  }
      
  randomArbitrary(min: number, max: number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min) + min);
  }

  get tabuadaFormControl() {
    return this.tabuadaForm.controls;
  }

  onSubmit(value: Tabuada) {
    this.submitted = true;
    if (this.tabuadaForm.valid) {

      console.table(value);

      this.numero1 = value.numero1;
      this.numero2 = value.numero2;
      this.resultado = value.resultado;

      let resultadoCalculado = this.numero1 * this.numero2;

      if(resultadoCalculado == this.resultado) {
        
        this.messageInfo = 'Parabéns !!! Você acertou 🫶🏾😁🥳';

        //alert(this.messageTitle + '\n\n' + this.messageInfo);

      } else {
        
        this.messageInfo = 'Precisa treinar mais !!! Você não acertou 🥹🥹🥹';

        //alert(this.messageTitle + '\n\n' + this.messageInfo);

      }

    }
  }

}
