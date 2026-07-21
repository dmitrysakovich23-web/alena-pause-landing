# ПАУЗА — landing prototype

Визуальный прототип лендинга на Next.js App Router, TypeScript и Tailwind CSS.

## Запуск

```bash
npm install
npm run dev
```

Локально сайт откроется на `http://localhost:3000`.

## Проверка сборки

```bash
npm run build
```

## Структура

- `src/app/page.tsx` — главная страница лендинга
- `src/app/success/page.tsx` — визуальная заглушка успешной оплаты
- `src/components/*` — секции и переиспользуемые компоненты
- `src/data/content.ts` — контент лендинга, разложенный по секциям
- `public/images/*` — исходные изображения для прототипа
- `public/images/*` â€” Ð¸ÑÑ…Ð¾Ð´Ð½Ñ‹Ðµ Ð¸Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ñ Ð´Ð»Ñ Ð¿Ñ€Ð¾Ñ‚Ð¾Ñ‚Ð¸Ð¿Ð°

## Payment setup

Required environment variables:

- `DATABASE_URL` - Neon PostgreSQL connection string.
- `APP_URL` - public site URL, for example `https://alena-pause-landing.vercel.app`.
- `YOOKASSA_SHOP_ID` - YooKassa shop id.
- `YOOKASSA_SECRET_KEY` - YooKassa secret key.
- `YOOKASSA_AMOUNT_VALUE` - payment amount, for example `3000.00`.
- `YOOKASSA_CURRENCY` - payment currency, normally `RUB`.

YooKassa webhook URL:

```text
https://<your-vercel-domain>/api/yookassa/webhook
```

Subscribe to these events:

- `payment.succeeded`
- `payment.canceled`

On Vercel, add the same environment variables in Project Settings, redeploy, then create a test payment. After payment, YooKassa returns the user to `/payment-return?orderId=<order id>`, where the app checks the real payment status on the server.

To verify in Neon:

```sql
select id, email, status, yookassa_payment_id, yookassa_payment_status, paid_at, canceled_at, last_error
from orders
order by created_at desc
limit 20;
```

For a successful payment, `status` should become `succeeded` and `paid_at` should be filled. For an exited or canceled payment, `status` should stay `pending` or become `canceled` after YooKassa reports the final canceled state.
