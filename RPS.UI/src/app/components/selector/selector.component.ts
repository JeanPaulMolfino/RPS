import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Movement } from 'src/app/models/movement.model';
import { Result } from 'src/app/models/result.model';
import { MovementsService } from 'src/app/services/movements.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent implements OnInit {
  //Objetos del formulario
  @ViewChild('tablero') tablero!: ElementRef; //Acceso dinamico a el tablero
  partida = new FormGroup({}, {});

  //Objetos para uso del componente
  movements: Movement[] = []; //Registro de movimientos
  selectedOption; //Opcion seleccionada por el usuario
  results: Result[] = []; //Registro de resultados
  playersTurnName; //Nombre del jugador de turno
  rounds = 1; //Rondas

  //Obtengo el nombre de los jugadores de localstorage
  playerOneName = localStorage.getItem('playerOneName') as string;
  playerTwoName = localStorage.getItem('playerTwoName') as string;

  constructor(
    private router: Router,
    private movementsService: MovementsService
  ) {}

  ngOnInit(): void {
    //Revisa si existe informacion del formulario anterior
    this.checkIfDataExist();
    //Jugador uno es el primer jugador en jugar
    this.playersTurnName = this.playerOneName;
    //Carga las opciones de la DB
    this.refillOptions();
  }

  ngAfterViewInit() {
    //Set del selector en el primer movimiento cargado
    this.selectedOption = this.movements[0]?.name as string;
  }
  onSelected(): void {
    //console.log(this.tablero.nativeElement.value);
    //Trigger del cambio de movimiento. Guarda el movimiento seleccionado por el usuario
    this.selectedOption = this.tablero.nativeElement.value;
  }

  submit(partida: any) {
    //Cada ves que los usuarios seleccionen su movimiento
    //Por si es turno del jugador uno despues de movimiento del jugador dos
    if (this.selectedOption === undefined) {
      this.selectedOption = this.movements[0]?.name;
    }

    //Discrimina de quien es el turno y actua
    if (this.playersTurnName == this.playerTwoName) {
      //Rota el usuario de turno
      this.playersTurnName = this.playerOneName;
      localStorage.setItem('turn', 'playerOneTurn');
      localStorage.setItem('playerTwoOption', this.selectedOption as string);
      //Checkea resultado de ronda
      this.checkResult();
      //Checkea si alguien gano
      this.checkWinner();
      //Vuelve a conseguir las opciones desde la base de datos
      this.refillOptions();
      this.selectedOption = this.movements[0]?.name;
      this.rounds++;
    } else {
      //Rota el usuario de turno
      this.playersTurnName = this.playerTwoName;
      localStorage.setItem('turn', 'playerTwoTurn');
      localStorage.setItem('playerOneOption', this.selectedOption as string);
    }
    //this.router.navigate(['/selector']);
  }

  checkIfDataExist() {
    //Si existe data del formulario anterior continua y sino vuelve al formulario anterior
    if (this.playerOneName === null || this.playerTwoName === null) {
      this.router.navigate(['/']);
    }
  }

  refillOptions() {
    //Obtiene la lista de movimientos del de la DB y la adjunta a coleccion
    this.movementsService.getAllMovements().subscribe({
      next: (movements) => {
        this.movements = movements;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  checkResult() {
    //Revisa quien gano
    //Obtienen los objetos que corresponden a cada movimiento
    var playerOneMovement = this.movements.find(
      (i) => i.name === (localStorage.getItem('playerOneOption') as string)
    );
    var playerTwoMovement = this.movements.find(
      (i) => i.name === (localStorage.getItem('playerTwoOption') as string)
    );
    var roundwinner = -1;
    var result;
    if (
      playerOneMovement?.kills === playerTwoMovement?.name &&
      playerTwoMovement?.kills === playerOneMovement?.name
    ) {
      //Esta opcion es por si llegaran a matarse entre ellos
      roundwinner = -1;
    } else if (playerOneMovement?.kills === playerTwoMovement?.name) {
      roundwinner = 0;
    } else if (playerTwoMovement?.kills === playerOneMovement?.name) {
      roundwinner = 1;
    }
    result = {
      round: this.rounds,
      playerOneOption: playerOneMovement,
      playerTwoOption: playerOneMovement,
      winner: roundwinner,
    };
    this.results.push(result);
    //console.log(result);
  }

  checkWinner() {
    //Filtramos la cantidad de partidas ganadas
    var playerOneWins = this.results.filter((i) => i.winner === 0).length;
    var playerTwoWins = this.results.filter((i) => i.winner === 1).length;
    //Discrimina quien gano para luego llevar a la pantalla de ganador
    if (playerOneWins === 3 || playerTwoWins === 3) {
      localStorage.clear();
      if (playerOneWins === 3) {
        localStorage.setItem('winnerPlayer', this.playerOneName);
      } else if (playerTwoWins === 3) {
        localStorage.setItem('winnerPlayer', this.playerTwoName);
      }
      this.router.navigate(['/result']);
    }
  }
}
