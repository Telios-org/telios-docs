---
id: faqGeneral
title: Frequently Asked General Questions
sidebar_label: General
---

### How does Telios intend to make money?
We intend to offer storage plans for backing up and seeding encrypted data when devices go offline. We also plan to add additional features like aliases and business accounts that will be part of paid plans.

### How do I know I can trust this service?
We've open-sourced all of our client code and welcome the community in verifying our privacy claims. 

### Can I access my data offline?
Yes. Internet access is not required to log into the application, and all data stored on your device will always be available whether or not our servers are online.

### Will I still get emails if I'm offline?
Yes. We store [encrypted metadata](email#retrieval-metadata) on our server if your device is unreachable or offline. When your device reconnects, it retrieves this encrypted metadata containing the information needed to retrieve your email over the peer-to-peer network.

### How many devices can I sync?
There is no limit on the number of devices you can connect and sync. Keep in mind that more storage may be required for the devices to replicate their data.

### Can I email people without a Telios email?
Yes! We've included a [mail server](email#sending-emails) with our service allowing you to still send and receive emails from other email providers.

### Does Telios plan to Federate the network?
We don't intend to build another walled garden where Telios becomes the only service using this email protocol. We plan on eventually federating but want to wait for the platform to be at the right maturity before doing so.

### When will you open source the backend to allow self-hosting?
We do plan on eventually open-sourcing backend code for those who want to self-host.
