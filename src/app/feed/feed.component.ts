import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { NewsRss } from '../interface/news-rss';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  RssData: NewsRss;
  filtro: string[] = ['saude', 'corona', 'covid19', 'covid-19', 'pandemia', 'Corona Vírus', 'Covid-19', 'Vírus', 'Corona',  'quarentena', 'Coronavírus', 'coronavírus'];
  news: string[] = [];

  constructor(private globals: Globals, private http: HttpClient) { }

  async ngOnInit() {
    this.news.push('https://www.noticiasdeararas.com.br/feed/','https://www.jornalcidade.net/rss','https://conchalemnoticias.com.br/rss', 'https://opopularmm.com.br/rss', 'https://reporterbetoribeiro.com.br/rss')
    this.news.map(async url => {
      await this.getFeed(url);
     });    
  }

  async getFeed(url: string) {
    if (this.globals.finished) { return; }

    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text'
    };
    this.http
      .get<any>('https://cors-anywhere.herokuapp.com/' + url, requestOptions)
      .subscribe(data => {
        const parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssData = result;
          this.RssData.rss.channel[0].item.forEach(el => {
            const title = this.removeAcento(el.title[0]);
            const description = this.removeAcento(el.description[0]);
            
            for (let i = 0; i < this.filtro.length; i++) {
              if (title.includes(this.filtro[i]) || description.includes(this.filtro[i])) {
                el.description[0] = el.description[0].replace(/<\/?[^>]+(>|$)/g, '');
                this.globals.itens.push(el);
                break;
              }
            }
          });
        });

      }); 
  }

  removeAcento (text: string) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
  }
}
