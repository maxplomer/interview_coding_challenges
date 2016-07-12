require_relative 'blob_boundaries'
include BlobBoundaries
filename = ARGV.shift

### Convert input.txt file into matrix of booleans
boolean_matrix = File.readlines(filename).map do |line| 
  line.strip.split('').map{|i| i == '1'}
end

cell_reads, top, left, bottom, right = BlobBoundaries::find_boundaries(boolean_matrix)

puts "Cell Reads: #{cell_reads}"
puts "Top: #{top}"
puts "Left: #{left}"
puts "Bottom: #{bottom}"
puts "Right: #{right}"
