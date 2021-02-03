import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTemplate } from './customTemplate';
@NgModule({
  imports: [CommonModule],
  exports: [CustomTemplate],
  declarations: [CustomTemplate]
})
export class SharedModule {}
