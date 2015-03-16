require '20_fac_trailingzeros'
require 'rspec'
#difficulty hard

#-Write a function fac_trailingzeros(array), find the number of trailing zeros in a factorial

describe "#fac_trailingzeros" do
  it "finds the number of trailing zeros in a factorial" do
    fac_trailingzeros([3, 60, 100, 1024, 23456, 8735373]).should ==
                      [0, 14, 24,   253,  5861, 2183837]
  end
end
