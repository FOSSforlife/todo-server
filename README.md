Author: Elias Jackson; ejthedj0@gmail.com

This is a simple server I set up which displays all my TODOs on a local webpage.

The "/richtext" view enables me to embed this in a KDE Plasma 5 widget on my desktop.

NPM modules used:
- express: for the server
- ejs: for the templating engine
- [walk](https://git.coolaj86.com/coolaj86/fs-walk.js.git): to traverse the code directory
- [leasot](https://github.com/pgilad/leasot): to parse each file for TODOs
