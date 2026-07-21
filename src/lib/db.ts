import { neon } from "@neondatabase/serverless";
import { getServerEnv } from "@/lib/env";

let sqlClient: ReturnType<typeof neon> | undefined;
let ordersTableReady: Promise<void> | undefined;

export function getSql() {
  if (!sqlClient) {
    sqlClient = neon(getServerEnv().databaseUrl);
  }

  return sqlClient;
}

export function ensureOrdersTable() {
  if (!ordersTableReady) {
    const sql = getSql();

    ordersTableReady = sql`
      CREATE TABLE IF NOT EXISTS orders (
        id uuid PRIMARY KEY,
        email text NOT NULL,
        status text NOT NULL DEFAULT 'pending',
        amount_value numeric(10, 2) NOT NULL,
        currency char(3) NOT NULL DEFAULT 'RUB',
        yookassa_payment_id text,
        yookassa_payment_status text,
        confirmation_url text,
        payment_payload jsonb,
        paid_at timestamptz,
        canceled_at timestamptz,
        access_email_sent_at timestamptz,
        telegram_notification_sent_at timestamptz,
        last_error text,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `
      .then(() =>
        sql`
          ALTER TABLE orders
            ADD COLUMN IF NOT EXISTS paid_at timestamptz,
            ADD COLUMN IF NOT EXISTS canceled_at timestamptz,
            ADD COLUMN IF NOT EXISTS access_email_sent_at timestamptz,
            ADD COLUMN IF NOT EXISTS telegram_notification_sent_at timestamptz,
            ADD COLUMN IF NOT EXISTS last_error text
        `,
      )
      .then(() => undefined);
  }

  return ordersTableReady;
}
