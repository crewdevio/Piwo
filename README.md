<h1 align="center">Piwo</h1>

<p align="center">
<img src="https://cdn.discordapp.com/attachments/845424135018250283/865702946892546098/unknown.png" width="800">
</p>

## About

Piwo is a friendly command-line tool to do HTTP request to a API server. It support JSON.

## Installation

```console
deno install --allow-net --import-map=https://denopkg.com/crewdevio/piwo@main/import_map.json -n piwo --no-check https://denopkg.com/crewdevio/piwo@main/cli.ts
```

The permissions that Piwo uses are:

- --allow-net


## Updating Piwo

```console
deno install -f -r --allow-net --import-map=https://denopkg.com/crewdevio/piwo@main/import_map.json -n piwo --no-check https://denopkg.com/crewdevio/piwo@main/cli.ts
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
piwo [method] [url] [body]
```

`Method`: must be uppercase and they can be `GET`, `POST`, `PUT`, `PATCH` and `DELETE`. If you don't send a method Piwo will make a `GET` (default) request.

`Url`: you can omit the protocol (http or https), Piwo will first make a request to https, if the response fails then will make a request with the http protocol.

`body`: The body that you will send is a JSON.

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