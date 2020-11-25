import {ExcelComponent} from '@core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  //New function createTable allows automatically create and output table with necessary number of rows
  toHTML() {
    return createTable(20) 
  }
}
