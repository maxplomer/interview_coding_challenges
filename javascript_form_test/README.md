## Code Test

Build a form with the following form elements.

*   First Name
*   Last Name
*   Favorite Food
*   Favorite Number
*   Favorite day of the week (this will be a select, not an input)
*   Favorite Color (this will be a select, not an input)
*   and a submit button

Each of these form elements will have a set of validation and requirements they must follow. Each of the elements will need to be valid for the form to submit. The requirements will be actions that are performed on the value of the inputs. The requirements and validation can fire on whatever event you want to implement.

When you are finished, or as close to finished as you can get please zip the contents of your code and email them. **jQuery and other libraries may not be used.**

### First Name

Validation: Cannot be empty

Requirements: The value of the input needs to be printed (underneath or next to the form just needs to be on the same page, page shouldn't reload on submission) with spaces between each letter. There should be no space before the first letter or after the last.

Example: Joe should print as J o e.

### Last Name

Validation: Cannot be empty

Requirements: The value of the input needs to be printed in reverse.

Example: Joe should print as eoJ.

### Favorite Food

Validation: Cannot be empty

Requirements: Get the ASCII character code value of each letter and print each value with ' + ' next to it. After the last value print ' = ' next to it, and then print the sum of all the values.

Bonus: If there are any repeating characters in the word, print the ASCII value a single time with this ' x ' next to it followed by the number of times the character is repeated.

Example: Pizza should print as 80 + 105 + 122 + 122 + 97 = 526

Bonus Example: Pizza should print as 80 + 105 + 122 x 2 + 97 = 526

### Favorite Number

Validation: Must be a number and cannot be empty.

Requirements: Find and print the second highest factor of the number.

Bonus: Don't allow the user to enter anything into the input that isn't a number.

Example: 152 should print 76.

### Favorite day of the week

Validation: User must have selected an option.

Requirements: This should be a select with 8 options. A default option prompting the user to select an option, and the seven days of the week. Once the user has selected a day print the dates of the next 6 occurences of this day.

Example: If the current date is 3/11/14 and the user picks Wednesday then 3/12/14, 3/19/14, 3/26/14, 4/2/14, 4/9/14, 4/16/14 should print.

### Favorite Color

Validation: The user must select an option.

Requirements: The list should include 8 options. A default option prompting the user to select an option, and seven colors of your choice (the colors should be in string format i.e. red, green blue, etc.). Once the user has selected a color print the hex value of the selected color in the selected color, and make a 15px by 15px solid square that is the selected color.

### Submit Button

Requirements: The submit button shouldn't do anything until all the inputs are valid. Once Submitted the page should not refresh, and a valid JSON representation of the form values should be logged to the console.
