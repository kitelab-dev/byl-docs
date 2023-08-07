# Нэхэмжлэх

## Нэхэмжлэх үүсгэх

- HTTP Method: `POST`
- Content Type: `application/json`
- URL: `https://byl.mn/api/v1/invoices`

**Параметер**

| Параметер      | Төрөл   | Заавал эсэх | Тайлбар             |
| -------------- | ------- | ----------- | ------------------- |
| `amount`       | Number  | true        | Мөнгөн дүн.         |
| `description`  | String  | false       | Тайлбар.            |
| `auto_advance` | Boolean | false       | Автоматаар эцэслэх. |

**Жишээ хүсэлт**

```shell
BYL_TOKEN="таны API token"
$ curl -X POST https://byl.mn/api/v1/projects/1/invoices \
    -H "Authorization: Bearer $BYL_TOKEN" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json'
    -D '{ "amount": 10, "description": "Test invoice", "auto_advance": true }'
```

Дээрх өгөгдсөн `BYL_TOKEN`-р танийг таних үйлдэл хийгдэж таны удирдаж буй 1 дугаартай төсөлд шинээр нэхэмжлэх үүсгэж байна. Ингээд дараахь жишээ хариу буцах болмно.

**Жишээ гаралт**

```json
{
  "data": {
    "status": "open",
    "amount": 10,
    "description": "Test invoice",
    "number": "TEST-0002",
    "project_id": 1,
    "due_date": "2023-08-06T13:13:07.000000Z",
    "updated_at": "2023-08-05T13:13:07.000000Z",
    "created_at": "2023-08-05T13:13:07.000000Z",
    "id": 2,
    "hosted_invoice_url": "https://checkout.byl.mn/i/2/1rAXrIZdvbU3fEJTghVd8QLq5QFGkH0P"
  }
}
```
