# Node Hub

## Project 
<aside class="warning">
    (this project is old and i will made lots changement)
</aside>

Node hub is a project to organize your node projects and made basics structures.

At this time its design only for MVC projects with ejs. All project are manage by nodeHub node server on only one port.
NodeHub can generate new application architectures by name.

###Next stories :
- rework project creation
- modification of management of apps :
permit usage of node server for independant applications. Find configurations of app, add them to html.
give status of server and permit to start/restart/stop them.
Identify frameworks front or back used.
- build recent structure for apps
- propose session for all apps.
- use multiple mongodb (or)


## Installation

You will need [nodejs](https://nodejs.org/en/).

In this doc i'm using [yarn](https://yarnpkg.com/en/) but you can use [npm](https://www.npmjs.com/) directly
 
 ```bash
 # with yarn
 yarn install
 ```

Now let's run the server on port 9001
 
```bash
# start server
yarn start
```
 ## Usage
 
 To create a new project, add the name project in `server/config.js` file in `app` variable array buy default 
 there is `'home'` defined in it.
 
Restart your server It will create somes repositories and files for you.

- `server/app/[name_project]`
- `web/app/[name_project]/css`
- `web/app/[name_project]/js`
- `web/app/[name_project]/html`
- `web/app/[name_project]/img`

For set strongs restriction on project prepositories you can only place css in /css images in /images

I will change this later and maybe let restriction in options. With my experiences my usage have change and 
those restriction are becoming blocking.