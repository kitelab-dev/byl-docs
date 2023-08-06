# Нэхэмжлэх

## Нэхэмжлэх үүсгэх

Шинээр нэхэмжлэх үүсгэхэд `/api/v1/projects/:projectId/invoices` endpoint-г `POST` method-р дуудаж ашиглана.

```shell
BYL_TOKEN="таны API token"
$ curl -X POST https://byl.mn/api/v1/projects/1/invoices \
    -H "Authorization: Bearer $BYL_TOKEN" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json'
    -D '{ "amount": 10, "description": "Test invoice" }'
```

Дээрх өгөгдсөн `BYL_TOKEN`-р танийг таних үйлдэл хийгдэж таны удирдаж буй 1 дугаартай төсөлд шинээр нэхэмжлэх үүсгэж байна. Ингээд дараахь жишээ хариу буцах болмно.

```json
{
  "data": {
    "status": "draft",
    "amount": 10,
    "description": "Test invoice",
    "project_id": 1,
    "updated_at": "2023-06-24T05:27:42.000000Z",
    "created_at": "2023-06-24T05:27:42.000000Z",
    "id": 3
  }
}
```
