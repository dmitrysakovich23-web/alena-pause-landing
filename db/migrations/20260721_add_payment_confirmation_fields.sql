ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS canceled_at timestamptz,
  ADD COLUMN IF NOT EXISTS access_email_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS telegram_notification_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_error text;
