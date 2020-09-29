## General

- [ ] Small web application
- [X] Wireframe
- [ ] The app should have two separate components: the Server and the Client.
- [ ] Lists the articles in chronological order.

## Server

- [X] Once an hour, save https://hn.algolia.com/api/v1/search_by_date?query=nodejs to Mongo
- [X] Rest API

## Client

- [ ] Sort by date (most recent first)
- [ ] Can delete one post forever

## Stack

- [X] Express/Koa
- [ ] Angular + Angular Material or React + Material-ui

## Considerations

- [ ] Node.js version >= 8
- [ ] At least 30% test coverage (statements) for the server component
- [X] The whole project has to be uploaded to GitLab
- [ ] Both artifacts (server and client) have to be Dockerized
- [X] To start the project there should be a docker-compose that uses both images and the
MongoDB image.

## Extras

- [ ] Tests and linters should be run on a GitLab pipeline (gitlab-ci.yml).
- [ ] Docker multi-stage build.

## Docs

- [ ] README.md
  - [ ] Add instruction to run it