function getNumber(str, ignoreDecimalPointOnEnd = true) {
    let num = str.replace(/[^\d.]/g, '')
    if (ignoreDecimalPointOnEnd && num.slice(-1) === '.') num = num.slice(0, num.length - 1)
    return num
}

function reduceFraction(numerator, denominator) {
    if (numerator % 2 == 0 && numerator !== 0)
        return reduceFraction(numerator / 2, denominator / 2)
    return numerator + "/" + denominator
}

function clearDisplay() {
    setInput("0")
    setOutput("0")
    setRounding("±")
}

function press(num) {
    let oldVal = getInput(false)
    if (oldVal == 0) oldVal = ""
    setInput(oldVal + num)
    convertSize()
}

function backspace() {
    const oldVal = getInput(false)
    let newVal = oldVal.substring(0, oldVal.length - 1)
    if (newVal.length === 0) {
        clearDisplay()
        return
    }
    setInput(newVal)
    convertSize()
}

function convertSize() {
    if (isNaN(getInput()) || getInput() === "") {
        setOutput("0")
        setRounding("±")
        return
    }

    // Convert to inches.
    const inches = getInput() / 2.54
    const wholeInches = Math.trunc(inches)
    // Convert decimal value to 16ths
    const fraction = (inches - wholeInches) * 16
    const roundedFraction = Math.round(fraction)
    const reducedFraction = reduceFraction(roundedFraction, 16)
    // Find remainder
    let remainder = fraction - roundedFraction
    remainder = (Math.trunc(remainder * 100)) / 100
    remainder += remainder < 0
            ? "❌"
            : "✔️"

    // Show output.
    if (reducedFraction === "1/1") {
        setOutput(wholeInches + 1)
    } else if (reducedFraction === "0/16") {
        setOutput(wholeInches)
    } else {
        setOutput(wholeInches + " " + reducedFraction)
    }
    setRounding(remainder)
}

function getInput(ignoreDecimalPointOnEnd = true) {
    return getNumber(document.getElementById("input").innerHTML, ignoreDecimalPointOnEnd)
}

function setInput(value) {
    document.getElementById("input").innerHTML = value + " cm"
}

function setOutput(value) {
    let newValue = value.toString()
    let index = newValue.indexOf(" ")
    newValue = index !== -1
            ? value.slice(0, index) + "\"" + value.slice(index)
            : value + "\""
    document.getElementById("output").innerHTML = newValue
}

function setRounding(value) {
    document.getElementById("rounding").innerHTML = value
}
