const CODES = {
    A: 65,
    Z: 90
}

//Function wrapping incoming arrays into a HTML-template of the row
function createRow(index, content) {
    const resize = index ? '<div class="row-resize"></div>' : ''
    return `
        <div class="row">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

//Wrapping incoming array into a HTML-template of the column
function toColumn(col) {
    return `<div class="column">
    ${col}
    <div class="col-resize"></div>
    </div>`
}


//Allows to give column names automatically
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
} 

//Passes HTML-template of the cell for each parameter in massive 
function toCell() {
    return `<div class="cell" contenteditable></div>`
}

//Main function forming a table
export function createTable(rowsCount) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')
    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}