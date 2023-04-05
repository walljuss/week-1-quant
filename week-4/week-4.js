// ----==== JS School - Lecture 4 HW ====---- 

/**
 * Сriteria for assessment
 * 
 * 5 - All tasks are correctly solved (23 items), the code is clean, the solutions are optimal;
 * 4 - Correctly solved all the tasks of the base block (15 tasks), the code is clean;
 * 3 - At least 10 problems are correctly solved, the code is clean;
 * 2 - Correctly solved at least 10 problems;
 * 1 - At least 5 problems solved correctly.
 */

/**
 * Warning
 * 
 * Do not rename function names or change arguments.
 */

// ----==== Basic exercises (15 items) ====---- 
/**
  * Exercise 1
  *
  * Write a function that returns odd array values.
  * [1,2,3,4] => [1,3]
  */
const getOddValues = numbers => {
  return numbers.filter(x => (x % 2 == 1));
};
/**
  * Exercise 2
  *
  * Write a function that returns the smallest value of an array
  * [4,2,10,27] => 2
  */
const getSmallestValue = numbers => {
  let small = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (small > numbers[i]) {
      small = numbers[i];
    }
  }
  return small;
};
/**
  * Exercise 3
  *
  * Write a function that returns the biggest value of an array
  * [5,22,9,43] => 43
  */
const getBiggestValue = numbers => {
  let biggest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (biggest < numbers[i]) {
      biggest = numbers[i];
    }
  }
  return biggest;
};
/**
  * Exercise 4
  *
  * Write a function that takes an array of strings as input
  * and returns only those shorter than 20 characters
  *
  *[
  * 'I am a short string',
  * 'I seem to be short too',
  * 'And I am a long string'
  *] => [
  * 'I am a short string',
  *]
  *
  * Use: filter
  */
const getShorterStrings = (strings, characters = 20) => {
  return strings.filter(string => (string.length < characters));
};
/**
  * Exercise 5
  *
  * Write a function that takes the following data as input:
  *
  *[
  * { name: 'shark', likes: 'ocean' },
  * { name: 'turtle', likes: 'pond' },
  * { name: 'otter', likes: 'fish biscuits' }
  *]
  *
  * And returns an array of strings:
  *
  * [ 'shark likes ocean', 'turtle likes pond', 'otter likes fish biscuits' ]
  *
  * Use: map
  */
const getComputedStrings = fish => {
  return fish.map(a => `${a['name']} likes ${a['likes']}`);
};
/**
  * Exercise 6
  *
  * Write a function that takes 2 objects as input and returns 1 with  
  * common properties. If properties have the same keys use the latter.
  *
  * [{ name: 'Alice' }, { age: 11 }] => { name: 'Alice', age: 11 }
  *
  * We use: ...
  */
const mergeObjects = objects => {
  let newobject = {};
  objects.forEach(a => {
    for (element in a) {
      newobject[element] = a[element];
    }
  })
  return newobject;
};
/**
  * Exercise 7
  *
  * Write a function that returns the smallest value of an array
  * [5,200,-5,41] => -5
  *
  * Use: operator ... and Math.min
  */
const getSmallestValue2 = numbers => {
  return Math.min(...numbers);
};
/**
  * Exercise 8
  *
  * Write a function that returns odd array values.
  * [77,2,30,51] => [77,51]
  *
  * Use: reduce
  */
const getOddValues2 = numbers => {
  return numbers.reduce( (newArr, number) => {
    if (number%2 == 1) {
      newArr.push(number);
    } 
    return newArr;
  }, []);
};
/**
  * Exercise 9
  *
  * Write a function that accepts data from the basket as input in the following form:
  *
  *[
  * {price: 10, count: 2},
  * {price: 100, count: 1},
  * {price: 2, count: 5},
  * {price: 15, count: 6},
  *]
  * where price is the price of the item and count is the quantity.
  *
  * The function should return the total price for this order.
  *
  * Use: reduce
  */
const calculateTotal = products => {
  return products.reduce((total, member) => {
    return total += (member.price * member.count);
  }, 0);
};
/**
  * Exercise 10
  *
  * Implement a function that has an array of numbers as input and an array of unique values as output
  * [1, 2, 2, 4, 5, 5] => [1, 2, 4, 5]
  *
  * Use: reduce and indexOf
  */
