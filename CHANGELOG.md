# Trail Tracker Changelog

## version 1.0.0

- introduce image upload support via cloudinary
- feat(models): implement cloudinary storage
- feat(category): add image upload
- feat(routes): add category image upload route
- feat(views): add category image and upload

## version 0.3.0

- feat(db): add mongo seeder and sample data
- include mais-mongoose-seeder into project
- seed a set of sample data

- test(fixtures): add user credentials for API auth
- feat(auth): integrate JWT with swagger and tests
- annotate authenticate route with documentation
- introduce authenticate Swagger return values
- introduce authenticate Swagger parameter validation

## version 0.2.0

- test(admin): add user to fixtures
- test(admin): add user to API tests
- feat(accounts): add deleteUser action
- feat(dashboard): redirect user based on role
- feat(admin): add user list partial
- feat(admin): add dashboard view
- feat(admin): add delete user route

- feat(models): add update method to user stores
- feat(services): add user analytics utility
- feat(profile): add update user and analytics
- feat(dashboard): implement user analytics
- feat: pass views userId for profile access
- feat(routes): add user profile routes
- feat(views): add partial and view for user profile
- feat(nav): add profile link to menu partial
- feat(views): add partials for user analytics

## version 0.1.0

- added .gitgnore from <https://github.com/github/gitignore>
- add CHANGELOG file

- installed hapi
- first simple server
- start command

- install eslint + prettier
- add lint command script
- add eslint + prettier config

- vision and inert hapi components
- simple in-memory category and user models
- account controller + views & partials
- category controller + views & partials

- about controller + view added
- introduce trail model
- category controller + view & partials added
- support adding trackApi to categories
- introduce sessions
- associate categories with userApi

- support delete category + tracks
- introduce .env for secrets
- include Joi schema validation for signup form
- incorporate JSON data stores

- create test fixtures
- introduce User model tests
- incorporate mocha & chai components
- complete joi schemas

- develop mongo stores for user, category and trail
- install mongoose component
- introduce category store tests
- complete user mem store (fixing test failures)

- refactor tests in groups
- introduce simple user API
- develop tests for API
- incorporate Boom for exception handling

- introduce category test interface
- refactor tests to use skeleton
- incorporate nodemon to launch dev server

- support static assets via inert plugin
- introduce the swagger support
- enhance user API to generate Swagger documentation
- include output validation on user API

- complete user, category and trail schemas
- incorporate jwt components into project
- include authenticate route
- secure the api routes via jwt token
