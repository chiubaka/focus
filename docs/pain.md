# Pain

## Trouble Logging `webRequest` Details
### Problem
I was playing with the example [here](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Intercept_HTTP_requests)
to see if I could get a proof of concept working. For awhile, it seemed as if my background script was
not loading at all and I was super confused. I couldn't get the requests logging the way the example
did. 

### Solution
First I checked for typos. At one point I literally copied
all of the code from the example page. Still no dice. I tried FirefoxDeveloperEdition just in case I was
encountering some weird bug in the extensions API implementation that's since been fixed in a more
recent build. No dice. I tried installing in Chrome! I actually was able to get this to work once I
replaced `browser` with `chrome`. However, I had to go to a very specific place to find the logs output
by the background page. This [StackOverflow post](https://stackoverflow.com/questions/38913799/google-chrome-firefox-do-not-see-extension-output-in-console)
helped me find the right place for logging in Chrome, which made me start to wonder if maybe I still
wasn't looking in the right place in Firefox. Turns out this hunch is right, and I somehow hit all of
the wrong permutations of looking at different browser console logs and web logs with the code loaded
in. For future reference: the browser console is not the same thing as the in-page JavaScript console
I'm used to going to. The browser console seems to be the console for the browser itself, which is
apparently where background console output for Firefox goes. *However*, it seems as if content scripts
_will_ actually log to the normal JavaScript console in both browsers. It's only background scripts
(which are actually linked to background pages) that are special snowflakes. 

Also for future reference, Firefox and
Chrome seem to behave differently when loading a background script for the first time. Chrome showed me
an alert, while Firefox did not, though the script was actually working in both browsers. This confused
me greatly, as for awhile I doubled down on my theory that this was just not working in my version of
Firefox.

### Links
* [Google Chrome / Firefox do not see extension output in console](https://stackoverflow.com/questions/38913799/google-chrome-firefox-do-not-see-extension-output-in-console)
* [Intercept HTTP requests](https://stackoverflow.com/questions/38913799/google-chrome-firefox-do-not-see-extension-output-in-console)
