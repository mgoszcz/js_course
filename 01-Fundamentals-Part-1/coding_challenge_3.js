/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
team only wins if it has a higher score than the other team, and the same time a
score of at least 100 points. Hint: Use a logical operator to test for minimum
score, as well as multiple else-if blocks 😉
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
both teams have the same score and both have a score greater or equal 100
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/

const data1 = {
    dolphins: [96, 108, 89],
    koalas: [88, 91, 110]
}

const data2 = {
    dolphins: [97, 112, 101],
    koalas: [109, 95, 123]
}
const data3 = {
    dolphins: [97, 112, 101],
    koalas: [109, 95, 106]
}

function sum(valuesList) {
    let result = 0
    for (const value of valuesList) {
        result += value
    }
    return result
}

function calculateAverage(valuesList) {
    return sum(valuesList) / valuesList.length
}

function printWinner(dolphins_avg, koalas_avg) {
    if (dolphins_avg > koalas_avg) {
        console.log('Dolphins win!')
    } else if (dolphins_avg < koalas_avg) {
        console.log('Koalas win!')
    } else {
        console.log('Draw!')
    }

}

function printWinnerBonus(dolphins_avg, koalas_avg) {
    if (dolphins_avg > koalas_avg && dolphins_avg >= 100) {
        console.log('Dolphins win!')
    } else if (dolphins_avg < koalas_avg && koalas_avg >= 100) {
        console.log('Koalas win!')
    } else if (dolphins_avg === koalas_avg && koalas_avg >= 100 && dolphins_avg >= 100) {
        console.log('Draw!')
    } else {
        console.log('No winner')
    }

}


console.log('Calculate avg')
let dolphins_avg = calculateAverage(data1.dolphins)
let koalas_avg = calculateAverage(data1.koalas)
console.log(`Dolphins average: ${dolphins_avg}, Koalas average: ${koalas_avg}`)
printWinner(dolphins_avg, koalas_avg)
console.log('The same with bonus calculation')
printWinnerBonus(dolphins_avg, koalas_avg)


console.log('Bonus 1')
console.log('Calculate avg')
dolphins_avg = calculateAverage(data2.dolphins)
koalas_avg = calculateAverage(data2.koalas)
console.log(`Dolphins average: ${dolphins_avg}, Koalas average: ${koalas_avg}`)
printWinnerBonus(dolphins_avg, koalas_avg)

console.log('Bonus 2')
console.log('Calculate avg')
dolphins_avg = calculateAverage(data3.dolphins)
koalas_avg = calculateAverage(data3.koalas)
console.log(`Dolphins average: ${dolphins_avg}, Koalas average: ${koalas_avg}`)
printWinnerBonus(dolphins_avg, koalas_avg)

