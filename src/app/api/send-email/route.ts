import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Интерфейс для данных формы
interface FormData {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  newsletter: boolean;
  fullPhone?: string;
  recaptchaToken?: string;
}

// Функция для проверки reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY не настроен');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    
    // reCAPTCHA v3 возвращает score от 0 до 1
    // 0.5 - хороший порог для большинства сайтов
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('Ошибка проверки reCAPTCHA:', error);
    return false;
  }
}

// Вспомогательные функции для отображения значений
function getServiceLabel(value: string): string {
  const services: Record<string, string> = {
    web: '🌐 Веб-разработка',
    mobile: '📱 Мобильные приложения',
    pwa: '📲 PWA разработка',
    seo: '📈 SEO продвижение',
    crm: '🤝 CRM системы',
    erp: '⚙️ ERP системы',
    uiux: '🎨 UI/UX дизайн'
  };
  return services[value] || value;
}

function getBudgetLabel(value: string): string {
  const budgets: Record<string, string> = {
    '1000-3000': '$1,000 - $3,000',
    '3000-5000': '$3,000 - $5,000',
    '5000-10000': '$5,000 - $10,000',
    '10000-20000': '$10,000 - $20,000',
    '20000+': '$20,000+',
    negotiable: 'Договорной'
  };
  return budgets[value] || value;
}

function getTimelineLabel(value: string): string {
  const timelines: Record<string, string> = {
    '1month': 'До 1 месяца',
    '1-3months': '1-3 месяца',
    '3-6months': '3-6 месяцев',
    '6+months': 'Более 6 месяцев',
    urgent: 'Срочно (до 2 недель)'
  };
  return timelines[value] || value;
}

// Функция для отправки email
async function sendEmail(formData: FormData) {
  // Создаем transporter для отправки email через Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true для 465, false для других портов
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Формируем HTML для письма
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #1f2937; margin-top: 20px; }
        .info-block { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .label { font-weight: bold; color: #4b5563; }
        .value { margin-left: 10px; color: #111827; }
        .footer { margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔔 Новая заявка с сайта APSOD</h1>
        
        <h2>📋 Контактные данные</h2>
        <div class="info-block">
          <p><span class="label">👤 Имя:</span> <span class="value">${formData.name}</span></p>
          <p><span class="label">📧 Email:</span> <span class="value">${formData.email}</span></p>
          <p><span class="label">📞 Телефон:</span> <span class="value">${formData.fullPhone || formData.phone}</span></p>
          <p><span class="label">🏢 Компания:</span> <span class="value">${formData.company || 'Не указано'}</span></p>
        </div>

        <h2>🛠️ О проекте</h2>
        <div class="info-block">
          <p><span class="label">Услуга:</span> <span class="value">${getServiceLabel(formData.service)}</span></p>
          <p><span class="label">💰 Бюджет:</span> <span class="value">${getBudgetLabel(formData.budget)}</span></p>
          <p><span class="label">⏱️ Сроки:</span> <span class="value">${getTimelineLabel(formData.timeline)}</span></p>
        </div>

        <h2>📝 Описание проекта</h2>
        <div class="info-block">
          <p>${formData.description.replace(/\n/g, '<br>')}</p>
        </div>

        <p><small>📬 Получать новости: ${formData.newsletter ? 'Да' : 'Нет'}</small></p>
        
        <div class="footer">
          <p>Письмо сгенерировано автоматически из формы обратной связи APSOD</p>
          <p>Время отправки: ${new Date().toLocaleString('ru-RU')}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Настройки письма
  const mailOptions = {
    from: `"APSOD Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Новая заявка от ${formData.name} - ${getServiceLabel(formData.service)}`,
    html: htmlContent,
    replyTo: formData.email,
  };

  // Отправляем письмо
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.messageId);
  return info;
}

// Обработчик POST запросов
export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();
    const { recaptchaToken } = formData;

    // Проверка reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA токен отсутствует' },
        { status: 400 }
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { error: 'reCAPTCHA проверка не пройдена' },
        { status: 400 }
      );
    }

    // Валидация обязательных полей
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.budget || !formData.timeline || !formData.description) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Некорректный email адрес' },
        { status: 400 }
      );
    }

    // Отправляем email
    await sendEmail(formData);

    // Возвращаем успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена',
        data: {
          name: formData.name,
          email: formData.email,
          service: formData.service
        }
      },
      { status: 200 }
    );

  } catch (error) {
    // Подробное логирование ошибки
    console.error('Ошибка в API send-email:', error);
    
    // Определяем тип ошибки и возвращаем соответствующий ответ
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Ошибка отправки: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// Опционально: обработчик GET для проверки работоспособности API
export async function GET() {
  return NextResponse.json(
    { 
      status: 'API работает',
      message: 'Используйте POST запрос для отправки формы',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}