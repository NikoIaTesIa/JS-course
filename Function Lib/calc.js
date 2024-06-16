const calc = (price) => {
    // const commonParentBlock
    // const inputNode1, inputNode2
    // const totalValueNode
    // const ...

    let animationId

    const countCalc = () => {
        // some calculations...

        if (inputNode1.value && inputNode2.value) {
            // totalValue = ...
            calcAnimation(totalValue)
        } else {
            // totalValueNode.textContent = totalValue
        }
    }

    const calcAnimation = (
        value,
        currentValue = 0,
        stepValue = Math.pow(10, `${value}`.length - 2)
    ) => {
        if (currentValue === value) {
            totalValueNode.textContent = currentValue
            cancelAnimationFrame(animationId)
        } else {
            const stepExp = `${stepValue}`.length - 1
            const diffExp = `${value - currentValue}`.length - 1

            if (diffExp === stepExp - 1) {
                stepValue = stepExp - 1 >= 0 ? Math.pow(10, stepExp - 1) : Math.pow(10, 0)
            }

            currentValue += stepValue
            totalValueNode.textContent = currentValue

            animationId = requestAnimationFrame(() => { calcAnimation(value, currentValue, stepValue) })
        }
    }

    commonParentBlock.addEventListener('input', (e) => {
        if (e.target === inputNode1 || e.target === inputNode2) {
            if (animationId) { cancelAnimationFrame(animationId) }
            countCalc()
        }
    })
}

export default calc