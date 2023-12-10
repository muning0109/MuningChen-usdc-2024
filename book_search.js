/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    const results = [];

    for (const book of scannedTextObj) {
        for (const content of book.Content) {
            const text = content.Text;
            const regex = new RegExp(`\\b${searchTerm}\\b`, 'g'); 

            let match;
            while ((match = regex.exec(text)) !== null) {
                // Check for duplicate entry before pushing to results
                const isDuplicate = results.some(result =>
                    result.ISBN === book.ISBN &&
                    result.Page === content.Page &&
                    result.Line === content.Line
                );

                if (!isDuplicate) {
                    results.push({
                        ISBN: book.ISBN,
                        Page: content.Page,
                        Line: content.Line
                    });
                }
            }
        }
    }

    return {
        SearchTerm: searchTerm,
        Results: results
    };
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** BOOKS FOR TEST */
/** There are two books in this array object */
const Books = [
    {
        "Title": "The Road not Taken",
        "ISBN": "1234567890",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "Two roads diverged in a yellow wood,"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "And sorry I could not travel both"
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "And be one traveler, long I stood"
            },
            {
                "Page": 1,
                "Line": 4,
                "Text": "And looked down one as far as I could"
            },
            {
                "Page": 1,
                "Line": 5,
                "Text": "To where it bent in the undergrowth;"
            },
            {
                "Page": 2,
                "Line": 1,
                "Text": "Then took the other, as just as fair,"
            },
            {
                "Page": 2,
                "Line": 2,
                "Text": "And having perhaps the better claim,"
            },
            {
                "Page": 2,
                "Line": 3,
                "Text": "Because it was grassy and wanted wear;"
            },
            {
                "Page": 2,
                "Line": 4,
                "Text": "Though as for that the passing there"
            },
            {
                "Page": 2,
                "Line": 5,
                "Text": "Had worn them really about the same,"
            },
            
        ]
    },
    {
        "title": "Do not go gentle into that good night",
        "ISBN": "0987654321",
        "Content":
        [
            {
                "Page": 10,
                "Line": 6,
                "Text": "Do not go gentle into that good night,"
            },
            {
                "Page": 10,
                "Line": 7,
                "Text": "Old age should burn and rave at close of day;"
            },
            {
                "Page": 10,
                "Line": 8,
                "Text": "Rage, rage against the dying of the light."
            },
            {
                "Page": 10,
                "Line": 20,
                "Text": "And learn, too late, they grieved it on its way,"
            }

        ]
    }
];


/** Positive Test */
/** This Test Searched for the term And, which appeared in both books, on different pages, and in different lines */

const positiveTestResult = findSearchTermInBooks("And", Books);
const positiveTestExpected = {
    SearchTerm: "And",
    Results: [
        {
            ISBN: "1234567890",
            Page: 1,
            Line: 2
        },
        {
            ISBN: "1234567890",
            Page: 1,
            Line: 3
        },
        {
            ISBN: "1234567890",
            Page: 1,
            Line: 4
        },
        {
            ISBN: "1234567890",
            Page: 2,
            Line: 2
        },
        {
            ISBN: "0987654321",
            Page: 10,
            Line: 20
        }

        
    ]
};

if (JSON.stringify(positiveTestResult) === JSON.stringify(positiveTestExpected)) {
    console.log("PASS: Positive Test");
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", positiveTestExpected);
    console.log("Received:", positiveTestResult);
}

/** negative test */
/** It searches for the term missing, which does not appear in the text */
const negativeTestResult = findSearchTermInBooks("missing", Books);
const negativeTestExpected = {
    SearchTerm: "missing",
    Results: []
};

if (JSON.stringify(negativeTestResult) === JSON.stringify(negativeTestExpected)) {
    console.log("PASS: Negative Test");
} else {
    console.log("FAIL: Negative Test");
    console.log("Expected:", NegativeTestExpected);
    console.log("Received:", NegativeTestResult);
}

/** case-sensitive test */
/** The positive test already accounts for case-sensitivity by searching for "And" */
/** Here we search for "and", which should return different results from positive test above */
const caseSensitiveTestResult = findSearchTermInBooks("and", Books);
const caseSensitiveTestExpected = {
    SearchTerm: "and",
    Results: [
        {
            ISBN: "1234567890",
            Page: 2,
            Line: 3
        },
        {
            ISBN: "0987654321",
            Page: 10,
            Line: 7
        }
    ]
};

if (JSON.stringify(caseSensitiveTestResult) === JSON.stringify(caseSensitiveTestExpected)) {
    console.log("PASS: Case Sensitive Test");
} else {
    console.log("FAIL: Case Sensitive Test");
    console.log("Expected:", caseSensitiveTestExpected);
    console.log("Received:", caseSensitiveTestResult);
}

/** duplicate test */
/** when the search term appear in one line twice*/
/** the line should only be reported once */
const duplicateTestResult = findSearchTermInBooks("as", Books);
const duplicateTestExpected = {
    SearchTerm: "as",
    Results: [
        {
            ISBN: "1234567890",
            Page: 1,
            Line: 4
        },
        {
            ISBN: "1234567890",
            Page: 2,
            Line: 1
        },
        {
            ISBN: "1234567890",
            Page: 2,
            Line: 4
        }
    ]
}

if (JSON.stringify(duplicateTestResult) === JSON.stringify(duplicateTestExpected)) {
    console.log("PASS: Duplicate Test");
} else {
    console.log("FAIL: Duplicate Test");
    console.log("Expected:", DuplicateTestExpected);
    console.log("Received:", DuplicateTestResult);
}
