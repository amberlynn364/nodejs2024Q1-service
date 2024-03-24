# Home Library Service

REST API where `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Run application

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/).

### Downloading

```
git clone https://github.com/amberlynn364/nodejs2024Q1-service.git
```

### Go to the project directory

```
cd nodejs2024Q1-service
```

### create `.env` file

```
cp .env.example .env
```

### 4. Run docker containers
```
docker-compose up
```

To stop running containers execute the following command

```
docker-compose down
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Testing

After application running open new terminal and enter:

| Script                                 | Description                                     |
| :------------------------------------- | :---------------------------------------------- |
| `npm run test`                         | run all tests without authorization             |
| `npm run test -- <path to suite>`      | run only one of all test suites                 |
| `npm run test:auth`                    | run all test with authorization                 |
| `npm run test:auth -- <path to suite>` | run only specific test suite with authorization |

#### Auto-fix and format

```
npm run lint
```

```
npm run format
```
