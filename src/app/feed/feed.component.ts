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
  filtro = ['saude', 'corona', 'ibuprofeno', 'covid19', 'covid-19', 'pandemia'];

  constructor(private globals: Globals, private http: HttpClient) { }

  async ngOnInit() {
    await this.getFeed('https://noticiasdeararas.com.br/feed');
    await this.getFeed('https://reporterbetoribeiro.com.br/feed/');
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
                this.globals.itens['push'](el);
                break;
              }
            }
          });
          console.log(this.globals.itens);
        });

      });


    // const requestOptions: Object = {
    //   observe: 'body',
    //   responseType: 'text'
    // };
    // this.http
    //   .post<any>('http://localhost/rss.php',
    //   {
    //     url: 'https://reporterbetoribeiro.com.br/feed/'
    //   },
    //   requestOptions)
    //   .subscribe(data => {
    //     console.log(data);
    //     const parseString = xml2js.parseString;
    //     parseString(data, (err, result: NewsRss) => {
    //       this.RssData = result;
    //       console.log(this.RssData);
    //     });
    //   });

    // const parser = new Parser();
    // const feed = await parser.parseURL('https://www.reddit.com/.rss');
    // console.log(feed);
    // this.service.getFeed('https://reporterbetoribeiro.com.br/feed/')
    // .subscribe(noticias => {
    //   console.log(noticias);
    //   // if (noticias.length <= 0) { this.globals.finished = true; }

    //   // noticias.forEach(element => {
    //   //   // element.hora_abertura = element.data_abertura.substring(11, 16);
    //   //   this.globals.itens['push'](element);
    //   // });
    // });
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