const getUniqueValues = numbers => {
  return numbers.reduce( (newArr, number) => {
    if (newArr.indexOf(number) == -1) {
      newArr.push(number)
    }
    return newArr;
  }, []);
};
/**
  * Exercise 11
  *
  * Implement a function whose input is a numeric code of an error, the output is a string with a message
  * 500 => Server Error
  * 401 => Authorization failed
  * 402 => Server Error
  * 403 => Access denied
  * 404 => Not found
  *
  * Use: switch case or object like a map structure
  */
const getErrorMessage = code => {
  let Messages = ['Server Error', 'Authorization failed', 'Server Error', 'Access denied', 'Not found'];
  switch(code) {
    case 500: return Messages[0];
    break;
    case 401: return Messages[1];
    break;
    case 402: return Messages[2];
    break;
    case 403: return Messages[3];
    break;
    default: return Messages[4];
  }
};
/**
  * Exercise 12
  *
  * Write a function that returns the 2 smallest values of an array
  * [4,3,2,1] => [1,2]
  *
  * Use: .sort()
  */
const get2SmallestValues = numbers => {
  const newArr = numbers.sort((a,b) => a-b);
  return newArr.slice(0,2);
};
/**
  * Exercise 13
  *
  * Implement a function, at the input of which an object of the following form:
  * {
  * firstName: 'Peter',
  * secondName: 'Vasiliev',
  * patronymic: 'Ivanovich'
  *}
  * output line with the message 'Name: Petr Ivanovich Vasiliev'
  */
const getFullName = user => {
  return `Name: ${user.firstName} ${user.secondName} ${user.patronymic}`
};
/**
  * Exercise 14
  *
  * Implement a function that takes 2 arguments as input: an array of numbers and a multiplier,
  * a returns an array of the original array, each element of which has been multiplied by a factor:
  *
  * [1,2,3,4], 5 => [5,10,15,20]
  *
  * Use: map
  */
const multiplyTo = (numbers, multiplier) => {
  return numbers.map( number => multiplier*number);
};
/**
  * Exercise 15
  *
  * Implement a function that takes 2 arguments as input: an array and a franchise,
  * and returns a string with the names of the heroes separated by a comma:
  *
  *[
  * {name: "Batman", franchise: "DC"},
  * {name: "Ironman", franchise: "Marvel"},
  * {name: "Thor", franchise: "Marvel"},
  * {name: "Superman", franchise: "DC"}
  *],
  * Marvel
  * => Ironman, Thor
  *
  * Use: filter, map, join
  */
const getСharacterNames = (characters, franchise) => {
  return characters.filter( character => character.franchise == franchise)
  .map( character => character.name)
  .join(', ');
};

// ----==== Advanced exercises (8 items) ====----
/**
  * Exercise 16
  *
  * Write a function that returns an array of the smallest row values of a two-dimensional array
  *[
  * [10,1,300,4],
  * [20,2,300,400],
  * [30,3,300,4],
  * [40,4,300,4],
  *]
  * => [1,2,3,4]
  */
const getSmallestRow = numbers => {
  return numbers.map( arr => Math.min(...arr));
};
  /**
  * Exercise 17
  *
  * Write a function that returns an array of the smallest column values of a two-dimensional array
  *[
  * [1,2,3,4],
  * [1,2,3,4],
  * [1,2,30,4],
  * [1,2,3,40],
  *]
  * => [1,2,3,4]
  */
const getSmallestColumn = numbers => {
  let newArr = [];
  let minVal;
  for (let cols = 0; cols < numbers[0].length; cols++) {
    for (let rows = 0; rows < numbers.length; rows++) {
      if (rows == 0) {
        minVal = numbers[rows][cols];
      } else {
        minVal = minVal < numbers[rows][cols] ? minVal : numbers[rows][cols];
      }
    }
    newArr.push(minVal);
  }
  return newArr;
};
/**
  * Exercise 18
  *
  * Write a function that returns the 2 biggest value of an array
  * [4,3,2,1] => [4,3]
  */
const get2BiggestValues = numbers => {
  return numbers.sort( (x,y) => y-x)
    .slice(0,2);
};
/**
  * Exercise 19
  *
  * Write a function that returns the number of vowels in a string in English
  * ( a, e, i, o, u ).
  *
  * 'Return the number (count) of vowels in the given string.' => 15
  */
