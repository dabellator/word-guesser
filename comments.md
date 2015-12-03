# Comments for Wordbreaker group:

### Tests: 20/20

Nice job! Nicely organized by purpose and well written.

### Database resources: 15/15

Good comments in wordSchema.js (although line 3 says user schema, I suspect this was copied over and not edited?).  Good comments in userSchema.js as well.

### Deployment: 15/15

Live on Heroku, and showing build:passing from Travis - very nice!

### General comments:

1. Only one team member is listed as the copyright holder in the License file.

2. Your commit messages could be more informative.  Generally, in a group project like this, you will all agree on a tense to use for your messages - present tense is common.  Then, make your messages informative.  For example, you have these messages (short is good, but they aren't that useful):
  * all done
  * Resolved conflicts
  * fix Travis

  I would write these like this (more informative, and still pretty short):
  
  * Complete edits to fileone and filetwo
  * Resolve conflicts in fileone, filetwo, and filethree
  * fix Travis bug in fileone

  Keeping commit messages useful is HARD, but it's worth the effort.  :)

3. Weird tabbing in game.js - otherwise your code is very nicely styled (good comments in this file, tho)!

4. HTML (brace yourselves, this is my wheelhouse!)
  * Tabbing is too big
  * You are missing some stuff in the `<head>`; check out html5boilerplate for a good place to start
  * Use `<p>` tags instead of all those `<br>` tags (or put the rules in a `<ul>`? Anything but all those `<br>` tags!)
  * The rulesDialog `<div>` could be an `<aside>` for better semantics
  * The `<table>` tag should only ever be used to display tabular data, and NOTHING ELSE.  :)  You are using it here (in three places!) for layout, which is frowned upon (or causes certain TAs to tear out their hair).  I would put the letter tiles into an `<ul>` and use CSS to position each `<li>` where I want it.  
  * All `<div>`s?  Really?  Sad TA. :(
    * Lines 26 & 27: I would make these into `<section>`s (I would also add a header to each section to increase the semantics, like 'results' and 'untried'). 
    * Line 30: terrible ID - this is not informative at all. Also, I would make this into a `<main>`
    * Line 31: This should be an `<h1>` not a `<div>`!  The `<span>` is appropriate in this case.
    * Lines 34-42 and 44-52: weird tabbing
    * Line 57: this should be a `<button>`
    * Lines 63-68 and 70-76: these are `<form>`s, why are they `<div>`s?
    * Lines 63-68 and 70-76: don't use `<br>` tags to separate form elements, use CSS
    * Lines 64, 71, 79: these are headings, not `<div>`s
    * Lines 78-81: this is a `<section>`, and line 79 should be a heading. userStats could be a `<p>`

Sorry to go line by line on you guys, but your HTML **needs** to be semantic!

## Overall, a very nice job, everyone!
