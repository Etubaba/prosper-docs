<div align="center">
  
 # [Welcome to Prosper Docs - A Real-Time Text-Editor Application!](https://github.com/Etubaba/prosper-docs.git) <img src="https://github.com/Etubaba/prosper-docs.git"  width="3%" height="3%">

</div>

<div align="center">
  
---

This project was deployed on [Vercel.com](https://vercel.com/) and can be accessed [here](https://prosper-docs-one.vercel.app/).

---

</div>

### <span style="color:#297deb"> Project Status: </span><span style="color:#64fccc">Completed.</span>

## <span style="color:#297deb"> Project Description: </span>

This is a text editor application, which means that you can edit a text file with your friends, in real time.
The purpose of this project is to collaborate in document shared among users `concurrency`, `consistency`, `availability`, `partition tolerance`, etc.

## <span style="color:#297deb"> System Architecture: </span>

The system is composed of three main components: the `server`, the `client` and the `database`.

- **_<span style="color:#297deb"> Client </span>_**: The client is created using [React](https://react.dev/) that is responsible for sending the requests to the server and receiving the responses from it. The client contains a web interface for the document visualization. As for the UI, it uses [Quill](https://github.com/zenoamaro/react-quill), which is a React component wrapping [Quill](https://quilljs.com/), a powerful and extensible rich text editor. The communication between the client and the server is made using [Socket.IO](https://socket.io/docs/v4/index.html), which is a library that enables real-time, bidirectional and event-based communication between the browser and the server.
- **_<span style="color:#297deb"> Server </span>_**: The server is made in [NestJS](https://docs.nestjs.com/) in which is the most complex element of the system, that is responsible for holding a list of current active documents sessions, along with the basic server purpose that is receiving the client's messages. Just like in the client When the client request is processed, the client web interface will be updated. Futhermore, the server will send a response which updates the client web interface. Just like in the client, the server uses (obviously) [Socket.IO](https://socket.io/docs/v4/index.html) to communicate with the client. The communication between the server and the database is made using [Prisma](https://www.prisma.io/docs), which is an Object Relation Mapping (ORM) library.
- **_<span style="color:#297deb"> Database </span>_**: Lastly, the database used is a [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/), that is a `NoSQL` database who is responsible for storing the text document which will be in the format of a [JSON](https://json-schema.org/learn/getting-started-step-by-step.html), as follows:
  json
  {
  "\_id": "Document ID",
  "data": "Document Text"
  }

## Note

The backend was hosted on render, and due to it is hosted on a free tier, the APIs might take 1-2mins to be ready on the first hit of the api endpoints (This is so because of the time for the app to spine up after it is short down 15mins of app inactivity), so expect a loading for 1-2mins on the first call of any endpoint.

# <span style="color:#297deb"> How to run: </span>

## Guide and Instruction

The index page is an introductory page, with little information about the app. A user is expected to click on **`Get Stated`** button on the page to create an account, or click on **`Go to docs`** to access user page if authenticated, but if not, user will be redirected to login page. On user page after authentification, user can create new document on clicking on the **`+`** sign , and also user can view all his/her previously created documents. On create of document or on click of any displayed document user is redirected to the document page, where user can edit document content on the paperlike UI displayed, user can edit title and optional discription field of the document by the click of the edit icon on the page header, additionally user can also manually save document by clicking on the saved button (although documents are saved authomatically after 5 seconds of user typing on the document), In addition, user can share document by providing the email of the target user , and the target user gets an authomatic email with a link the target user is expected to click to access the document. Finally, user can collaborate with other users on a single document, and a list of every users on a particular document is displayed on the left side of the document page.

## Running Server locally

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov

# specific  spec file name
$ yarn test <test-file-name>

```

## API BASE_URL

```bash
 $ https://prosper-docs-vyrc.vercel.app/api/v1
```

# REST API

The REST API to the this app is described below.

## User Registration

### Request

`POST /auth/register`

    curl -i -H 'Accept: application/json' -d 'user_name=samuel lala&email=lamus@gmail.com&password=12345' https://prosper-docs-vyrc.vercel.app/api/v1/auth/register

### Response

    HTTP/1.1 201 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 created
    Connection: close
    Content-Type: application/json

{
"user": {
"id": "6494665ebaa5653dfcb90f39",
"user_name": "Samuel Folajimi",
"email": "prosperdiscovery@gmail.com",
},
"accessToken": "gfgh....",
"refreshToken": "jhj...."
}

## Refresh User Token

### Request

`POST /auth/refresh`

    curl -i -H 'Accept: application/json' -d 'refreshToken=mmsmmsm....' https://prosper-docs-vyrc.vercel.app/api/v1/auth/refresh

### Response

    HTTP/1.1 200
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 Created
    Connection: close
    Content-Type: application/json

{
"user": {
"id": "6494665ebaa5653dfcb90f39",
"user_name": "Samuel Folajimi",
"email": "prosperdiscovery@gmail.com",
"account_balance": 0
},
"accessToken": "gfgh....",
"refreshToken": "jhj...."
}

## User Login

### Request

`POST /auth/login`

    curl -i -H 'Accept: application/json' -d 'phone=0908867776&password=new88' https://prosper-docs-vyrc.vercel.app//api/v1/auth/login

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Type: 'application/json'

{
"user": {
"id": "6494665ebaa5653dfcb90f39",
"full_name": "Samuel Folajimi",
"phone": "07054545678",
"email": "prosperdiscovery@gmail.com",
"account_balance": 0
},
"accessToken": "gfgh....",
"refreshToken": "jhj...."
}

## Get User Details with User Documents

### Request

`GET /user/:id`
`Authorization  Bearer`

    curl -i -H 'Accept: application/json' -d https://prosper-docs-vyrc.vercel.app//api/v1/user/id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

{data:{

"id": "6494665ebaa5653dfcb90f39",
"user_name": "Samuel Folajimi",
"email": "prosperdiscovery@gmail.com",
documents:[]

}}

## Create document

### Request

`POST /document/create`
`Authorization  Bearer`

    curl -i -H 'Accept: application/json' -d 'user_id=new88' https://prosper-docs-vyrc.vercel.app/api/v1/document/create

### Request

{
data: {
id: 'doc_di',
owner_id: 'user_id',
description: null,
content: { ops: [Array] },
title: 'First matter',
created_at: '2023-08-09T18:01:41.073Z',
updated_at: '2023-08-10T19:30:28.154Z',
doc_room: {
id: 'room_id',
created_at: '2023-08-09T18:01:42.156Z',
permitted_users: [Array],
owner_id: 'user_id',
documentsId: ''doc_di''
}
}
}

## Get Single Document with document Id

### Request

`GET /document/:id`
`Authorization  Bearer`

    curl -i -H 'Accept: application/json' -d https://prosper-docs-vyrc.vercel.app/api/v1/document/id

### Response

{
data: {
id: 'doc_di',
owner_id: 'user_id',
description: null,
content: { ops: [Array] },
title: 'First matter',
created_at: '2023-08-09T18:01:41.073Z',
updated_at: '2023-08-10T19:30:28.154Z',
doc_room: {
id: 'room_id',
created_at: '2023-08-09T18:01:42.156Z',
permitted_users: [Array],
owner_id: 'user_id',
documentsId: ''doc_di''
}
}
}

## update Document with document Id

### Request

`PATCH /document/update/:id`
`Authorization  Bearer`

curl -i -H 'Accept: application/json' -d 'title=new88' https://prosper-docs-vyrc.vercel.app/api/v1/document/update/:id

### Response

{
data: {
id: 'doc_di',
owner_id: 'user_id',
description: null,
content: { ops: [Array] },
title: 'First matter',
created_at: '2023-08-09T18:01:41.073Z',
updated_at: '2023-08-10T19:30:28.154Z',
doc_room: {
id: 'room_id',
created_at: '2023-08-09T18:01:42.156Z',
permitted_users: [Array],
owner_id: 'user_id',
documentsId: ''doc_di''
}
}
}

## Share Document with another user with user email

### Request

`POST /document/share`
`Authorization  Bearer`

curl -i -H 'Accept: application/json' -d 'enail=new88&&documentId' https://prosper-docs-vyrc.vercel.app/api/v1/document/share

### Response

{ message: 'Email shared Successdully' }

## <span style="color:#297deb">Websocket Events : </span>

The websocket contains the following events:

- **_<span style="color:#64fccc"> load-document </span>_**: This event is used to sent a request to the server to get the the specific document from the database and return the document data to the client.
  - **`Parameters`**:
    - **`documentId`**: The document ID.
  - **`Return`**:
    - The event that will be sent to the client, so that it can update the text editor UI with the document data.
- **_<span style="color:#64fccc"> save-document</span>_**: This event is an event that saves the document to the mongodb server.

  - **`Parameters`**:
    - **`document data & documentId`**: The document data that is to be saved and the document Id
  - **`Return`**:
    - **`none`**;

- **_<span style="color:#64fccc"> document-change </span>_**: This event is used to send realtime editting of document, to all collaborators so they can see the realtime editting.

  - **`Parameters`**:
    - **`delta`**: The document changes made by the user.
  - **`Return`**:
    - **`delta`**: The document changes that will be broadcasted to the other users, so that they can update their text editor UI.

- **_<span style="color:#64fccc"> update-document </span>_**: This event is used to receive the changes from the server that were made by the other user(s) that are in the same document session.

  - **`Parameters`**:
    - **`delta`**: The document changes made by the other user(s).
  - **`Return`**:
    - **`none`**;

- **_<span style="color:#64fccc"> cursor-update</span>_**: This event is used to send a realtime cursor position to the server.

  - **`Parameters`**:
  - - **`documentId cursorPsition user_name user_color socketId`**: The document ID.

  - **`Return`**:
    - **`none`**;

- **_<span style="color:#64fccc"> cursor-position</span>_**: This event is used to receive realtime cursor position from the server.

  - **`Parameters`**:
  - - **`documentId`**: The document ID.

  - **`Return`**:
    - **` cursorPsition user_name user_color socketId`**;

- **_<span style="color:#64fccc"> connected-users</span>_**: This event is listen for all users/collaborators in a single document.
  - **`Parameters`**:
    - **`none`**;
  - **`Return`**:
    - **`none`**;

# Client App

## Getting Started

Firstly ,install run the development server:

```bash
npm install

npm run dev
```

After successfully running app, open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Thank You
