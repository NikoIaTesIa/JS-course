const square = document.querySelector('.square-body')
const resetBtn = document.querySelector('.btn-reset')

const squareLength = [...square.children].length
const squareSize = Math.sqrt(squareLength)

const actionStack = []

const swapElements = (elem1, elem2) => {
    const cloneElem1 = elem1.cloneNode(true);
    const cloneElem2 = elem2.cloneNode(true);

    elem2.parentNode.replaceChild(cloneElem1, elem2);
    elem1.parentNode.replaceChild(cloneElem2, elem1);
}

square.addEventListener('click', (e) => {
    if (e.target.closest('.arrow')) {
        const arrow = e.target.closest('.arrow')
        const block = e.target.closest('.block')

        const squareNodes = [...square.children]
        const index = squareNodes.indexOf(block)
        const action = { index1: index, index2: 0 }

        let swapIndex

        if (arrow.classList.contains('top')) {
            if (index > squareSize - 1) {
                swapIndex = index - squareSize
            }
        } else if (arrow.classList.contains('bottom')) {
            if (index < squareLength - squareSize) {
                swapIndex = index + squareSize
            }
        } else if (arrow.classList.contains('right')) {
            if (index < squareLength - 1) {
                swapIndex = index + 1
            }
        } else if (arrow.classList.contains('left')) {
            if (index > 0) {
                swapIndex = index - 1
            }
        }

        if (swapIndex !== undefined) {
            action.index2 = swapIndex
            actionStack.push(action)
            swapElements(squareNodes[index], squareNodes[swapIndex])
        }
    }
})

resetBtn.addEventListener('click', () => {
    while (actionStack.length > 0) {
        const squareNodes = [...square.children]
        const action = actionStack.pop()

        swapElements(squareNodes[action.index1], squareNodes[action.index2])
    }
})