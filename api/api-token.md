# API token

[Удирдлагын буланд](https://byl.mn/projects) нэвтэрсэний дараа [API токен](https://byl.mn/user/api-tokens) хуудсанд шилжин шинээр токен үүсгэнэ.

Та үүсгэх токеноо хэрэгцээндээ тааруулан нэрлэн үүсгэх боломжтой бөгөөд хэрэггүй токен үүссэн бол устгах боломжтой юм.

![Byl API tokens](/img/docs/api-tokens-page.png?v=2)

Токен үүсгэсний дараа үүнийг танд нэг л удаа харуулах болно. Үүнийг аюулгүйгээр хадгалахаа мартуузай, шаардлагагүй болсон бол та үүнийг хүчингүй болгох мөн ашиглах шинэ токен үүсгэх боломжтой.

## Token ашиглан API дуудах нь

Та үүсгэсэн token-оо `Authorization` header-р дамжуулан дуудах боломжтой юм.

Token дамжуулан дуудаж байгаа дараахь `curl` жишээг харна уу. Энэ жишээнд шинээр нэхэмжлэх үүсгэж байгаа юм.

```shell
BYL_TOKEN="таны API token"
$ curl -X POST https://byl.mn/api/v1/projects/1/invoices \
    -H "Authorization: Bearer $BYL_TOKEN" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json'
    -D '{ "amount": 10, "description": "Test invoice description" }'
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
