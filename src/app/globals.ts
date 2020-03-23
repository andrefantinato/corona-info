import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  itens: any[] = [];
  itemSelected = 'all';
  finished = false;
}
