import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";

export interface PeriodicElement {
  name: string;
  id: number;
  path: string;
  hasChild: boolean;
  pId: number;
}

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent {
  itemsList: PeriodicElement[] = [
    {id: 1, name: 'Folder 1', path: 'folder', hasChild: true, pId: 0},
    {id: 2, name: 'Folder 2', path: 'folder', hasChild: false, pId: 0}
  ];

  // getExamples(n: number) {
  //   return [... Array(n).keys()];
  // }


  menuTopLeftPosition =  {x: 0, y: 0}; 
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger!: MatMenuTrigger; 
 
  /** 
   * Method called when the user click with the right button 
   * @param event MouseEvent, it contains the coordinates 
   * @param item Our data contained in the row of the table 
   */ 
  onRightClick(event: MouseEvent, item: {content: string}): void { 
  
    // preventDefault avoids to show the visualization of the right-click menu of the browser 
    event.preventDefault(); 
  
    // we record the mouse position in our object 
    this.menuTopLeftPosition.x = event.clientX; 
    this.menuTopLeftPosition.y = event.clientY; 
  
    // we open the menu 
    // we pass to the menu the information about our object 
    this.matMenuTrigger.menuData = {item: item}; 
  
    // we open the menu 
    this.matMenuTrigger.openMenu(); 
  
  } 

  doubleClick() {
    this.itemsList = [
      {id: 1, name: 'Folder 11', path: 'folder', hasChild: true, pId: 0},
      {id: 2, name: 'Folder 12', path: 'folder', hasChild: false, pId: 0},
    ];
  }
}
