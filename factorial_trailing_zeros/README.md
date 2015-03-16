#Factorial Trailing Zeros

We know that [factorial](factorial_inject.rb) is simply multiplying all the integers between 1 and the value you want to take the factorial of.

Factorial is useful in computing the number of possibilities, for example in a deck of cards with 52 cards, there is 52! possible deck configurations.  

52! = 1 * 2 * 3 * ... * 52 = 
80658175170943878571660636856403766975289505440883277824000000000000

When programmers were studying the behavior of the factorial function, they defined the function Z. For any positive integer N, Z(N) is the number of zeros at the end of the decimal form of number N!. They noticed that this function never decreases. If we have two numbers N1 < N2, then Z(N1) <= Z(N2). It is because we can never "lose" any trailing zero by multiplying by any positive number. We can only get new and new zeros.

###Trailing Zero Algorithm

Its very easy to just [convert n! to a string](trailing_zeros_simple.rb) and count the trailing zeros, but there has to be a [better way](trailing_zeros.rb)! 

We know that when we multiply by ten it adds a trailing zero

**Take for instance !5 = 120**

5 * 4 * 3 * 2 * 1 = 120

We can take out the 5 and 2 and make a factor of 10

    4 * 2 * 1 = 12
    5 * 2 = 10
    10 * 12 = 120

One 5 can be factored out, resulting in 1 trailing zero

**Take for instance !15 = 1307674368000**

15 * 14 * 13 * 12 * 11 * 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 = 1307674368000

We can take out the 5 and 2 and make a factor of 10

Take out the 10 as it is ten!

15 is 5 * 3, so we can take out the 5 and leave the 3

and 6 = 3 * 2, so we can take the 2 for the 5 from 15, and leave the 3

    3 * 14 * 13 * 12 * 11 * 9 * 8 * 7 * 3 * 4 * 3 * 1 = 1307674368
    5 * 2 = 10
    10
    5 * 2 = 10
    1307674368 * 10 * 10 * 10 = 1307674368000

Three 5's were factored out (that form three 10 factors), resulting in 3 trailing zeros

**Now take for instance !60**

We have all these multiples of 5:

    5  = 5
    10 = 5 * 2
    15 = 5 * 3
    20 = 5 * 4
    25 = 5 * 5
    30 = 5 * 6
    35 = 5 * 7
    40 = 5 * 8
    45 = 5 * 9
    50 = 5 * 5 * 2
    55 = 5 * 11
    60 = 5 * 12
    
A total of 14 - 5's can be factored out, resulting in 14 trailing zeros

**Final example to fully illustrate why algorithm works**

    Start with !125
    divide 125 by 5, take the floor, it equals 25
    divide 125 by 5^2,take the floor, it equals 5
    divide 125 by 5^3,take the floor, it equals 1
    divide 125 by 5^4,take the floor, it equals 0, quit!!!!!

The total is 31, so there is 31 trailing zeros!!!!

**But why the heck does this work?**

Take for instance !125 = a very large number !!!

Start writing all the multiples of 5

    5
    10
    15
    20
    25
    ...
    50
    ...
    75
    ...
    100
    ...
    125

Count all the multiples of 5 <= 125

Note that 25 = 5 * 5, so we are counting it once as a multiple of 5 <= 125

Now count all the multiple of 25, they need to be counted again because

They have an extra 5 hidden in them

So now we have counted 25 twice and also 125 twice

Now count all the multiples of 5^3 = 125, there is only one, 125, and its been counted twice already, so now we count it a 3rd time, wahoo!!!

That is how the algorithm works.

**Note:**

Instead of exactly following this alogorithm we are instead of multiplying the divisor (5), we instead just divide the numerator

    Start with !125
    divide 125 by 5, take the floor, it equals 25
    divide 25 by 5,take the floor, it equals 5
    divide 5 by 5,take the floor, it equals 1
    divide 1 by 5,take the floor, it equals 0, quit!!!!!

###What is the time complexity of this algorithm?





