import { NgModule, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[customTemplate]',
  host: {}
})
export class CustomTemplate {
  @Input() type: string;

  @Input('customTemplate') name: string;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name;
  }
}
