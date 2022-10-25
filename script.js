function getNumber(str) {
    return str.replace(/[^\d.]/g, '')
}

function reduceFraction(numerator, denominator) {
    if (numerator % 2 == 0 && numerator !== 0) {
        return reduceFraction(numerator / 2, denominator / 2)
    }
    return numerator + "/" + denominator
}

function press(num) {
    let oldVal = getInput()
    if (oldVal == 0) oldVal = ""
    setInput(oldVal + num)
}

function clearDisplay() {
    setInput("0")
    setOutput("0")
    setRounding("±")
}

function backspace() {
    const oldVal = getInput()
    let newVal = oldVal.substring(0, oldVal.length - 1)
    if (newVal.length === 0) {
        newVal = "0"
    }
    setInput(newVal)
}

function convertSize() {
    const input = document.getElementById("input")
    const inputVal = getNumber(input.innerHTML)
    const output = document.getElementById("output")
    const outputVal = getNumber(output.innerHTML)
    const rounding = document.getElementById("rounding")
    const roundingVal = getNumber(rounding.innerHTML)
    if (isNaN(getInput()) || getInput() == "") {
        output.innerHTML = "0\""
        rounding.innerHTML = "±"
        return
    }

    // Convert to inches
    var convertedInches = getInput() / 25.4
    // Get whole inches
    var wholeInches = Math.trunc(convertedInches)
    // Get the decimal remainder of the whole inches as sixteenths
    var fractionOfAnInch = (convertedInches - wholeInches) * 16
    // Get sixteenths
    var roundedFraction = Math.round(fractionOfAnInch)
    // Check if the rounded value is above or below the true value
    var remainder = fractionOfAnInch - roundedFraction
    remainder = (Math.trunc(remainder * 100)) / 100
    remainder = remainder < 0 ? remainder + "❌" : remainder + "✔️"
    // Reduce fraction
    var fractionStr = reduceFraction(roundedFraction, 16)

    // Show output
    if (fractionStr === "1/1") {
        setOutput(wholeInches + 1)
    } else if (fractionStr === "0/16") {
        setOutput(wholeInches)
    } else {
        setOutput(wholeInches + " " + fractionStr)
    }
    setRounding(remainder)
}

function getInput() {
    return getNumber(document.getElementById("input").innerHTML)
}

function setInput(value) {
    document.getElementById("input").innerHTML = value + " cm"
}

function getOutput() {
    return getNumber(document.getElementById("output").innerHTML)
}

function setOutput(value) {
    let newValue = value
    let index = value.indexOf(" ")
    if (index !== -1) {
        newValue = value.slice(0, index) + "\"" + value.slice(index)
    } else {
        newValue = value + "\""
    }
    document.getElementById("output").innerHTML = newValue
}

function getRounding() {
    return getNumber(document.getElementById("rounding").innerHTML)
}

function setRounding(value) {
    document.getElementById("rounding").innerHTML = value
}
