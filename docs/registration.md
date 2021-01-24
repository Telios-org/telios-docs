---
id: registration
title: Account Registration
---

Almost every online service requires users to create a username and password which are then stored in that company's database. It's usually a block box as to what types of security those services have implemented which has resulted in security breaches and data leaks at some of the biggest tech companies. Keeping your accounts secure has meant creating unique and hard to crack password for each service. Memorizing all of these credentials is impossible for most, and so a lot of users have opted to storing all of their passwords in a password manager.

To make Telios secure and convenient we don't create accounts with usernames and passwords and only require a few things when creating an account. Your desired Telios email address, a recovery email, and a memorized master password. The master password you create will not be sent to or stored on our servers, nor is it stored anywhere on your device. This means the only way to access your encrypted data is on your personal device with a password that only exists in your head. Telios has no web client or any means of accessing your account and data other than from your personal device.

If a password is ever forgotten, you will have the option to recover your account with a recovery key that is only shown and made available for safe keeping after registering a new account.

### Client Side

During registration your device will generate a bundle of private and public keys used for [encryption](encryption). The private and public keys are stored on the device in an encrypted [SQLite database](https://www.zetetic.net/sqlcipher/), and the public keys and recovery email are then signed and sent to the server for registration.

```javascript
{
  account: {
    device_signing_key: '29327af19432c4b818a69376671ba2209c17f2b195b319b4b6799f8a70e6e38a',
    sbpkey: '2285f5daca0d2019ed70c4b1a9bab271dfc17d4482a617cbf5e91305d186d277',
    discovery_key: '15ba7a6b41e29e8fda0fc9d4a2f4375e2b7ecc4e4354e3122d8a108732518028',
    recovery_email: 'alice@mail.com',
    device_id: 'a12cb5c4-7161-31cf-b11f-a5e5768eeba9'
  },
  sig: '9aa0f9be995d975260e6336563da1f92865a99b8f281791c3631f0002ed356c04984b658a9286efb21f963d06f17147a55f109ad28c0bfb3bc2503f0676b20e0'
}

```

### Server Side

A new account is created from the registration payload that includes the user's public keys, their device information, and recovery email. The recovery email is hashed and will only be used to recover a lost account. This combined with the email address created by the client is the only user information that gets stored on the server.

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
  sbpkey: '2285f5daca0d2019ed70c4b1a9bab271dfc17d4482a617cbf5e91305d186d277'
  discovery_key: '15ba7a6b41e29e8fda0fc9d4a2f4375e2b7ecc4e4354e3122d8a108732518028'
  devices: [
    {
      _id: 'dd341b0d92c6cd1ee8',
      device_id: 'a12cb5c4-7161-31cf-b11f-a5e5768eeba9'
      device_signing_key: '29327af19432c4b818a69376671ba2209c17f2b195b319b4b6799f8a70e6e38a'
    }
  ],
  createdAt: '2021-01-21T02:31:40.347Z',
  updatedAt: '2021-01-21T02:31:40.347Z'
}
```

#### Mailbox

```javascript
{
  _id: 'fac223ck83f3ef72a3',
  _type: 'mailbox', // mailbox or alias
  _drive: '5d64b9ee6f9ed7f08deb028815664d8a31858348b1bdf3f0b81c75a68cf6d504',
  _bytes_used: 0,
  sbpkey: '2285f5daca0d2019ed70c4b1a9bab271dfc17d4482a617cbf5e91305d186d277',
  address: 'alice@telios.io'
}
```
