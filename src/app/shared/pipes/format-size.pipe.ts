import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSize'
})
export class FormatSizePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
