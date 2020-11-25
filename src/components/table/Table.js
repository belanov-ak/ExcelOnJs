import {ExcelComponent} from '@core/ExcelComponent'
import { createTable } from './table.template'
import {$} from '@core/dom'

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

  //A piece of code implementing resize of elements
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizeble"]')
      const coords = $parent.getCoords()

      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        const value = coords.width + delta

        $parent.$el.style.width = value + 'px'
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
      
    }
  }
}
