
# nodejs-url-shortener

NodeJS URL Shortener Service


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`FRONTEND_BASE_URL`
`SHORTENER_BASE_URL`
`SERVICE_NAME`
`MONGODB_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/sirajmhanna/nodejs-url-shortener.git
```

Go to the project directory

```bash
  cd ./nodejs-url-shortener
```
Install dependencies

```bash
  npm install
```

Create .env file (check .env.example file)

```bash
  touch .env 
```

Start the server

```bash
  npm run dev 
```
## API Reference

#### URL Shortener

```http
  POST /api/urls/shortener
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` | `string` | **Required**. Original url |

#### Get Original URL

```http
  GET /api/urls
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `code`      | `string` | Short url code |


## Authors

- [@sirajmhanna](https://www.github.com/sirajmhanna)

