import {ExcelComponent} from '@core/ExcelComponent'
import { $ } from "@core/dom"
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize } from './table.functions'
import { isCell } from './table.functions'
import { TableSelection } from './TableSelection'
import { matrix } from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  //Function createTable allows automatically create and output table with necessary number of rows
  toHTML() {
    return createTable(20) 
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  //Decomposed logic of the resize
  onMousedown(event) {
    
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey === true) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        
        const $cells = matrix(target, current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
}
