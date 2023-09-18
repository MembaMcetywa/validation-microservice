# NestJs Validation Microservice app

This is a phone number generator microservice used to validate and save the validated phone numbers results to a mongodb instance.

The project is built using the following:

--Nestjs <br />
--TypeScript <br />
--MongoDB <br />
--Docker <br />

# Docker

The microservice utilizes a docker container with a mongoDB instance that we save the result of valition service to. To bootstrap the container execute the following commands:

1. `cd validation-microservice`
2. `docker-compose up -d`
   You can check if the container is up by running the following command:

`docker ps`

This should show you an entry of the mongodb container in the list of running containers. This check confirms to us whether or not the container is running successfully.

Should you wish to you stop the container from running, execute the following command:

`docker compose down`

# Microservice

To get microservice app app running, execute the following commands:

1. `git clone git@github.com:MembaMcetywa/backend.git`
2. `cd validation-microservice`
3. `npm install`
4. `npm run start:dev`
5. `http://127.0.0.1:9000/`

At this point the microservice should be up should be running successfully on port 9000. Generally I would advise with starting your docker container before you start the application because it will attempt to connect the db when it does.
