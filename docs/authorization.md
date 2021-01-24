---
id: authorization
title: Account Authorization
---

The client accesses protected API endpoints by creating its own authentication token. The payload consists of claims, an account signature that was returned by the server during registration, and a timestamp. All of this is cryptographically signed by the client's [signing key](encryption), base64 encoded, and then added as an Authorization header in the request to the API server. A new local token is generated for every request made and expires after 10 seconds.

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
