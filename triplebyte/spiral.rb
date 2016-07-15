def spiral(size)
  row = []
  size.times do 
    row << nil
  end

  matrix = []
  size.times do 
    matrix << row.dup
  end

  $x_max = size - 1
  $x_min = 0
  $y_max = size - 1
  $y_min = 0

  while true 
    #across the top
    $x_min.upto($x_max - 1) do |i|
      matrix[$y_min][i] = '*'
    end
    
    #down the right side
    $y_min.upto($y_max - 1) do |i|
      matrix[i][$x_max] = '*'
    end
    
    #across the bottom
    $x_min += ($x_min == 0 ? 1 : 2)
    if last_element?
      matrix[$y_max][$x_max] = '*'
      break
    end
    $x_max.downto($x_min + 1) do |i|
      matrix[$y_max][i] = '*'
    end

    #up the left side
    $y_min += 2
    if last_element?
      matrix[$y_min][$x_min] = '*'
      break
    end
    $y_max.downto($y_min + 1) do |i|
      matrix[i][$x_min] = '*'
    end

    #increment
    $x_max -= 2
    $y_max -= 2
    if last_element?
      matrix[$y_min][$x_min] = '*'
      break
    end
  end
  
  matrix
end

def last_element?
  $x_max == $x_min || $y_max == $y_min
end

def print_matrix(matrix)
  matrix.each do |row|
    row.each do |el|
      print el.nil? ? ' ' : el
    end
    puts ' '
  end
end

print_matrix(spiral(7))
puts "---------------------"
print_matrix(spiral(12))



