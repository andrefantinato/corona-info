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
      url: "https://www.linkedin.com/in/andre-fantinato/"
    },
    {
      nome: "Jhonatan Rampim",
      avatar: "jhonatan.jpg",
      url: "https://www.linkedin.com/in/jhonatan-rampim/"
    },
    {
      nome: "Kirk Daves",
      avatar: "kirk.jpg",
      url: "https://www.linkedin.com/in/kirk-daves/"
    },
    {
      nome: "Willian Calefi",
      avatar: "willian.jpg",
      url: "https://www.linkedin.com/in/willian-calefi-4134091a4/"
    }
  ];
  colabs = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

}
