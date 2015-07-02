Please use this Google doc to code during your interview. To free your hands for coding, we recommend that you use a headset or a phone with speaker option.


cr10014 => cr => car, cry
sr123to => srto => sort
xcrg643 => xcrg =>  nil




def filter_letters(string)
  result = []

  string.each_char do |char|
    if char.ord.isbetween?('a'.ord, 'z'.ord)
      result << char
    end
  end

  result
end


# list = ['cat', 'hat', etc...]


def it_has_the_letters?(letters, word)
  letters.all? { |i| word.include?(i) }
end


def shortest_word_in_dictionary(dictionary, license_plate)
  letters = filter_letters(license_plate)
  dictionary = dictionary.select{ |i| i.length >= letters.length }

  result = nil

  dictionary.each do |word|
    if it_has_the_letters?(letters, word)
      if result.nil? || result.length > word.length
        result = word
      end
    end
  end

  result
end



dictionary = ['cat', 'hats', 'snake']

license_plate = 'cathats8' #4-8 chars



N = size of dictionary
M = length of license plate

M <<< N

ignore increase in iterations due to license plate string length


directly proportional to N

O(N)





hash lookup
O(1)


dictionary_hash = { 'cat' => nil, 'dog' => nil, ‘cry’ => nil }


dictionary_hash.include?('cat') #= true

array.include?() O(N) time



123cyr => [c,y,r] =>





def initial_search(dictionary_hash, letters)
   #only looking for 3 letter words
   all_shuffles = get_all_shuffles(letters) # [[c,y,r],[c,r,y],....]
   all_shuffles.select do |combo|
     dictionary_hash.include?(combo.join)
   end.first.join
end



def secondary_search(dictionary_hash, letters)
  len = letters.length
  all_the_letters = ('a'..'z').to_a

  all_the_letters.each do |letter|
    letters_dup = letters.dup
    letters_dup << letter
    temp_all_shuffles = get_all_shuffles(letters_dup)
    
    temp_all_shuffles.each do |combo|
      dictionary_hash.include?(combo.join)
      return combo.join
    end
  end
  
  nil
end






3 letters

+1 letter

4!
