const requiredServerEnv = [
  "DATABASE_URL",
  "YOOKASSA_SHOP_ID",
  "YOOKASSA_SECRET_KEY",
  "YOOKASSA_AMOUNT_VALUE",
] as const;

type ServerEnv = {
  databaseUrl: string;
  yookassaShopId: string;
  yookassaSecretKey: string;
  yookassaAmountValue: string;
  yookassaCurrency: string;
  yookassaReturnUrl?: string;
};

export function getServerEnv(): ServerEnv {
  const missing = requiredServerEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing server environment variables: ${missing.join(", ")}`);
  }

  return {
    databaseUrl: process.env.DATABASE_URL!,
    yookassaShopId: process.env.YOOKASSA_SHOP_ID!,
    yookassaSecretKey: process.env.YOOKASSA_SECRET_KEY!,
    yookassaAmountValue: process.env.YOOKASSA_AMOUNT_VALUE!,
    yookassaCurrency: process.env.YOOKASSA_CURRENCY || "RUB",
    yookassaReturnUrl: process.env.YOOKASSA_RETURN_URL,
  };
}
