## Explanation

A Test can have multiple Cases, which has multiple Actions, that have a result (true|false) and an expectation (String).

### Test
A set of cases to be called to run any actions that are part of the case.

### Case

Every case has a set of actions it has to perform, wether it is clicking a button, or filling in a form, selecting an option in a dropdown or reading the page title.

### Action

An action is an event triggered by the test.

### Expectation

The expectation is the pre-defined outcome of the action.

### Result

A result is the actual outcome of the action.

## Workflow

A test is a set of actions performed after each other, based on expected outcomes, if an action performed as expected, the result is true (green ✔) and the next action will be triggered, if the action does not perform as expected, the result will be false (red ✗), and the test will exit.

### Example

**Test: github.com**

Case: Login
| Action                                            | Expected              | Result    |
|:------------------------------------------------- |:--------------------- |:--------- |
| Fill 'username' with 'User'                       | 'User'                | ✔         |
| Fill 'password' with '1234'                       | '1234'                | ✔         |
| Click 'Submit'                                    | true                  | ✔         |
| Wait for page-load                                | true                  | ✔         |

**Case "Login" - 4 passed | 0 failed**

Case: Search for OpusCapita
| Action                                            | Expected              | Result    |
|:------------------------------------------------- |:--------------------- |:--------- |
| Fill 'search' with 'OpusCapita'                   | 'OpusCapita'          | ✔         |
| Press Enter                                       | true                  | ✔         |
| Wait for page-load                                | true                  | ✔         |

**Case "Search for OpusCapita" - 3 passed | 0 failed**

## How to set up a new Case

## How to set up a new Action

### Example

```js
const action = new Action;

action.Fill("#name", "James T. Kirk"); // fills an input-element 'name' with "James T. Kirk".
```

### Output
```bash
Fill '#name' with 'James T. Kirk'                 | 'James T. Kirk'       | ✔            
```

### Action types
| Type          | Expected      | Description                                           |
|:------------- |:------------- |:----------------------------------------------------- |
| visit         | ```string```  | Url target to go to.                                  |
| fill          | ```string```  | Fills out a form field.                               |
| click         | ```bool```    | Clicks on an element.                                 |

### Type properties
| Property  | type          | Description                                               |
|:--------- |:------------- |:--------------------------------------------------------- |
| target    | ```string```  | The dom target to perform action on                       |
| content   | ```string```  | The content of the action.                                |
| retry     | ```number```  | Amount of times the action should be retried on falure    |

### Understanding results
