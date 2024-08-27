To run:
```sh
bun run dev
```
### Routes

```
POST /api/signup (Create User)
POST /api/signin (Login User)
GET  /api/getpofile (Get User Profile)
POST /api/signout (Logout)
POST /api/addanswers (Create answer)
GET  /api/answers?number=เลขสี่ตัวที่ต้องการหาคำตอบ
PATCH /api/edtanswers/id (Edit by id)
DELETE /api/deleteanswers/id (Delete by id)
```


### Usage

```
POST /api/signup (Create User)
```

```json
{
  "username": "chain1",
  "password": "11111111"
}

```

```
POST /api/signin (Login User)
```

```json
{
  "username": "chain1",
  "password": "11111111"
}
```

```
POST /api/addanswers (Create answer)
```

```json
{
  "number": "12312312",
  "answers": [
    "(1+2)*(3+4)",
  ]
}
```

```
PATCH /api/edtanswers/ (Edit answer)
```

```json
{
  "number": "4321",
  "answers": [
    "(1+2)*(3+4)"
  ]
}
```

open http://localhost:3000
