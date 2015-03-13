#Exponentiation By Squaring

Exponentiating by squaring is a method for fast computation of positive integer powers of a number. In comparing the [simple exponentiation](exp.rb) , the [recursive](exp_recursive.rb) and [while loop](exp_whileloop.rb) versions of exponentiation by squaring I received the following computation times for exp(2, 99999):

| Exponentiation Method        | Time (seconds)     |
|------------------------------|--------------------|
| Simple                       | 1 |
| Recursive                    | 2      |
| While loop                   | 3      |


It is based on the following equations

![](equations.png)
