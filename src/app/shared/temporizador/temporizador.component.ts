import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['./temporizador.component.css']
})
export class TemporizadorComponent implements OnInit {

  @ViewChild('temporizador', { static: false }) temporizadorElement!: ElementRef;

  id!:any;
  timer = 30;

  constructor() { }

  ngOnInit(): void {
    this.id = setInterval(() => {
      this.temporizador();
    }, 1000);
  }

  temporizador() {

    this.timer = this.timer - 1;
    console.log(this.timer + " segundos");

    this.temporizadorElement.nativeElement.innerHTML = this.timer + " segundos";

    if (this.timer <= 0) {
      clearInterval(this.id);
      this.temporizadorElement.nativeElement.innerHTML = 'TEMPO EXPIRADO';
      this.temporizadorElement.nativeElement.style.color = 'red';
    }

  }

}
