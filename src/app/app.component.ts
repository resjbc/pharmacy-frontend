import { Component, OnInit } from '@angular/core';
declare const App;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  ngOnInit(): void {
    App.initialLoadPage();
  }
 
}
