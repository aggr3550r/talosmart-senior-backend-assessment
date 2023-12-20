

## Description
TALOSMART SENIOR BACKEND ASSESSMENT



## Description

This is a simple todo application that is powered with NestJS, TypeScript, MySQL | PostgreSQL and TypeORM - a combination of top choice modern technology. It is built in partial fulfilment of the interview requirements at Talosmart.

## Functionalities

The idea of the app is one that allows users to sign up and login and also retrieve items and item details based on specified criteria. 

## Running the app

In order to run the app, the first thing you need to do is clone the code into your local machine and then create a .env file in the root of your project. The .env file should be like the one below
```bash
APP_PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=medusa
DB_PORT=3306
DATABASE=talosmart_datastore
DATABASE_URL=postgres://victor:7yFlbAq4oXUA0rD9QgiIKg1XHKsU6hhf@dpg-clp39m946foc73a6dp7g-a.oregon-postgres.render.com/talosmart_datastore (NOTE: not needed if environment is dev)
JWT_SECRET=hapmashKV
JWT_EXPIRES_IN=24h
JWT_COOKIE_EXPIRES_IN=24
NODE_ENV=prod | dev
```

With that out of the way, there are two possible paths along which to proceed enumerated below:
### * Dockerfile

#### Dockerfile
To run the app using the Dockerfile provided, take the following steps:
- Setup:
  Fire up Docker Desktop to make sure that the Docker daemon is up and running
  
- Build docker image:
  Run the following command in the terminal from the root directory of the project:
 ```
 docker build -t talosmart-image .
 ```
 
 - Map the host port to the container port, mount the .env file in your project as a volume onto the image in the container and then run the container:
  The above step can be achieved by running the following command from the root directory of your project:
 ```
 docker run -p 8000:80 /path/to/local/app/.env:/path/to/container/app/.env talosmart-image
 ```
  For example, this is the command I personally use:
 ```
 docker run -p 8000:80 -v /Users/victor/Desktop/talosmart-senior-backend-assessment/.env:/app/.env talosmart-image:01
 ```
That should do it, your Cloud Backup API is up and ready for use @ http://localhost:3000 ! 

Here is the URL to the deployed application on Render:
https://talosmart-web-service.onrender.com

And here is the URL to the published documentation on Postman:
https://documenter.getpostman.com/view/23331716/2s9YkgCQF6


#### To run the app without Docker
```bash
# start server
$ npm run start:dev
```


- Author - [Victor Uche](https://github.com/aggr3550r/)


## License

Talosmart Senior Backend Assessment is [MIT licensed](LICENSE).
