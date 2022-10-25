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
    let old = getNumber(document.getElementById("input").innerHTML)
    if (old == 0) old = ""
    document.getElementById("input").innerHTML = old + num + " cm"
}

function backspace() {
    var old = document.getElementById("input").innerHTML
    document.getElementById("input").innerHTML = old.substring(0, old.length - 1)
}

function clearDisplay() {
    document.getElementById("input").innerHTML = "0 cm"
    document.getElementById("output").innerHTML = "0\""
    document.getElementById("rounding").innerHTML = "±"
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
