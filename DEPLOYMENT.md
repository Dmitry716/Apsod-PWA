# Деплой на Vercel (apsod.com)

Чтобы пуш-уведомления и админка работали на боевом домене так же, как локально, настройте переменные окружения в Vercel.

## 1. Переменные окружения в Vercel

В проекте Vercel: **Settings → Environment Variables** добавьте:

### Пуш-уведомления (обязательно)

| Переменная | Описание | Где взять |
|------------|----------|-----------|
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Публичный VAPID-ключ | См. ниже |
| `VAPID_PRIVATE_KEY` | Приватный VAPID-ключ | См. ниже |
| `VAPID_SUBJECT` | Контакт (опционально) | Например: `mailto:admin@apsod.com` |
| `NOTIFICATION_SECRET` | Секрет для админки | Придумайте строку, в админке вводите тот же пароль при отправке уведомления о статье |

**Генерация VAPID-ключей** (один раз, те же ключи для локальной и боевой среды):

```bash
npx web-push generate-vapid-keys
```

Вставьте полученные **Public Key** в `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, **Private Key** в `VAPID_PRIVATE_KEY`. В Vercel задайте те же значения, что и в локальном `.env.local` (один раз сгенерированные ключи подходят и для dev, и для prod). Подписки привязаны к домену: пользователи должны подписаться на **apsod.com**, чтобы получать пуши на боевом сайте.

### Хранилище подписок (обязательно для Vercel)

На Vercel нет постоянной файловой системы: без Redis подписки не сохраняются между запросами.

**Вариант A: Vercel KV**

1. В проекте Vercel: **Storage → Create Database → KV**.
2. Подключите хранилище к проекту.
3. Vercel автоматически добавит `KV_REST_API_URL` и `KV_REST_API_TOKEN` (или `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`). Код поддерживает оба варианта.

**Вариант B: Upstash Redis**

1. Создайте базу на [upstash.com](https://upstash.com).
2. В разделе REST API скопируйте **URL** и **Token**.
3. Добавьте в Vercel:
   - `KV_REST_API_URL` = REST URL  
   - `KV_REST_API_TOKEN` = REST Token  

После добавления переменных сделайте **Redeploy** проекта.

## 2. Домен apsod.com

- В Vercel: **Settings → Domains** добавьте `apsod.com` и при необходимости настройте DNS по инструкции Vercel.
- После деплоя сайт и пуш работают на `https://apsod.com`. Подписка с этого домена сохраняется в Redis и отображается в админке.

## 3. Админка и Service Worker

- Админка: `https://apsod.com/dev/` (пароль задаётся в `public/dev/index.html`, по умолчанию см. в коде).
- Service Worker для пушей: `https://apsod.com/notification-sw.js` — раздаётся из `public/`, заголовки кэширования заданы в `next.config.mjs`.
- После первого деплоя проверьте подписку на apsod.com и отправку тестового уведомления из админки.

## 4. Краткий чеклист

- [ ] `NEXT_PUBLIC_VAPID_PUBLIC_KEY` и `VAPID_PRIVATE_KEY` заданы в Vercel
- [ ] Заданы `KV_REST_API_URL` и `KV_REST_API_TOKEN` (или Upstash-переменные)
- [ ] Задан `NOTIFICATION_SECRET` для отправки уведомлений о статьях из админки
- [ ] Выполнен Redeploy после добавления переменных
- [ ] На apsod.com подписка сохраняется и отображается в `/dev/`
- [ ] Тестовое уведомление из админки доходит до устройства
