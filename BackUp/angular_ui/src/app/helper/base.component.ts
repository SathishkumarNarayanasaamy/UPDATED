import { Directive, Component, OnInit } from '@angular/core';

@Directive({
  selector: 'app-base'
})

export class BaseComponent implements OnInit {

  public test: any = '1';

  constructor() { }

  ngOnInit() {
  }

}


