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
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
      const type = $resizer.data.resize

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.$el.style.width = value + 'px'
          cells.forEach(el => el.style.width = value + 'px')
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.$el.style.height = value + 'px'
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
      
    }
  }
}
