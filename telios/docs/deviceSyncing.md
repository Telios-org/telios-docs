---
id: deviceSyncing
title: Device Syncing
---
:::caution

This feature has not been fully implemented.

:::

Device syncing happens over the peer-to-peer network using a multi-writer distributed database called [Multi Hyperbee](https://github.com/tradle/multi-hyperbee), which is built on top of [Hypercore Protocol](https://hypercore-protocol.org/) and [Hyperbee](https://github.com/hypercore-protocol/hyperbee).


![](../static/img/Device_Syncing.svg)

Each device has a full copy database that gets replicated in real-time with all connected devices. To reduce the duplicate data needed to keep everything in sync, each device  has a separate database that contains only the diffs. This diff database is what the devices replicate amongst themselves and sync those diffs to their full copy database.


## What happens when devices aren't online?
If there are three connected devices, and only Device A is online making updates and then disconnects before Device B or C comes back online, B and C will be unable to sync those changes. To maintain data continuity between all devices, Telios gives users the option to seed the encrypted full copy database and it's diffs.

Much like seeding torrent files, this ensures that data consistently replicates between devices and still allows data to be shared over the peer-to-peer network even when all devices are offline.

![](../static/img/Device_Syncing_Server.svg)

:::note

Only the devices contain the keys needed to decrypt the data they are replicating amongst themselves. A bad actor would be unable to get these connected devices to replicate and sync their data because data the devices cannot decrypt is immediately rejected and discarded.

:::
