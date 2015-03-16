def factorial(n)
  (1..n).inject(:*)
end

def trailing_zeros(x)
  result = 0
  factorial(x).to_s.reverse.each_char do |i|
    break if i != '0'
    result += 1
  end
  result
end

beginning_time = Time.now
result = trailing_zeros(52)
end_time = Time.now

puts result
puts (end_time - beginning_time)