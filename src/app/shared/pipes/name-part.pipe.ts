import {Pipe, PipeTransform} from '@angular/core';

/*
 * Split given string in 3 parts
 * 1)name 2)role 3)company
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | namePart:0
 */

@Pipe({
  name: 'namePart'
})
export class NamePartPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // value: Rafael Diaz Cruz - CEO - Alera XXI Consulting | LinkedIn
    // value.split('|') : ["Rafael Diaz Cruz - CEO - Alera XXI Consulting ", " LinkedIn"]

    // find and replace ... with nothing
    value = value.replace("...", "");

    if (args === 0)
    // Rafael Diaz Cruz
      return (((value.split('|')[0]).split(' - '))[0]) ? (((value.split('|')[0]).split(' - '))[0]).trim() : null;
    if (args === 1)
    // CEO
      return (((value.split('|')[0]).split(' - '))[1]) ? (((value.split('|')[0]).split(' - '))[1]).trim() : null;
    if (args === 2)
    // Alera XXI Consulting
      return (((value.split('|')[0]).split(' - '))[2]) ? (((value.split('|')[0]).split(' - '))[2]).trim() : null;
    return null;
  }

}
