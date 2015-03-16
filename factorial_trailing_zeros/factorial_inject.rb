def factorial(n)
  (1..n).inject(:*)
end

beginning_time = Time.now
result = factorial(52)
end_time = Time.now

puts result
puts (end_time - beginning_time)
