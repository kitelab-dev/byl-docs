# Нэхэмжлэх

Мөнгөн дүнгээр төлбөрийн нэхэмжлэх үүсгэх боломжтой бөгөөд дахин давташгүй веб хаяг `hosted_invoice_url` буцах болно. Та энэ хаягыг ашиглан харилцагчаа төлбөрийн буланд чиглүүлэх боломжтой юм.

Хэрэв та [webhook](/webhook) тохиргоо хийсэн бол нэхэмжлэх төлөгдсөн талаарх мэдэгдэлийг цаг алдалгүй өөрийн системд хүлээн авах боломжтой юм.

## Нэхэмжлэх обьект

| Параметер            | Төрөл   | Тайлбар                                 |
| -------------------- | ------- | --------------------------------------- |
| `status`             | String  | Төлөв: draft, open, paid, void          |
| `amount`             | Number  | Мөнгөн дүн.                             |
| `description`        | String  | Тайлбар.                                |
| `auto_advance`       | Boolean | Автоматаар эцэслэх.                     |
| `number`             | String  | Дахин давтагдашгүй нэхэмжлэхийн дугаар. |
| `project_id`         | String  | Byl төслийн ID.                         |
| `due_due`            | Date    | Төлвөл зохих эцсийн хугацаа.            |
| `created_at`         | Date    | Анх үүссэн огноо.                       |
| `updated_at`         | Date    | Өөрчлөлт орсон огноо.                   |
| `id`                 | Number  | Нэхэмжлэхийн ID.                        |
| `hosted_invoice_url` | Number  | Нэхэмжлэхийн веб хуудас.                |

## Нэхэмжлэх үүсгэх

- HTTP Method: `POST`
- Content Type: `application/json`
- URL: `https://byl.mn/api/v1/projects/1/invoices`

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
    "hosted_invoice_url": "https://checkout.byl.mn/i/109/s2lA248QpRAc9Ys4PAuA1brNbf3eU5sL"
  }
}
```

## Нэхэмжлэх лавлах

- HTTP Method: `GET`
- Content Type: `application/json`
- URL: `https://byl.mn/api/v1/projects/1/invoices/2`

**Жишээ хүсэлт**

```shell
BYL_TOKEN="таны API token"
$ curl -X GET https://byl.mn/api/v1/projects/1/invoices/2 \
    -H "Authorization: Bearer $BYL_TOKEN" \
    -H 'Accept: application/json'
```

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
    "hosted_invoice_url": "https://checkout.byl.mn/i/109/s2lA248QpRAc9Ys4PAuA1brNbf3eU5sL"
  }
}
```

## Нэхэмжлэх хүчингүй болгох

Төлбөр төлөгдөөгүй нэхэмжлэхийг хүчингүй болгох боломжтой. Нэхэмжлэхийг хүчингүй болгосоноор төлбөр хүлээн авах боломжгүй болно.

- HTTP Method: `POST`
- Content Type: `application/json`
- URL: `https://byl.mn/api/v1/projects/1/invoices/2/void`

**Жишээ хүсэлт**

```shell
BYL_TOKEN="таны API token"
$ curl -X POST https://byl.mn/api/v1/projects/1/invoices/2/void \
    -H "Authorization: Bearer $BYL_TOKEN" \
    -H 'Accept: application/json'
```

**Жишээ гаралт**

```json
{
  "data": {
    "id": 157,
    "status": "void",
    "amount": 10,
    "description": "First invoice",
    "customer_id": null,
    "number": "BYL-0008",
    "project_id": 5,
    "hosted_invoice_url": "https://checkout.byl.mn/i/157/BXohJHcL94pEn4G1mZ2xX2DKJmTq5uhX",
    "due_date": "2023-09-08T16:33:41.000000Z",
    "created_at": "2023-09-07T16:33:41.000000Z",
    "updated_at": "2023-09-07T16:33:50.000000Z"
  }
}
```

## Нэхэмжлэх устгах

- HTTP Method: `DELETE`
- Content Type: `application/json`
- URL: `https://byl.mn/api/v1/projects/1/invoices/2`

**Жишээ хүсэлт**

```shell
BYL_TOKEN="таны API token"
$ curl -X DELETE https://byl.mn/api/v1/projects/1/invoices/2 \
    -H "Authorization: Bearer $BYL_TOKEN" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json'
```

**Жишээ гаралт**

```json
{
  "data": {
    "id": 2,
    "deleted_at": "2023-09-07T16:30:35.000000Z"
  }
}
```
