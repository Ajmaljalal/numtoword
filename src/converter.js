
const ones = {
    0: '',
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine'
}

const tens = {
    1: 'Ten',
    2: 'Twenty',
    3: 'Thirty',
    4: 'Fourty',
    5: 'Fifty',
    6: 'Sixty',
    7: 'Seventy',
    8: 'Eighty',
    9: 'Ninety'
}

const teens = {
    0: 'Ten',
    1: 'Eleven',
    2: 'Twelve',
    3: 'Thirteen',
    4: 'Fourteen',
    5: 'Fifteen',
    6: 'Sixteen',
    7: 'Seventeen',
    8: 'Eighteen',
    9: 'Nineteen'
}

const hundreds = {
    1: 'One Hundred',
    2: 'Two Hundred',
    3: 'Three Hundred',
    4: 'Four Hundred',
    5: 'Five Hundred',
    6: 'Six Hundred',
    7: 'Seven Hundred',
    8: 'Eight Hundred',
    9: 'Nine Hundred',
}

const positions = {
    1: '',
    2: 'Thousand',
    3: 'Million',
    4: 'Billion',
    5: 'Trillion',
    6: 'Quadrillion',
    7: 'Quintillion',
    8: 'Sextillion',
    9: 'Septillion',
    10: 'Octillion',
}


const findTens = (number) => {
    let arrNumber;
    let word;
    if (Array.isArray(number)) {
        const index = Number(number[0])
        word = index === 1 ? `${teens[number[1]]}` : `${tens[number[0]]} ${ones[number[1]]}`
    } else {
        arrNumber = number.toString().split('')
        const index = Number(arrNumber[0])
        word = index === 1 ? `${teens[arrNumber[1]]}` : `${tens[arrNumber[0]]} ${ones[arrNumber[1]]}`
    }
    return word;
}

// A helper function to split the number into array of 3 element each
const arrayToChunks = (number, chunkLength) => {
    let arr = number.toString().split('');
    const numbersArray  = arr.map(function(item) {
        return parseInt(item, 10);
    });
    var chunks = [],
        i = 0,
        n = arr.length;
        const reversedArray = numbersArray.reverse();
    while (i < n) {
        chunks.push(reversedArray.slice(i, i += chunkLength).reverse());
    }
    return chunks.reverse();
}

const convertToWord = (numsArr, positinOfNumbers) => {
    if (!numsArr) return ''; // return empty sting if there is no number in the chunk array
    let word = ''
    const position = ` ${positinOfNumbers}`

    // check fo all three item in the array of numbers are zeros
    if (numsArr.length > 2 ) {
        const total = numsArr[0]+numsArr[1]+numsArr[2]
        if (total === 0) {
            return word
        }
    }

    if (numsArr.length === 1) {
        const index = numsArr[0]
        word += ones[index]
        return word + position;
    };
    if (numsArr.length === 2) {
        word += findTens(numsArr)
        return word + position;
    }


    if (numsArr[1] === 0 && numsArr[2] === 0) { // for a number like 100
        const index = numsArr[0]
        word += hundreds[index];
        return word + position;
    }
    if (numsArr[0] === 0 && numsArr[1] === 0) { // for a number like 001
        const index = numsArr[2]
        word += ones[index]
        return word + position;
    }
    if (numsArr[0] === 0) { // for a number like 012
        const indexOfOnes = numsArr[2]
        const indexOfTens = numsArr[1];
        if (indexOfTens === 1) {
            const index = numsArr[2]
            word += teens[index]
        } else {
            word += tens[indexOfTens] + " " + ones[indexOfOnes];
        }
        return word + position;
    }

    

    // if none of the above is true then it is a full three numbers with a total of greater than 0
    const index0fHundreds = numsArr[0]
    const indexOfTens = numsArr[1]
    const indexOfOnes = numsArr[2]
    let lastTwoNumbers;
    if ( indexOfOnes === 0) {
        lastTwoNumbers = indexOfTens === 1 ? teens[indexOfOnes] : tens[indexOfTens]
    } else {
        lastTwoNumbers = indexOfTens === 1 ? teens[indexOfOnes] : tens[indexOfTens] + ' ' + ones[indexOfOnes]
    }
    // check if the middle number is 0, for example 501.
    if (indexOfTens === 0) {
        lastTwoNumbers = ones[indexOfOnes]
    }
    word = `${hundreds[index0fHundreds]} ${lastTwoNumbers} ${position}`;
    return word;

}

const converter = (number) => {
    // check if number is valid number 
    if (typeof number !== 'number') return 'Provide a valid number please!'

    // check if number is 0 or it is in the index of ones
    if (number === 0) return 'Zero';
    if (number.toString().length === 1) return ones[number];

    // check if number is tens
    if (number.toString().length === 2) {
        return findTens(number)
    }

    const chunks = arrayToChunks(number, 3);
    let word = ''
    chunks.forEach((numsArr, i) => {
        word += convertToWord(numsArr, positions[chunks.length - i])+ ' ';
    })
    return word
};


export default converter;