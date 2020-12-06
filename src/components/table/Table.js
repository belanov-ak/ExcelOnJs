import {ExcelComponent} from '@core/ExcelComponent'
import { $ } from "@core/dom"
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { TableSelection } from './TableSelection'
import {nextSelector, matrix, isCell, shouldResize} from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
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

    this.emitter.subscribe('Formula input', text => {
      this.selection.current.text(text)
    })
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

  onKeydown(event) {
    const keys = [
      'Enter',
      'ArrowDown',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
    }
  }
}


