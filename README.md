# Nest auth

NestJS Authentication with JWT, PassportJs, and Prisma

## Getting Started

1. Clone the repository: `git clone https://github.com/saidMounaim/nest-auth.git`
2. Install dependencies: `npm install`
3. Create a .env file in the root and add the following

```
DATABASE_URL=""

JWT_SECRET=""
```

4. Start the development server: `npm run dev`

## Built With

- [NestJs](https://nestjs.com/)
- [PassportJs](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)

## Endpoints

### Login

```
/auth/login
```

Method: POST\
Description: Authenticates a user and returns a JWT token.\
Body:

```
{
  "email": "string",
  "password": "string"
}
```

### Register

```
/auth/register
```

Method: POST\
Description: Registers a new user and returns a user info.\
Body:

```
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Get currect user

```
/auth/profile
```

Method: GET\
Description: Retrieves user profile information. Requires a Bearer token for authentication.\
Body:

```
Authorization: Bearer <token>
```

## Contribution

All kind of contributions are welcome, please feel free to submit pull requests.
