def trailing_zeros(x)
  result = 0
  while x > 0
    result += x / 5
    x /= 5
  end
  result
end

beginning_time = Time.now
result = trailing_zeros(52)
end_time = Time.now

puts result
puts (end_time - beginning_time)
