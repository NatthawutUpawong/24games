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
open http://localhost:3000
