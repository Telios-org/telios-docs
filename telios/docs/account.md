---
id: accountCreation
title: Account Security
sidebar_label: Account
---

Almost every online service requires their users to create a username and password and then stores those credentials in their database. It's usually a black box as to what types of security those services have implemented, and people have grown accustomed to security breaches and data leaks at some of the biggest tech companies. Keeping your accounts secure has meant creating unique and challenging to crack passwords for each service. Memorizing credentials is impossible for most, so many people have opted for storing all of their passwords in password managers.

## Registration

For added security and convenience, we don't create accounts with usernames and passwords. We only require a few things when creating an account—your desired email address, a recovery email, and a memorized master password. The master password you create is neither sent nor stored on our servers nor saved anywhere on your device. The only way to access your account and data is on your device with a password that only exists in your head.

If you ever forget your password, a recovery key will be made available to download for safekeeping immediately after registering a new account.

### Client Side

Your device will generate a bundle of [private and public keys](encryption#keypairs) used for encryption during registration. The private and public keys are stored on the device in an encrypted [SQL Cipher](https://www.zetetic.net/sqlcipher/) database, and the public keys and recovery email are then signed by the client and sent to the server for registration.

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

A new account gets created from the registration payload that includes your public keys, your unique device ID, your device's public signing key, and your recovery email. The recovery email is hashed and will only be used to recover a lost account. The client's email address combined with the recovery email, is the only user information stored on the server.

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

## Authorization

The client accesses protected API endpoints by locally generating an authentication token. The payload consists of claims, an account signature returned by the server during registration, and a timestamp. All of this gets cryptographically signed with the client's [signing key](encryption#keypairs), base64 encoded, and then added as an authorization header in the request to the API server. The client generates a new token for every request and will expire after 10 seconds.

### Authorization Payload (before base64 encoding)

```javascript
{
  claims: {
    device_signing_key: '29327af19432c4b818a69376671ba2209c17f2b195b319b4b6799f8a70e6e38a',
    sbpkey: '2285f5daca0d2019ed70c4b1a9bab271dfc17d4482a617cbf5e91305d186d277',
    discovery_key: '15ba7a6b41e29e8fda0fc9d4a2f4375e2b7ecc4e4354e3122d8a108732518028',
    device_id: 'a12cb5c4-7161-31cf-b11f-a5e5768eeba9',
    date_time: '2021-01-21T02:31:40.347Z',
    sig: '9aa0f9be995d975260e6336563da1f92865a99b8f281791c3631f0002ed356c04984b658a9286efb21f963d06f17147a55f109ad28c0bfb3bc2503f0676b20e0'
  },
  sig: '91f6227d9595331b5d6453f821ab03c30a69fc810ff87372462a1910ae73d86beaa9f9034662b02750fbb060c08fa863620e998ed950f9c1556db1695b09e62f'
  }
}
```
