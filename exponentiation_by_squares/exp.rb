#Simple exponentiation
def exp(x, n)
  result = 1
  n.times { result *= x}
  result
end

beginning_time = Time.now
result = exp(2, 99999)
end_time = Time.now

puts (end_time - beginning_time)