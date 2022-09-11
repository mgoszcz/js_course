/* 
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
Hint: Use an if/else statement
*/

const data1 = {
    mark: {
        height: 1.69,
        mass: 78,
    },
    john: {
        height: 1.95,
        mass: 92,
    }
}

const data2 = {
    mark: {
        height: 1.88,
        mass: 95,
    },
    john: {
        height: 1.76,
        mass: 85,
    }
}

function calculateBMI(height, weight) {
    return weight / (height ** 2)
}

function getComparisonMessage(marksBMI, johnsBMI) {
    if (marksBMI > johnsBMI) {
        return `Mark's BMI ${marksBMI} is higher than John's ${johnsBMI}`
    } else {
        return `John's BMI ${johnsBMI} is higher than Mark's ${marksBMI}`
    }
}

const markBMI1 = calculateBMI(data1.mark.height, data1.mark.mass)
const markBMI2 = calculateBMI(data2.mark.height, data2.mark.mass)

const johnBMI1 = calculateBMI(data1.john.height, data1.john.mass)
const johnBMI2 = calculateBMI(data2.john.height, data2.john.mass)

console.log('Mark BMI 1: ' + markBMI1)
console.log('Mark BMI 2: ' + markBMI2)
console.log('John BMI 1: ' + johnBMI1)
console.log('John BMI 1: ' + johnBMI2)

const markHigherBMI1 = (markBMI1 > johnBMI1)
const markHigherBMI2 = (markBMI2 > johnBMI2)

console.log('Data1:')
let marksBMI = markBMI1
let johnsBMI = johnBMI1
console.log(getComparisonMessage(marksBMI, johnsBMI))
console.log('Data2:')
marksBMI = markBMI2
johnsBMI = johnBMI2
console.log(getComparisonMessage(marksBMI, johnsBMI))
