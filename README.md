# Notes

I enjoyed my experience building this small game in Ember.js! I think the winning factor about this framework is its strong conventional patterns and opinionated design. However, possibly the biggest drawback is that this opinion changes a lot! I remember 5 years ago when I built an Ember app, it was changing very rapidly and this seems to still be the case today.

### Some remarks around Ember.js

* There's a pretty clear way to do things and it works straight away.
* Overall it's a very clean experience.
* The documentation is good, but there are some dead links and it's hard to find certain answers due to the pace of change.
* State management is simpler than with React + Redux.
* I've always been a fan of the mvc pattern.
* I like glimmer components much better than react components. They are cleaner and easier to change. Much less boilerplate code. Also, I know it's unfair to compare a full framework with a library but I like Ember.js better than any React.js implementation I've seen.
* Something I've noticed: It seems that the only component tests (at least, the only ones that are encouraged by default) are "integration" tests - Meaning you test the component as a whole and omit unit tests for the methods? I'm not sure if I like testing all the edge cases with full html rendering.
* Also, testing a component this way will mean that you are testing all its child components, which means if you modify a deeply nested component you might have lots of failing tests. Is stubbing child components a thing?
* I didn't notice a way to define a central list of arguments for a component
* One possible area for ambiguity could be when to use a controller vs. a component.

For all the negatives listed, of course I have only been using Ember Octane for one weekend so it's likely there are some solutions that I haven't come across yet.

My overall opinion is that I would definitely use Ember.js

### Some remarks around material design

* It seems that there are a lot of different ways to approach how you use material design, which I don't like.
* I couldn't determine a de facto way of using material design styling with Ember.js. I considered using the [ember paper](https://github.com/miguelcobain/ember-paper) addon but it didn't seem to be in a stable state and since I only want the css, I decided it's not worth it. Using a cdn link would mean I can't use scss variables.
* Eventually I manually added scss from [materialize](https://materializecss.com/) to `vendor/` (which includes a responsive grid).

### Notes around my implemenation

* I created a game component which handles the game state and victory condition checking.
* The `play` controller that keeps track of scores. It will also variate which player goes first for each game. This could also have been a component but I assume that the usual approach would be to create a controller and if you need to duplicate some parts on a different page then this can be extracted to a component.
* A simple board component which handles the input and rendering for the game board. It could be reused for other games.
* A very simple scores component that displays scores.

### Features & issues I didn't get to

* Persisted game progress & scores when you refresh. I was looking at [`ember-local-storage`](https://github.com/funkensturm/ember-local-storage) for this.
* Something I would have liked to do is extract the victory checking to a separate utility class. I haven't found a clean Ember way to do this yet.
* Making the last token show up when the game ends.
* Adding tests for each victory condition.
