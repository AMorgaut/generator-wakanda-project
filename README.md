# generator-wakanda-project 
[![NPM version](https://badge.fury.io/js/generator-wakanda-project.svg)](http://badge.fury.io/js/generator-wakanda-project)
[![Build Status](https://secure.travis-ci.org/AMorgaut/generator-wakanda-project.png?branch=master)](https://travis-ci.org/AMorgaut/generator-wakanda-project)

> [Wakanda](http://wakanda.org) Project [Yeoman](http://yeoman.io) generator


## About

Wakanda Server and WakandaDB integrate an HTTP server and a JavaScript engine on top of a fast NoSQL Object datastore to creates an unbeatable combination for accessing your relational data quickly with a strong business logic applied.

This _unoficial_ Yeoman generator creates Wakanda projects and solutions you can then edit from any dev tools, and provides a Grunt serve task to launch them on Wakanda server.

## How to install

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

To install generator-wakanda-project from npm, run:

```bash
npm install -g generator-wakanda-project
```

## How to use

### Project generator

This generator will create a project and a solution to run it
To Initiate the generator, do:

```bash
yo wakanda-project [appName]
```


## Serve Task

The "serve" thsk will launch the solution on the Wakanda Server and run the "open" task. To run it you'll do:

```bash
grunt serve
```

Note that the "serve" task flags are all sent to the "open" task it invokes. You can then do directly:

```bash
grunt serve --catalog
```

## Open Task

The "open" will as expected open an URL in the browser that, from the generated `Gruntfile.js` will be selected to be  "Google Chrome" (The goal is to be used in combination with "google-chrome-reload" and "watch"). This option is easy to change in Gruntfile.js.

### Show the project catalog [JSON]
```bash
grunt open --catalog
```

### Show a Dataclass description [JSON]

Shows the description of its attributes and methods

```bash
grunt open --class=Product
```

### Show data objects from a specific Dataclass [JSON]

```bash
grunt open --data=Product
```


## TODO

* Find better way to make open not stop the server
* Make Grunt work with multiple projects
* Make Wakanda server parameters work to handle the debug mode
* Watch Wakanda server files and reload when required with via 'grunt-reload-chrome'
* Make unit tests work correctly handle withArgs() and withPrompt()
