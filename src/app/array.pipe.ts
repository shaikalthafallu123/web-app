import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {


    transform(countlist : any = []) {
      return Object.values(countlist);
  }

}
