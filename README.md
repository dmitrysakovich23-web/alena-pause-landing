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
