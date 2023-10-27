# Checkout - Тооцоо хийх

Checkout боломжыг ашиглан та хэрэглэгчийн нэг удаагын худалдан авалт, захиалгыг зохицуулах боломжтой юм.

Жишээ нь хэрэглэгч таны аппликэйшн эсвэл веб-с бараагаа сонгоод худалдан авах дарах үед та түүнд byl checkout үүсгээд өгөх хэрэгтэй, ингээд л төлбөр төлөх, купон, хямдрал, хаягын мэдээлэл авах, төлбөрийн баримт и-мэйлээр илгээх зэрэг бусад худалдан авалтын хүрээнд хийгдэх зүйлсыг Byl танд зохицуулаад өгөх болно.

Хэрэв та [webhook](/webhook) тохиргоо хийсэн бол Checkout төлөгдсөн талаарх мэдэгдэлийг цаг алдалгүй өөрийн системд хүлээн авах боломжтой юм.

## Checkout обьект

| Параметер             | Төрөл   | Тайлбар                                      |
| --------------------- | ------- | -------------------------------------------- |
| `status`              | String  | Төлөв: open, complete, expired               |
| `mode`                | string  | Худалдан авлтын горим: subscription, payment |
| `client_reference_id` | String  | Харилцагчийн систем дахь таних дугаар.       |
| `amount_subtotal`     | Number  | Нийт дүн.                                    |
| `amount_total`        | Number  | Нийт дүн.                                    |
| `expires_at`          | Date    | Төлвөл зохих эцсийн хугацаа.                 |
| `created_at`          | Date    | Анх үүссэн огноо.                            |
| `updated_at`          | Date    | Өөрчлөлт орсон огноо.                        |
| `id`                  | Number  | Checkout ID.                                 |
| `customer_id`         | Number  | Харилцагчын ID.                              |
| `customer_email`      | String  | Харилцагчын и-мэйл хаяг.                     |
| `is_guest`            | Boolean | Зочин харилцагч эсэх?                        |

## Checkout үүсгэх

- HTTP Method: `POST`
- Content Type: `application/json`
- URL: `https://byl.mn/api/v1/projects/1/checkouts`

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

| Параметер                                                 | Төрөл  | Заавал эсэх | Тайлбар                                           |
| --------------------------------------------------------- | ------ | ----------- | ------------------------------------------------- |
| `items[0][price_data][unit_amount]`                       | Number | true        | Бүтээгдэхүүний нэгж үнэ.                          |
| `items[0][price_data][product_data][name]`                | String | true        | Бүтээгдэхүүний нэр.                               |
| `items[0][price_data][product_data][client_reference_id]` | String | true        | Харилцагчын систем дахь бүтээгдэхүүний ID.        |
| `items[0][quantity]`                                      | Number | true        | Тоо хэмжээ.                                       |
| `items[0][adjustable_quantity]`                           | Object | false       | Тоо хэмжээг засах боломжтой болгох                |
| `items[0][adjustable_quantity][enabled]`                  | Bool   | true        | Тоо хэмжээг засах боломж идэвхтэй эсэх            |
| `items[0][adjustable_quantity][min]`                      | Number | false       | Тоо хэмжээ талбарт оруулж болох хамгийн бага дүн  |
| `items[0][adjustable_quantity][max]`                      | Number | false       | Тоо хэмжээ талбарт оруулж болох хамгийн их дүн    |

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
    "id": 71,
    "url": "https://checkout.byl.mn/checkout/71/mks23qF6"
  }
}
```

## Checkout лавлах

- HTTP Method: `GET`
- Content Type: `application/json`
- URL: `https://byl.mn/api/v1/projects/1/checkouts/71`

**Жишээ хүсэлт**

```shell
BYL_TOKEN="таны API token"
$ curl -X GET https://byl.mn/api/v1/projects/1/checkouts/71 \
    -H "Authorization: Bearer $BYL_TOKEN" \
    -H 'Accept: application/json'
```

**Жишээ гаралт**

```json
{
  "data": {
    "id": 71,
    "url": "http://checkout.byl.mn/checkout/71/5Lg1KKIo",
    "client_reference_id": null,
    "mode": "payment",
    "status": "open",
    "expires_at": "2023-10-25T16:00:00.000000Z",
    "amount_subtotal": 1000,
    "amount_total": 1000,
    "customer_id": null,
    "customer_email": null,
    "is_guest": true,
    "created_at": "2023-10-25T10:27:49.000000Z",
    "updated_at": "2023-10-25T10:27:49.000000Z"
  }
}
```
