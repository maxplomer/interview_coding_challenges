module BlobBoundaries

  def BlobBoundaries.find_boundaries(boolean_matrix)
    $boolean_matrix = boolean_matrix
    $marked = Array.new(10) { Array.new(10, false) }
    $cell_reads = 0
    $top = nil
    $left = nil
    $bottom = nil
    $right = nil

    self.find_starting_point

    [$cell_reads, $top, $left, $bottom, $right]
  end

  ###Start searching for blob in the middle (blobs tend to be in the middle)
  def BlobBoundaries.find_starting_point
    top = 4
    right = 5
    bottom = 5
    left = 4

    5.times do |i|
      if i != 0
        top -= 1
        right += 1
        bottom += 1
        left -= 1
      end
      
      left.upto(right - 1)   { |xcor| return if self.check_starting_point(top, xcor) }
      top.upto(bottom - 1)   { |ycor| return if self.check_starting_point(ycor, right) }
      right.downto(left + 1) { |xcor| return if self.check_starting_point(bottom, xcor) }
      bottom.downto(top + 1) { |ycor| return if self.check_starting_point(ycor, left) }
    end

    nil
  end

  def BlobBoundaries.check_starting_point(ycor, xcor)
    $cell_reads += 1
    $marked[ycor][xcor] = true
    if $boolean_matrix[ycor][xcor]
      self.dfs(ycor, xcor)
      return true
    end

    false
  end

  ####Start searching for blob in the top left
  # def BlobBoundaries.find_starting_point
  #   $boolean_matrix.each_with_index do |row, ycor|
  #     row.each_with_index do |el, xcor|
  #       $cell_reads += 1
  #       $marked[ycor][xcor] = true
  #       if el
  #         self.dfs(ycor, xcor)
  #         return
  #       end
  #     end
  #   end

  #   nil
  # end

  def BlobBoundaries.dfs(ycor, xcor)
    #Update boundary variables
    $top = ycor if !$top || ycor < $top
    $left = xcor if !$left || xcor < $left
    $bottom = ycor if !$bottom || ycor > $bottom
    $right = xcor if !$right || xcor > $right

    offset = [[1,0,-1,0],[0,1,0,-1]]
    4.times do |i|
      ycor_new = ycor + offset[0][i]
      xcor_new = xcor + offset[1][i]

      if !$marked[ycor_new][xcor_new]
        $cell_reads += 1
        $marked[ycor_new][xcor_new] = true
        self.dfs(ycor_new, xcor_new) if $boolean_matrix[ycor_new][xcor_new]
      end
    end

    nil
  end

end
