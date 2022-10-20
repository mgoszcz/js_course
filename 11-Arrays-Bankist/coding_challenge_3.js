/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(function (age) {
    if (age <= 2) {
      return age * 2;
    } else {
      return 16 + age * 4;
    }
  });
  const humanAgesAdult = humanAges.filter(age => age >= 18);
  //   const averageHumanAge =
  //     humanAgesAdult.reduce((acc, age) => acc + age) / humanAgesAdult.length;

  const averageHumanAge = humanAgesAdult.reduce(
    (acc, age, index, arr) => acc + age / arr.length,
    0
  );
  console.log(humanAges);
  console.log(humanAgesAdult);
  console.log(averageHumanAge);
};

const calcAverageHumanAgeChain = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(calcAverageHumanAgeChain([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeChain([16, 6, 10, 5, 6, 1, 4]));
