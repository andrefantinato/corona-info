import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {

  colaboradores = [ 
    {
      nome: "André Fantinato",
      avatar: "andre.jpg",
      url: ""
    },
    {
      nome: "Jhonatan Rampim",
      avatar: "jhonatan.jpg",
      url: ""
    },
    {
      nome: "Kirk Daves",
      avatar: "kirk.jpg",
      url: ""
    },
    {
      nome: "Willian Calefi",
      avatar: "willian.jpg",
      url: ""
    }
  ];
  colabs = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

}