const getNumberOfVowels = string => {
  //function that checks if a character is a vowel
  const ifVowel = a => {
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    return (vowels.indexOf(a) == -1) ? false : true;
  }
  // transform string to arrays of characters, then count vowels and return the value
  let totalVowel = 0;
  [...string].forEach( character => {
    if (ifVowel(character)) {
      totalVowel++;
    }
  })
  return totalVowel;
};
/**
  * Exercise 20
  *
  * Write a function that returns an array of two strings where the first element
  * is the original string with uppercase even letters, and the second
  * with capital odd.
  * 'abcdef' => ['AbCdEf', 'aBcDeF']
  */
const getCapitalizedStrings = string => {
   //function with odd uppercase
   const oddUpper = a => {
    let newArr = [...a];
    for (let i = 1; i < newArr.length; i+=2){
      newArr[i] = newArr[i].toUpperCase();
    }
    return newArr.join("").toString();
  }
  //function with even uppercase
  const evenUpper = a => {
    let newArr = [...a];
    for (let i = 0; i < newArr.length; i+=2){
      newArr[i] = newArr[i].toUpperCase();
    }
    return newArr.join("").toString();
  }
  //newArray with two modified strings
  let finalArr = [];
  finalArr.push(evenUpper(string));
  finalArr.push(oddUpper(string));
  return finalArr;
};
/**
  * Exercise 21
  *
  * Write a function that satisfies the following conditions:
  *
  * the function takes a string S, consisting of N letters of the English alphabet in lowercase [a-z]
  * the function returns a string that does not contain three identical letters in a row
  * the function removes the minimum number of letters from the string S
  *
  * Examples:
  * S = "eedaaad", the function returns "eedaad". One "a" has been removed.
  * S = "xxxtxxx", the function returns "xxtxx". The same letters can occur more than three times in a string, but not in a row.
  * S = "uuuuxaaaaxuuu", the function returns "uuxaaxuu".
  *
  * Assumptions:
  * N is an integer in the range [1..200,000]
  * S consists only of lowercase letters [a-z]
  */
const getCorrectString = string => {
  let newStr = "";
  /* 
   - function to check consecutiveness of characters, and sending the last character location of similar letters
   - takes two inputs, location of the character from which the check should start
   - lastChar(0, 'aaaabbbcadf') => returns 3 as last character of a is in 3
   - lastChar(4, 'aaaabbbcadf') => returns 6 as last b is in str[7] 
   */
  const lastChar = (start, string) => {
    for (i=start; i<string.length; i++) {
      if (string[i] == string[i+1]) {
        continue;
      } else {
        break;
      }
    }
    return i;
  }
  // looping through each character
  for (let i = 0; i < string.length; i++) {
    /* 
    - check if the character is consecutive,
    - if consecutive, then calculate number of similar letters/consecutiveness
    - if number of similar letters is smaller or equal to 2, add them to newStr
    */
    if (lastChar(i, string) - i < 2) {
      newStr += string[i];
    } 
    else if (lastChar(i, string) - i >= 2 ) {
      newStr += string[i];
      newStr += string[i];
      i = lastChar(i, string);
    }
  }
  return newStr;
};
/**
 * Exercise 22
 *
 * Implement a flatten function that takes an array of arbitrary nesting arrays as input
 * and returns an array of all their elements without nesting.
 * [1, 2, [3, 4], 5, [[6, 7], 8], 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
const getFlattenedArray = numbers => {
  let newArr = [];
  //function to push all arrays of to another;
  const arrPush = (fromArray, toArray) => {
    for (let i = 0; i<fromArray.length; i++) {
      if (Array.isArray(fromArray[i])) {
        arrPush(fromArray[i], toArray);
      } else {
        toArray.push(fromArray[i]);
      }
    }
  }
  arrPush(numbers, newArr);
  return newArr;
};
  /**
  * Exercise 23
  *
  * Implement a function that has an array of numbers as input and an array of not unique values as output.
  * 
  * [1, 2, 2, 4, 5, 5] => [2, 5]
  */
const getNotUniqueValues = numbers => {
  let newArr = [];
  //function checks if the value is unique
  const ifUnique = (arrayItem, array) => {
    let index = array.indexOf(arrayItem);
    return (array.indexOf(arrayItem, index+1) == -1)
  };

  //if the value is not unique and is not in the newArr then push it to newArr
  numbers.forEach( number => {
    if  ((ifUnique(number, numbers) == false) && (newArr.indexOf(number) == -1)) {
      newArr.push(number);
    }
  })
  return newArr;
};

