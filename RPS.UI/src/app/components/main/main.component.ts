import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { playersnamevalidator } from 'src/app/validators/player-names-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  //Establecemos form qy a cada input le asignamos los validator
  //Tambien se le agrega uno personalizado que maneja si ambos jugadores se llaman igual
  partida = new FormGroup(
    {
      playerOneName: new FormControl('', Validators.required),
      playerTwoName: new FormControl('', Validators.required),
    },
    { validators: playersnamevalidator }
  );

  submit(partida: any) {
    //Revisamos si valido el formulario
    if (partida.valid) {
      //Guardamos en localStorage las variables para el siguiente formulario
      localStorage.setItem(
        'playerOneName',
        partida.controls['playerOneName'].value
      );
      localStorage.setItem(
        'playerTwoName',
        partida.controls['playerTwoName'].value
      );
      localStorage.setItem('turn', 'playerOneTurn');
      localStorage.setItem('rounds', '0');
      //Se va al siguiente formulario
      this.router.navigate(['/selector']);
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
