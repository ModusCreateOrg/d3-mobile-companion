![Alt text](http://cdn2.gamefront.com/wp-content/uploads/2011/10/diablo3z.jpg?cda6c1)

<sub>*Source: gamefront.com*</sub>

# D3 Mobile Companion
This is a Diablo 3 companion app which allows users to:
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
You must have the Sencha SDK tools installed. Download and install them from [**here**](http://www.sencha.com/products/sdk-tools).

Change directories to the project root directory and run:

`sencha app build package`

## Planned Features
* Release an Android version. This should be trivial thanks to PhoneGap.
* Implement some sort of manual Auction House stat comparison? Currently there is no Auction House API, so what we can do here is limited.
* Hopefully add retina ready assets for iPhone 4+. Blizzard doesn't provide these for us, so this may never come.
* Implement feedback from users! I'm sure we've overlooked things while trying to make this as simple as possible.

## Note
For iPhone 5, we had to modify PhoneGap to support the new splash page.
Follow this gist's instructions:
https://gist.github.com/dfaa2de31410a1414e5c

## Authors
- Stan Bershadskiy ([@stan229](http://twitter.com/stan229))
- Dave Ackerman ([@dmackerman](http://twitter.com/dmackerman))
