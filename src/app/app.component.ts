import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;
  public note:Note;
  public list:Note[]=[];

  constructor(private notesService:NotesService) {
    this.note= new Note();
  }
  
  ngOnInit() {
    
    this.notesService.getNotes().subscribe(
      data=>{
        this.list=data;
      },
      error=> {
        
        this.errMessage=error.message;
        
        
      }
    );
  }

  addNote() {
    
    if(this.note.title==null||this.note.text==null){
      this.errMessage='Title and Text both are required fields';
    }
   else{
    
    this.notesService.addNote(this.note).subscribe(
      data => {
        
        this.list.push(data);
    },
    error =>{
      this.errMessage=error.message;
      
     
      
    }
  
    )
    this.note = new Note();
  
  }
  }
}
