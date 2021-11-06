<h1 align="center">Piwo</h1>

<p align="center">
<img src="https://cdn.discordapp.com/attachments/845424135018250283/869636557328482344/unknown.png" width="800">
</p>

## About

Piwo is a friendly command-line tool to do HTTP request to a API server. Sending
request body as JSON.

## Installation

```console
deno install -A --import-map=https://deno.land/x/piwo/import_map.json -n piwo --no-check https://deno.land/x/piwo/cli.ts
```

The permissions that Piwo uses are:

- --allow-net
- --allow-read
- --allow-write
- --allow-env

## Updating Piwo

```console
deno install -f -r -A --import-map=https://deno.land/x/piwo/import_map.json -n piwo --no-check https://deno.land/x/piwo/cli.ts
```

Check if Piwo has been updated

```console
piwo --version
```

## Using without install

```console
trex exec piwo [...args] or trex exec piwo@[version] [...args]
```

## Usage

### Syntax

```console
piwo [METHOD] [URL] [BODY]
```

`METHOD`: must be uppercase and they can be `GET`, `POST`, `PUT`, `PATCH` and
`DELETE`. If you don't send a method Piwo will make a `GET` (default) request.

`URL`: you can omit the protocol in the url (http or https).

`BODY`: the body is JSON (default).

### Make a GET request

```console
piwo GET https://api.github.com/
```

A shortest way:

```console
piwo api.github.com
```

### Make a POST, PATCH or PUT request sending a body/JSON

```console
piwo POST localhost:3000/send_your_foo foo=bar
```

If you need to send a value with spaces, use quotes.

```console
piwo PATCH localhost:3000/update_your_foo foo="this is my bar"
```

You can also send multiple values, just separing with spaces

```console
piwo POST localhost:3000/signup username=foo password=bar
```

### Make a DELETE request

```console
piwo DELETE localhost:3000/your_foo/remove
```

### Sendin a property with object value type

```console
piwo POST localhost:3000/cli/registry cli={name=piwo description="your friendly HTTP cli tool"}
```

### Sending a property with array value type

```console
piwo PATCH localhost:3000/cli/piwo tags=[typescript deno cli http]
```

### Send a form/body

You just need to add the --form flag

```console
piwo --form POST localhost:3000/ search_query="foo bar"
```

## Run command usage

Create a `request.json` file in your project. The keys that piwo are expecting
from the file are names or aliases that can be called in the console, and this
aliases should have as value a config similar to the
[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#headers)
considering that it is not possible to execute javascript code in a json file

#### Example

```json
{
  "github": {
    "method": "GET",
    "url": "https://api.github.com"
  }
}
```

Run the next code in your command-line:

```console
piwo run github
```

### Send a JSON

```json
{
  "new-task": {
    "method": "POST",
    "url": "http://localhost:8080/task/",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "name": "read a json file",
      "description": "piwo should read a json file to simplify a request"
    }
  }
}
```

```console
piwo run new-task
```

### Send a Form

```json
{
  "foo:form": {
    "method": "POST",
    "url": "http://localhost:8080/",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "body": {
      "foo": "bar"
    }
  }
}
```

```console
piwo run foo:form
```

`Content-Type` value can be `multipart/form-data`;

## Some nice tips

### How URL argument works

When you're doing a request you can omit the protocol, Piwo will make a request
with https, if get not response then will try with the http protocol and then
will output the response of the server or a msg that couldn't connect when no
server is found.

When you send the URL with protocol Piwo will not check the other protocol.

If you're sure that the server is on http protocol, we recommend you to pass the
protocol in the url, is faster because piwo will do a direct request with the
procotol and will not check the https procotol.

If the url is a localhost, then will first try with HTTP.
