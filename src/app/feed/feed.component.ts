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
  source: any;

  constructor(public globals: Globals, private http: HttpClient) { }

  async ngOnInit() {
    this.globals.itens = [];
    this.news.push("https://www.noticiasdeararas.com.br/feed/","http://j1diario.com.br/feed/","https://conchalemnoticias.com.br/rss", "http://noticiadelimeira.com.br/feed/", "https://reporterbetoribeiro.com.br/feed", "https://www.jornaldepiracicaba.com.br/feed/", "https://www.reporternaressi.com.br/feed")
    this.news.forEach(async url => {
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
      .get<any>('https://still-brushlands-53743.herokuapp.com/' + url, requestOptions)
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
                this.source = el;
                this.source.source = this.RssData.rss.channel[0].title;
                this.globals.itens.push(this.source)
                break;
              }
            }
          });
        });
        this.globals.itens.sort(function(a,b){
          a = new Date (a.pubDate[0])
          b = new Date (b.pubDate[0])
          return (a < b) ? 1 : -1;
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
