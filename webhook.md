# Webhook

Byl таны бакэнд системд `webhook` хүсэлт илгээх хийх замаар шинэ event бүрийг таны бакэнд системд цаг алдалгүй хүргэж чадна.

Хүсэлт бүр криптограф гарын үсэгтэй байх тул үүнийг шалгах замаар яг манайхаас ирсэн эсэхийг хялбар шалган хамгаалалт хийх боломжтой юм.

Webhook-г `POST` хүсэлт илгээн дуудах бөгөөд `payload` нь тухайн event ийн төрөл болон хамаарах объектын мэдээллийг багтаасан байна.

## Төсөлд webhook тохируулах

Byl веб хуудаснаас төслийн дэлгэрэнгүй -> `Webhook` цэсээр дамжин шинээр бүртгэх боломжтой. Нэг төсөлд өөрийн идэвхжүүлсэн багцын хязгаар хүртэлх хэдэн ч тооны webhook тохируулан ашиглах боломжтой юм.

Ямар ч хаяг тохируулан ашиглах боломжтой ч `https`-ээр хамгаалагдсан url хаягийг тохируулан ашиглахыг бид танд зөвлөж байна.

## Хамгаалалт ба гарын үсэг

Бүх webhook хүсэлтүүд `Byl-Signature` header тээгээр очих бөгөөд энэ нь тухайн event-ийн дахин давтагдашгүй гарын үсэг юм.

Бид гарын үсгийг дараах байдлаар үүсгэдэг:

```php
$computedSignature = hash_hmac('sha256', $payload, $secret);
```

Иймд таны бакэнд систем ирсэн event ийн гарын үсгийг дахин шинээр үүсгээд `Byl-Signature` header-р ирсэн гарын үсэгтэй `===` тэнцүүлэн шалгах хэрэгтэй юм.

Та гарын үсгийн `secret` мэдээллийг byl веб хуудас дахь webhook ийн дэлгэрэнгүй ороод харах боломжтой, `secret` нь багын бүх төсөлд нэг ижил байна.

Гуравдагч этгээдийг зүй бус үйлдлээс сэргийлэхийн тулд хүсэлт бүрийг заавал шалгаж байхыг бид танд зөвлөж байна.

Жишээ nodejs гарын үсэг үүсгэх код:

```js
const crypto = require("crypto");

let secret = "your_secret_here";
let payload = "your_payload_here";
let computedSignature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");
```

## Webhook хүсэлтийн алдаа

Хэрэв webhook хүсэлт илгээх үед таны серверээс `HTTP/200` хариу ирсэн бол бид амжилттайд тооцдог. Хэрэв ондоо хариу ирсэн бол алдаатай хүсэлт гэж үзэн хэсэг хугацааны дараа дахин хүсэлт илгээдэг.

Хэрэв 3 хүртэлх удаа амжилтгүй болсон үед дахин илгээхээ зогсоох болно. Амжилтгүй хүсэлтийн талаарх мэдээллийг byl web хуудаснаас харах боломжтой юм. Хэрэв та алдаагаа зассан бол `дахин илгээх` товчлуур дараарай.

Byl веб хуудаснаас сүүлд илгээсэн хүсэлтүүдийг харах боломжтой бөгөөд payload болон таны серверээс ямар хариу ирснийг харах боломжтой юм.

## Webhook event-үүд

Дараах төрлийн event-үүдийг бид одоогоор илгээж байна.

| Event                | Тайлбар                        |
| -------------------- | ------------------------------ |
| `invoice.paid`       | Нэхэмжлэх амжилттай төлөгдсөн. |
| `checkout.completed` | Checkout амжилттай төлөгдсө.   |

## `invoice.paid`

Нэхэмжлэх амжилттай төлөгдсөн үед `invoice.paid` төрөлтэй event илгээх болно. `data.object`-т төлөгдсөн нэхэмжлэхийн объект очих болно.

```json
{
  "id": 3,
  "project_id": 1,
  "type": "invoice.paid",
  "object": "invoice",
  "data": {
    "object": {
      "id": 3,
      "amount": 10,
      "number": "TEST-0003",
      "status": "paid",
      "due_date": "2023-08-08T16:14:07.000000Z",
      "created_at": "2023-08-07T16:14:07.000000Z",
      "project_id": 1,
      "updated_at": "2023-08-07T16:14:16.000000Z",
      "description": "First invoice",
      "url": "http://checkout.byl.test/i/3/wt960MQyhSrXKKV8tgrX69MNXnQglvia"
    }
  },
  "created_at": "2023-08-07T16:14:16.000000Z",
  "updated_at": "2023-08-07T16:14:16.000000Z"
}
```

## `checkout.completed`

Checkout амжилттай төлөгдсөн үед `checkout.completed` төрөлтэй event илгээх болно. `data.object`-т төлөгдсөн checkout объект очих болно.

```json
{
  "id": 59,
  "project_id": 5,
  "type": "checkout.completed",
  "object": "checkout",
  "data": {
    "object": {
      "id": 64,
      "url": "https://checkout.byl.mn/checkout/64/3EQBCtGi",
      "items": [
        {
          "id": 69,
          "price": {
            "id": 17,
            "product": {
              "id": 15,
              "name": "Product 1",
              "created_at": "2023-08-03T10:15:50.000000Z",
              "project_id": 5,
              "updated_at": "2023-08-03T10:15:50.000000Z",
              "client_reference_id": null
            },
            "created_at": "2023-08-03T10:17:07.000000Z",
            "product_id": 15,
            "updated_at": "2023-08-03T10:17:07.000000Z",
            "unit_amount": 50
          },
          "price_id": 17,
          "quantity": 1,
          "created_at": "2023-08-03T10:17:07.000000Z",
          "updated_at": "2023-08-03T10:17:07.000000Z",
          "amount_unit": 50,
          "checkout_id": 64,
          "amount_total": 50,
          "amount_subtotal": 50
        }
      ],
      "status": "complete",
      "is_guest": true,
      "cancel_url": null,
      "created_at": "2023-08-03T10:17:07.000000Z",
      "expires_at": "2023-08-03T16:00:00.000000Z",
      "project_id": 5,
      "receipt_id": null,
      "updated_at": "2023-08-03T10:18:43.000000Z",
      "customer_id": null,
      "success_url": "https://will.iam/success",
      "amount_total": 50,
      "phone_number": "99999999",
      "customer_email": "tester@test.mn",
      "amount_subtotal": 50,
      "payment_method": "qpay",
      "client_reference_id": null,
      "phone_number_collection": true
    }
  },
  "created_at": "2023-08-03T10:18:43.000000Z",
  "updated_at": "2023-08-03T10:18:43.000000Z"
}
```
