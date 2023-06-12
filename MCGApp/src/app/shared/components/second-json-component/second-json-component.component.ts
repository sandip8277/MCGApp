import { Component, OnInit,Input, OnChanges  } from '@angular/core';

@Component({
  selector: 'app-second-json-component',
  templateUrl: './second-json-component.component.html',
  styleUrls: ['./second-json-component.component.scss']
})
export class SecondJsonComponentComponent implements OnInit {
  @Input() panel: any;
  constructor() { }

  ngOnInit(): void {
  }

}
