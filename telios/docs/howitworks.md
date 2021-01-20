---
id: howitworks
title: How it Works
---

In general the service was designed to use external servers as little as possible and to know next to nothing about each user. To give users complete control over their data and privacy, their personal devices have absolute control over how their data is shared, encrypted, and stored.

At it's core, Telios is built on [Hypercore Protocol](https://hypercore-protocol.org/) which allows users to share data with eachother over a peer-to-peer network without the need for a centralized server. This means users are still able to send and recieve emails within the network even if the servers are down. This design also adds a layer of privacy and resiliency over existing private email providers.

## Registration

Only a few things are needed when creating an account. Your desired Telios email address, a recovery email, and a master password. The master password you create will not be sent to or stored on our servers, nor is it stored anywhere on your device. This means the only way to access your encrypted data is on your personal device with a password that only exists in your head. Telios has no web client or any means of logging in other than from your personal device.

### Client Side
During registration your device will generate a bundle of private and public keys used for [encryption](encryption.md). The private and public keys are stored on the device in an encrypted SQLite database, and the public keys and recovery email are then signed and sent to the server for registration.

```javascript
{
    account: {
        device_signing_key: '87f599ab6a339022336314e499979fb80fb872bbeacb261a714892ac16717162',
        sbpkey: '4d2ee610476955dd2faf1d1d309ca70a9707c41ab1c828ad22dbfb115c87b725',
        discovery_key: '4288afe913c47a91d7e8e6252d20a8a37d11e4bef58f41cbe3425c4a3502b207',
        recovery_email: 'alice@mail.com',
        device_id: 'd56fb2e4-7567-45bf-a05b-f6e9468beca4'
    },
    sig: '00d6520b03211f8305a6fbb19bea58f083665a54339cde98dcd66e703456f13f961201b2ba7b991c4ec83a0097d62629f8397971b928f5a9e56f60092ffa6502'
}

```

### Server Side
A new account is created from the registration payload that includes the user's public keys, their device information, and recovery email. The recovery email is hashed and will only be used to recover a lost account. This combined with the email addresses created by the client is the only user information that gets stored on the server.

#### Account
```javascript
{         
    _id: '1ab690cd91f3ea84a4',
    _plan: 0,
    _bytes_used: 0,
    recovery: {
        verified: false,
        email: '0e062fb567307582fd2428b2a8344fef6e5b5e3b0b71ff13ec9aeb70928a3239'
    },
    sbpkey: '63be1b5d0017bdc79430a396f20ae2ae7fd341b0d9416cdbee7c121dc1de3213'
    discovery_key: 'dbe0bdab2274651bbb97d4677ba8ea4cc6228ae349f308e1432b23e42510436d'
    devices: [
        {
            _id: 'dd341b0d92c6cd1ee8',
            device_id: 'd56fb2e4-7567-45bf-a05b-f6e9468beca4'
            device_signing_key: '8e1b3e326009a7657d6e0e22772368e9c14887cb887e5f9f975d2ebcc2f1e475'
        }
    ],
    createdAt: '2021-01-18T21:49:56.825+00:00',
    updatedAt: '2021-01-18T21:49:56.825+00:00'
}
```

#### Mailbox
```javascript
{
    _id: 'fac223ck83f3ef72a3',
    _type: 'mailbox',
    _drive: '5d64b9ee6f9ed7f08deb028815664d8a31858348b1bdf3f0b81c75a68cf6d504',
    _bytes_used: 0,
    sbpkey: '63be1b5d0017bdc79430a396f20ae2ae7fd341b0d9416cdbee7c121dc1de3213',
    address: 'alice@telios.io'
}
```



If a password is ever forgotten, you will have the option to recover your account with a recovery key that is only shown and made available for download after registering a new account.



## Incoming Emails

## Outgoing Emails

## Device Syncing

## Encrypted Backups


