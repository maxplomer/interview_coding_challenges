#Exponentiation by squaring recursive
def exp(x, n)
  return 1 if n == 0
  return x if n == 1
  if n[0].nonzero?
    x * exp(x * x, (n - 1) / 2)
  else
    exp(x * x, n / 2)
  end
end

beginning_time = Time.now
result = exp(2, 3)
end_time = Time.now

puts result
puts (end_time - beginning_time)