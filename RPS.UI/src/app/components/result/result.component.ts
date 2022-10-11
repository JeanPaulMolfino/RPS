import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  winnerPlayer = localStorage.getItem('winnerPlayer') as string;
  constructor(private router: Router) {}
  playAgain() {
    //Limpia storage y volvemos a jugar
    localStorage.clear();
    this.router.navigate(['/']);
  }
  ngOnInit(): void {}
}
