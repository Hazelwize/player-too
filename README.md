# Earlier Iteration of PlayerToo
This is an early iteration of PlayerToo with manual auth routes created without passport.

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, EJS, Node.js, Express.js, MongoDB, Mongoose

I contemplated removing this repo all together, however, I think that it serves a purpose in showing how the passport strategy for Discord would work if it were typed out. I wanted to really understand how Discord's OAuth2 was working on a fundamental level, so I created each route for handling the request of the token, the exchange for the user info, and managing the user from there. 

## Lessons Learned:

I gained a deep understanding of OAuth2 from doing this practice work. I feel like putting in the effort to recreate the things that Passport.js does so quickly let me realize why the Passport Strategy does the things that it does. This also lets me peek behind the curtain and understand how authentication works in a way that protects it's users and clients from malicious attacks. 10/10 would code again.

## Examples:
Take a look at these examples that I have in my own portfolio:

**PlayerToo:** https://github.com/Hazelwize/player-two (This repo turned into this project)

**Stitch-N-Loop:** https://github.com/Hazelwize/stitch-and-loop-api



