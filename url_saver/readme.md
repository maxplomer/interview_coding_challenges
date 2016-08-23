
# Readme

Your startup is building a product where users can save URLs with the idea that they can retrieve them later (perhaps when they have time to read). You've been put in charge with writing the server-side implementation of this product through the three problems below.

## Instructions (Please read):

* You have one hour to complete this assignment.
* Your code is not required to compile or run (this is more of a whiteboard-type exercise).
* You may work in the language of your choice.  Please feel free to use appropriate syntax for the language you choose, including function names. For example, if you choose Python, your function name can read save_url() instead of saveUrl().
* Your solution to all 3 problems should live in one <a href="https://gist.github.com/" target="_blank">GitHub Gist</a>.
* You are only responsible for writing functions that take input, make the appropriate action, and return if necessary (i.e. don’t handle HTTP requests, etc).
* Because your startup's stack does not contain a database yet, you will **need** to store all data in memory.  Please define the datastructures you use as part of this exercise (comments on why you chose what you did are always helpful!).

## Problem #1: CRUD without the U

Let’s implement Create, Read and Delete operations!

### 1. Create: Implement method named `saveUrl(userToken, URL)`
```  
Input:
userToken(String), URL(String)

Return:
A boolean value of whether or not the URL was successfully saved.
If the URL has been saved for the user previously, this function
should not save it and return false.
```

### 2. Read: Implement method called `getUrls(userToken)`
```
Input:
userToken(String)

Return:
A collection of all the URLs that user has saved, if any.
```

### 3. Delete: Implement method called `removeUrl(userToken, URL)`
```
Input:
userToken(String), URL(String)

Return:
A boolean value of whether or not the URL was successfully deleted.
If the URL to be deleted had never been saved, the function should
return false.
```

### 4. Bonus: Add test coverage for each of the above three functions.

Please feel free to use the syntax of any testing framework you choose (i.e. JUnit, Rspec, etc) or testing libraries (i.e. Mockito)

***

## Problem 2. Let’s make this “Domain Specific”

Your product is a hit. Tons of users are saving URLs and life is good. You've been approached by website publishers (CNN, ESPN, etc) who wish to find out which users have currently saved *their* URLs via your service.

Build a function called `getUsersByDomain(domain)` which takes in a domain name String (e.g. "espn.com") and returns a collection of user tokens.

### Assumptions:

* You've been instructed to optimize your solution for run-time performance.
* Imagine we’ve already implemented a function `extractDomain()` that when given a String input of a URL, returns the domain name. For example, `extractDomain("http://www.espn.com/story1")` will return `"espn.com"`. You don’t need to worry about subdomains.
* Only use current data. If a user had saved a URL, but removed it, it should not be returned here.

### Implement `getUsersByDomain(domain)`
```
Input:
domain(String)

Return:
A collection of user tokens who have saved URLs that belong to that domain.

```

## 3. Recommendations, anyone?

In an effort to increase readership of content, your startup has decided to build a new feature that will display a list of recommended URLs based on the URL that is currently being viewed by the user. To achieve this, your chief data scientist has taken the saved URLs and created a relevance graph where each node represents a unique URL. Every node has up to three edges (or "hops") to other nodes. Let’s name these edges `A` , `B` , and `C`.  Nodes that are less hops away from each other are deemed to be more related. Conversely, when they are separated by a greater number of “hops”, they are deemed less related.

Your product manager, Yvonne, has determined that the optimal set of recommended URLs to display are the URLs who represent all nodes in the graph that are exactly three edge traversals or “hops” away from the node that represents the URL that is currently being viewed by the user (i.e. content that’s similar, but not too similar).  Your job is to write a function that given an input URL, can traverse the graph and return the full set of nodes that are exactly three "hops" away from the input URL's node in the graph.

**In order to better illustrate the problem, we've attached a diagram at the bottom of this Gist that depicts a sample relevancy graph, with input and expected output.**

### Assumptions:

* The function `getNode(url)` returns the `Node` object that represents the URL in our relevance graph. Assume this function has already been written and is available to you.
* Every `Node` object has the following functions:
  - `A()`: returns the `Node` object that exists upon traversal of `A`. If no such node exists, this will return `null`.
  - `B()`: returns the `Node` object that exists upon traversal of `B`. If no such node exists, this will return `null`.
  - `C()`: returns the `Node` object that exists upon traversal of `C`. If no such node exists, this will return `null`.
  - `getUrl()`: returns the URL string that the `Node` represents.
* Yvonne stresses to you that the set of recommended URLs should not include any URLs that the current user has personally saved him/herself.
* The graph contains no cycles and its edges are uni-directional.

### Implement `getRecommendedUrls(userToken, URL)`
```
Input:
userToken(String), URL(String)

Return:
A collection of recommended URLs (Collection of Strings)
```
