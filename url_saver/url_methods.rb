class String
  def get_domain
    URI(self).host.match(/[^\.]+\.\w+$/).to_s
  end
end

class Node
  attr_accessor :a, :b, :c
  def initialize(data)
    @data = data
  end

  def get_url
    @data
  end
end

class UrlMethods
  require 'set'
  require 'uri'

  def initialize  
    @db_hash = Hash.new {|hash, key| hash[key] = Set.new }
  end

  def save_url(user_token, url)
    return false if @db_hash[user_token].include? url
    @db_hash[user_token] << url
    true
  end

  def get_urls(user_token)
    @db_hash[user_token] if @db_hash.key? user_token 
  end

  def remove_url(user_token, url)
    return false unless @db_hash.key? user_token
    return false unless @db_hash[user_token].include? url
    @db_hash[user_token].delete url
    true
  end

  def get_users_by_domain(domain)
    users = Set.new

    @db_hash.each do |user_token, url_set|
      users << user_token if url_set.map(&:get_domain).include? domain
    end

    users
  end

  def get_node(url)
    #assume already written so return dummy data
    root = Node.new('http://news.google.com')
      root.a = Node.new('http://news.yahoo.com')
      root.b = Node.new('http://www.cnn.com')
        root.b.b = Node.new('https://en.wikipedia.org/wiki/Horace_Greeley')
          root.b.b.a = Node.new('https://en.wikipedia.org/wiki/New_Hampshire')
            root.b.b.a.a = Node.new('https://en.wikipedia.org/wiki/Republican_Party_(United_States)')
          root.b.b.b = Node.new('https://en.wikipedia.org/wiki/Cycling')
          root.b.b.c = Node.new('https://en.wikipedia.org/wiki/Traffic_congestion')
            root.b.b.c.c = Node.new('https://en.wikipedia.org/wiki/United_States_Marine_Corps')
        root.b.c = Node.new('https://en.wikipedia.org/wiki/Main_Page#/media/File:St_John%27s_College_Chapel,_Cambridge,_UK_-_Diliff.jpg')
          root.b.c.b = Node.new('https://commons.wikimedia.org/wiki/Main_Page')
            root.b.c.b.b = Node.new('https://commons.wikimedia.org/wiki/Main_Page#/media/File:Kanariku_järv_2015_10.jpg')
      root.c = Node.new('http://www.twitter.com')
        root.c.c = Node.new('http://www.stackoverflow.com')
          root.c.c.a = Node.new('http://www.reddit.com/r/pics')
            root.c.c.a.b = Node.new('http://www.askjeeves.com/search')
          root.c.c.b = Node.new('http://www.github.com')

    root
  end

  def get_recommended_urls(user_token, url)
    queue = [get_node(url)]

    3.times do
      new_queue = []

      queue.each do |node|
        new_queue << node.a if node.a
        new_queue << node.b if node.b
        new_queue << node.c if node.c
      end

      queue = new_queue
    end

    queue.map(&:get_url)
  end
end

# Test get_recommended_urls
# app = UrlMethods.new
# p app.get_recommended_urls('user1234', 'http://news.google.com')

# Source for get_domain method: http://stackoverflow.com/questions/6674230/how-would-you-parse-a-url-in-ruby-to-get-the-main-domain
