# Contact Email Microservice 
### :envelope_with_arrow: A configurable Microservice that centralizes contact requests


```
 Repos:

 GITHUB: github.com/cusspvz/contact-email.microservice
 NPM: @cusspvz/contact-email.microservice
 DOCKER: cusspvz/contact-email.microservice
```

## Features

### Anti-Spam
+ reCAPTCHA
+ CORS

### Client
+ GMail
+ SMTP

### Healthcheck
+ `/healthz`

## Usage

### Docker

```
docker pull cusspvz/contact-email.microservice
docker run -ti --rm --env-file path/to/settings.env cusspvz/contact-email.microservice
```

## Configuration

### Nodemailer

#### `NODEMAILER_SERVICE`
+ Default: `null`
+ Description: Defines a service for the transport

#### `NODEMAILER_HOST`
+ Default: `false`
+ Description: Sets the host to connect to.

#### `NODEMAILER_SECURE`
+ Default: `false`
+ Description: Set this variable as `1` if you want the transport to use secure ports

#### `NODEMAILER_AUTH`
+ Default: `false`
+ Description: Set this variable as `1` if you want to setup authentication

#### `NODEMAILER_TYPE`
+ Default: `false`
+ Description: Sets the authentication type. (needed for OAuth2)
+ Note: Requires `NODEMAILER_AUTH` to be set

#### `NODEMAILER_ACCESS_TOKEN`
+ Default: `false`
+ Description: Sets the token on authentication. (needed for OAuth2)
+ Note: Requires `NODEMAILER_AUTH` to be set

#### `NODEMAILER_USER`
+ Default: `false`
+ Description: Sets the user on authentication.
+ Note: Requires `NODEMAILER_AUTH` to be set

#### `NODEMAILER_PASS`
+ Default: `false`
+ Description: Sets the password on authentication.
+ Note: Requires `NODEMAILER_AUTH` to be set


### CORS

#### `CORS_ORIGIN_REGEXP`
+ Default: `null`
+ Description: Defines a CORS origin based on a regexp
+ Note: Please insert the regexp without the slashes
+ Example: `(?:(www|marketing).)website.(com|org)`


#### `CORS_ORIGIN_COMMA_SEP`
+ Default: `null`
+ Description: Defines a CORS origin based on a comma separated string
+ Note: Please insert the urls without extra spaces
+ Example: `website.com,website.org,www.website.com,www.website.org`



### reCAPTCHA

#### `RECAPTCHA`
+ Default: `null`
+ Description: Set this variable as `1` if you want to setup reCAPTCHA

#### `RECAPTCHA_PUBLIC_KEY`
+ Default: `null`
+ Description: Defines the reCAPTCHA Public key
+ Note: Requires `RECAPTCHA` to be set.


#### `RECAPTCHA_PRIVATE_KEY`
+ Default: `null`
+ Description: Defines the reCAPTCHA Private key
+ Note: Requires `RECAPTCHA` to be set.



