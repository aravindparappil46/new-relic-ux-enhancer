# New Relic UX Enhancer
Chrome extension to clean up unwanted noise within New Relic!

Find it [here](https://chrome.google.com/webstore/detail/aws-favorites-to-pins/ncldghmgebieadpbefcmhicjepidmnhc/) on the Chrome Web Store!

Most New Relic dashboards may have certain junk text (in chart legends, table rows etc.) which is unimportant and truncates actual information from view. This extension finds and removes such phrases which the user deems unimportant.

# Configuration Options
You can choose what all phrases to be removed from the Options page of the extension
- By default, `WebTransaction/SpringController/` is added. You cannot remove this.
- Mention each phrase/keyword in a new line. No need to add commas to separate them
- All phrases are case-sensitive

These options can be configured by clicking on the extension icon on the browser and going to `Options`

# How does it work?
- A mutation observer is set on all the widget elements. This is required because New Relic lazy loads widget contents
- Whenever a change is detected on any widget, all spans with `label` in its class are fetched and checked for whether they have any of the phrases to remove in them 

# Limitations
- Since the mutation observer is added to entire widget divs, even hover changes on graphs invoke the observer. This is leading to performance lag while hovering over complex line graphs
- Observer is never disconnected. It should be disconnected when on non-dashboard pages & then reconnect when back (issue is because of the use of `background` script, which is currently necessary because New Relic navigation doesn't always invoke the `content-script`)
