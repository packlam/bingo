# bingo

I initially planned to create a 'simple' bingo game when I was learning to use React. However, I soon found myself with the interesting challenge of how to generate strips of 6 [UK-style bingo cards](https://en.wikipedia.org/wiki/Bingo_(United_Kingdom)#Strips_of_6_tickets).

I found it quite a fun little project to work on, and I had to go through a few different approaches to solving the problem.

The solution that I ended up with involved creating cards with placeholders for the numbers, in order to easily validate the requirement for each row to have 5 numbers and 4 blanks, and for each column in an individual card to have at least 1 number.

The algorithm builds up the strip of 6 cards one by one, with validation after the addition of each card to ensure that the strip conformed to the minimum/maximum numbers per column, which differs across the strip.

Finally, the number placeholders are replaced by actual numbers, corresponding to the rules detailed in the Wikipedia link above.

When I have some more time, the next step will be to use this to create an actual game using React!
