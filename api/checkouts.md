# Checkout - Тооцоо хийх

Checkout боломжыг ашиглан та хэрэглэгчийн нэг удаагын худалдан авалт, захиалгыг зохицуулах боломжтой юм.

Жишээ нь хэрэглэгч таны аппликэйшн эсвэл веб-с бараагаа сонгоод худалдан авах дарах үед та түүнд byl checkout үүсгээд өгөх хэрэгтэй, ингээд л төлбөр төлөх, купон, хямдрал, хаягын мэдээлэл авах, төлбөрийн баримт и-мэйлээр илгээх зэрэг бусад худалдан авалтын хүрээнд хийгдэх зүйлсыг Byl танд зохицуулаад өгөх болно.

Хэрэв та [webhook](/webhook) тохиргоо хийсэн бол Checkout төлөгдсөн талаарх мэдэгдэлийг цаг алдалгүй өөрийн системд хүлээн авах боломжтой юм.

## Checkout үүсгэх

- HTTP Method: `POST`
- Content Type: `application/json`
- URL: `https://byl.mn/api/v1/checkouts`

**Параметер**

| Параметер                 | Төрөл  | Заавал эсэх | Тайлбар                                        |
| ------------------------- | ------ | ----------- | ---------------------------------------------- |
| `success_url`             | String | false       | Төлбөр амжилттай төлөгдсөний дараа буцах хаяг. |
| `cancel_url`              | String | false       | Худалдан авалт цуцлах үед буцах хаяг.          |
| `items[]`                 | Array  | true        | Бүтээгдэхүүний жагсаалт.                       |
| `phone_number_collection` | Bool   | false       | Утасны дугаар авах талбар идэвхжүүлэх.         |
| `customer_email`          | String | false       | Хэрэглэгчийн и-мэйл хаяг.                      |
| `client_reference_id`     | String | false       | Харилцагчын дахин давтагдашгүй дугаар.         |

items[] - Бүтээгдэхүүний жагсаалт

| Параметер                                                 | Төрөл  | Заавал эсэх | Тайлбар                                    |
| --------------------------------------------------------- | ------ | ----------- | ------------------------------------------ |
| `items[0][price_data][unit_amount]`                       | Number | true        | Бүтээгдэхүүний нэгж үнэ.                   |
| `items[0][price_data][product_data][name]`                | String | true        | Бүтээгдэхүүний нэр.                        |
| `items[0][price_data][product_data][client_reference_id]` | String | true        | Харилцагчын систем дахь бүтээгдэхүүний ID. |
| `items[0][quantity]`                                      | Number | true        | Тоо хэмжээ.                                |

**Жишээ хүсэлт**

```shell
BYL_TOKEN="таны API token"
$ curl -X POST https://byl.mn/api/v1/projects/1/checkouts \
    -H "Authorization: Bearer $BYL_TOKEN" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
          "success_url": "https://example.mn/purchase/success",
          "items": [
              {
                  "price_data": {
                      "unit_amount": 1000,
                      "product_data": {
                          "name": "Product 1"
                      }
                  },
                  "quantity": 1
              }
          ]
      }'
```

**Жишээ гаралт**

```json
{
  "data": {
    "id": 69,
    "url": "https://checkout.byl.mn/checkout/69/mks23qF6"
  }
}
```
