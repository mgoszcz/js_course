/*
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
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

console.log('Mark higher BMI1: ' + markHigherBMI1)
console.log('Mark higher BMI2: ' + markHigherBMI2)