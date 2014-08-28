# generator-wakanda-project 
[![NPM version](https://badge.fury.io/js/generator-wakanda-project.svg)](http://badge.fury.io/js/generator-wakanda-project)
[![Build Status](https://secure.travis-ci.org/AMorgaut/generator-wakanda-project.png?branch=master)](https://travis-ci.org/AMorgaut/generator-wakanda-project)

> [Yeoman](http://yeoman.io) [Wakanda](http://wakanda.org) Project generator


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

Initiate the generator

```bash
yo wakanda-project [appName]
```

It will create a project and a solution to run it

```bash
grunt serve
```

will launch the solution on the Wakanda Server

```bash
grunt open:catalog
```

will open the project catalog URL in Google Chrome


## TODO

* Make open work to launch the project catalog / pages in the browser
* Make Wakanda server parameters work to handle the debug mode
* Watch Wakanda server files and reload when required
* Make unit tests work correctly with arguments and prompt
