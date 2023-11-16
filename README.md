[![license](https://img.shields.io/github/license/t-ho/mern-stack)](https://github.com/t-ho/mern-stack/blob/master/LICENSE)

[![mern-logo.png](https://i.postimg.cc/85dtnc7D/mern-logo.png)](https://postimg.cc/2b6Q1zdX)

# Network Monitoring - MERN stack

A full stack application developed using MERN stack that checks the up and down status of network devices like Switch, Access Points, Servers, Domains, etc. Includes informative charts using chart.js with device down email notifications using Node Mailer.

## Run the System

Clone the Repositoy:

```bash
git clone https://github.com/nishant-nez/Network-Monitoring
```

Go Inside the directory:

```bash
cd Network-Monitoring
```

Build the docker image:

```bash
docker-compose build
```

Run the docker container on the background:

```bash
docker-compose up -d
```

Check the application:

```bash
http://localhost:3003/     [frontend]
http://localhost:5005/     [backend API]
```

## Stop the System

Stopping the running container can be done with a single command:

```bash
docker-compose down
```

If you need to stop and remove containers, networks, and all images used by any service in _docker-compose.yml_ file, use the command:

```bash
docker-compose down --rmi all
```

## URL

- Site live at [network.deerwalk.edu.np](https://network.deerwalk.edu.np/)
