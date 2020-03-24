import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  links = [
    {
      title: "O QUE É CORONAVÍRUS? (COVID-19)",
      link: "https://coronavirus.saude.gov.br/"
    },
    {
      title: "DECRETO - SITUAÇÃO DE EMERGÊNCIA EM ARARAS",
      link: "https://www.araras.sp.gov.br/im/files/arquivos_2020/Secom2020/Decreto DE6660_2020.pdf"
    },
    {
      title: "DECRETO - FECHAMENTO DO COMÉRCIO EM ARARAS",
      link: "https://www.araras.sp.gov.br/im/files/arquivos_2020/Secom2020/decreto 6661_2020.pdf"
    }
  ];

  telefones = [
    {
      title: "DENÚNCIAS",
      phone: "153 / (19) 3541-1532"
    },
    {
      title: "HOSPITAL SANTA CASA DE MISERICÓRDIA",
      phone: "(19) 3543-5400"
    },
    {
      title: "HOSPITAL UNIMED",
      phone: "(19) 3543-8300"
    },
    {
      title: "HOSPITAL PRO SAÚDE",
      phone: "(19) 3321-1260"
    }
  ];

  constructor() { }

  ngOnInit() {
    console.log(this.telefones);
  }

}
