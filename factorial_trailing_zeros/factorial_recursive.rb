def factorial(n)
  return 1 if n == 1
  n * factorial(n - 1)
end

beginning_time = Time.now
result = factorial(52)
end_time = Time.now

puts result
puts (end_time - beginning_time)
