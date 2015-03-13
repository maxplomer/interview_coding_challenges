#Exponentiation by squaring using a while loop
def exp(x, n)
  result = 1
  while n.nonzero?
    if n[0].nonzero?
     result *= x
     n -= 1
    end
    x *= x
    n /= 2
  end
  result
end

beginning_time = Time.now
result = exp(2, 99999)
end_time = Time.now

puts (end_time - beginning_time)