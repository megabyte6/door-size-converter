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

function backspace() {
    const oldVal = getInput()
    let newVal = oldVal.substring(0, oldVal.length - 1)
    if (newVal.length === 0) {
        newVal = "0"
    }
    setInput(newVal)
}

function clearDisplay() {
    setInput("0")
    setOutput("0")
    setRounding("±")
}

function convertSize() {
    const input = document.getElementById("input")
    const inputVal = getNumber(input.innerHTML)
    const output = document.getElementById("output")
    const outputVal = getNumber(output.innerHTML)
    const rounding = document.getElementById("rounding")
    const roundingVal = getNumber(rounding.innerHTML)
    if (isNaN(inputVal) || inputVal === "") {
        output.innerHTML = "0\""
        rounding.innerHTML = "±"
        return
    }

    // Convert to inches
    var convertedInches = inputVal / 25.4
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
        output.innerHTML = wholeInches + 1
        rounding.innerHTML = remainder
    } else if (fractionStr === "0/16") {
        output.innerHTML = wholeInches
        rounding.innerHTML = remainder
    } else {
        output.innerHTML = wholeInches + " " + fractionStr
        rounding.innerHTML = remainder
    }
}

function setInput(value) {
    document.getElementById("input").innerHTML = value + " cm"
}

function getInput() {
    return getNumber(document.getElementById("input").innerHTML)
}

function setOutput(value) {
    document.getElementById("output").innerHTML = value + "\""
}

function getOutput() {
    return getNumber(document.getElementById("output").innerHTML)
}

function setRounding(value) {
    document.getElementById("rounding").innerHTML = value
}

function getRounding() {
    return getNumber(document.getElementById("rounding").innerHTML)
}
