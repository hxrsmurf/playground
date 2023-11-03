---
title: 'RocketChat + Twilio'
description: 'RocketChat + Twilio'
pubDate: 'August 17 2021'
heroImage: '/rocketchat-twilio.jpg'
---

In my homelab, I'm using RocketChat with outgoing webhooks to Flowroute for SMS. I wanted to try my hand at [Twilio SMS Messaging API](https://www.twilio.com/sms).

Twilio's API takes Content-Type `application/x-www-form-urlencoded`. This took me a really long time to figure out in JavaScript (I'm still new to it), but at long last the StackOverflow article told me to do the code below.

```
var message = [];
for (var property in details) {
	var encodedKey = encodeURIComponent(property);
	var encodedValue = encodeURIComponent(details[property]);
	message.push(encodedKey + "=" + encodedValue);
}
message = message.join("&");
```

This resulted in proper POST to Twilio in JavaScript from within RocketChat outgoing webhooks!

I also had to make sure to turn OFF RocketChat's [End-to-End encryption](https://docs.rocket.chat/guides/user-guides/security-bundle/end-to-end-encryption).

Additionally, from the same article, URLSearchParams is a much cleaner solution, too. I use this in my Angular implementation.

```
var details = {
	// From and To are E.164 phone number format
	'From' : '',
	'To' :'+1' + number,
	'Body': text[1]
};

var message = [];
for (var property in details) {
	var encodedKey = encodeURIComponent(property);
	var encodedValue = encodeURIComponent(details[property]);
	message.push(encodedKey + "=" + encodedValue);
}
message = message.join("&");
```

Finally, I filed an issue/bug [22958](https://github.com/RocketChat/Rocket.Chat/issues/22958) in RocketChat. We'll see if it's a bug or just a feature.

My Repos

- [RocketChat](https://github.com/hxrsmurf/rocketchat)
- [Angular](https://github.com/hxrsmurf/angular-basic-twilio)