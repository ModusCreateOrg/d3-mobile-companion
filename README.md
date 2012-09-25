# D3 Mobile Companion
This a Diablo 3 companion app which allows users to:
- See their characters attributes, items, and skills.
- Check deltas on attribute changes from last login.
- Add friends by BattleTag and view their characters.
- Read latest news from the Diablo website.
- Check server and auction house status.

## Technology
Built using [Sencha Touch](http://sencha.com/touch), and packaged with [PhoneGap](http://phonegap.com).
All information is obtained from the Diablo 3 API, which is publically available here:

**http://blizzard.github.com/d3-api-docs**

## How to Build
You must have the Sencha SDK tools installed.
`sencha app build package`

## Note
For iPhone 5, we had to modify PhoneGap to support the new splash page.
Follow this gist's instructions:
https://gist.github.com/dfaa2de31410a1414e5c

## Authors
- Stan Bershadskiy ([@stan229](http://twitter.com/stan229))
- Dave Ackerman ([@dmackerman](http://twitter.com/dmackerman))
