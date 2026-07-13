# Flora - Flower Shop Landing Page

[English](#english) | [Українська](#українська)

- [Live Preview](https://fi4klif.github.io/UMT-markup-practice-Savchenko-Maksym/)
- [Figma](https://www.figma.com/design/2Tj16H7IO7dq1ViTvIh57V/Flora?node-id=5999-10563&p=f&t=NXqhW9cuJ0NWbx59-0)
- [Backend](https://github.com/fi4klif/Flora-backend)

## <a name="english"></a>🇬🇧 English

### Short Description

Flora is a responsive web application designed as a flower shop landing page. The project focuses on showcasing product collections, handling user feedback, and managing order processes through modal interactions. The core idea is to provide a clean, modern, and user-friendly interface for browsing bouquets and placing orders.

Page/Application Structure
Header: Navigation menu and branding.

### Page/Application Structure

- **Header:** Navigation menu and branding.
- **Hero Section:** Primary call-to-action area with promotional imagery.
- **Bestsellers:** Display of top-rated flower arrangements.
- **Bouquets Gallery:** Dynamic collection of products with pagination and filter functionality.
- **Feedback Section:** Customer reviews and testimonials.
- **Footer:** Subscription form, contact information, and social links.
- **Modals:** Order placement modal and interactive feedback forms.

Hero Section: Primary call-to-action area with promotional imagery.

### Tech Stack

- **Languages:** HTML5, CSS3, JavaScript (ES6+).
- **Tooling:** Vite (module bundler).
- **HTTP Client:** Axios (for API requests).
- **Data Handling:** JSON Server (as a mock backend).
- **Styling:** Modular CSS architecture (Reset, Shared, Fonts, Colors).

Bestsellers: Display of top-rated flower arrangements.

### File Structure

- `css/`: Contains styling logic (variables, resets, and layout-specific files).
- `db/`: Stores `db.json` for mock API data.
- `js/`: Modular JavaScript logic for specific UI components:
  - `apiClient.js`: Axios configuration and request handling.
  - `bouquets.js`: Logic for bouquet rendering, filtering, and pagination.
  - `modal.js`: Modal window control (open/close, backdrop interaction).
  - `order.js`: Order form submission handling.
- `public/image/`: Assets folder (containing @1x and @2x images for retination).
- `index.html`: Main entry point for the application.
- `vite.config.js`: Configuration for the Vite development environment.

Bouquets Gallery: Dynamic collection of products with pagination and filter functionality.

### How to Run Locally

1. **Prerequisites:** Ensure Node.js is installed on your machine.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run Development Server:**
   ```bash
   npm run dev
   ```

Feedback Section: Customer reviews and testimonials.

### API Endpoints & Data Shapes

The project uses `json-server` to fetch bouquet data.

- **Endpoint:** `/bouquets`
- **Params:** `_page` and `_limit` (for backend pagination).
- **Data Shape:** JSON objects representing bouquets with fields such as `title`, `price`, `category`, and image URLs.

Footer: Subscription form, contact information, and social links.

### Useful Scripts

- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Bundles the project for production.
- `npm run preview`: Previews the production build.

Modals: Order placement modal and interactive feedback forms.

### Tech Stack

- Languages: HTML5, CSS3, JavaScript (ES6+).
- Tooling: Vite (module bundler).
- HTTP Client: Axios (for API requests).
- Data Handling: JSON Server (as a mock backend).
- Styling: Modular CSS architecture (Reset, Shared, Fonts, Colors).

---

## <a name="українська"></a>🇺🇦 Українська

### Короткий опис

Flora — це адаптивний веб-додаток, розроблений як лендінг для магазину квітів. Проєкт зосереджений на демонстрації колекцій товарів, обробці відгуків користувачів та управлінні процесами замовлення через модальні вікна. Основна мета — надати сучасний та зручний інтерфейс для перегляду букетів та оформлення замовлень.

Структура сторінки/додатку
Хедер: Навігаційне меню та брендинг.

### Структура сторінки/додатку

- **Хедер:** Навігаційне меню та брендинг.
- **Геро-секція:** Головна область з призивом до дії та промо-зображеннями.
- **Бестселери:** Відображення найбільш популярних квіткових композицій.
- **Галерея букетів:** Динамічна колекція товарів з пагінацією та функціоналом фільтрації.
- **Секція відгуків:** Відгуки клієнтів.
- **Футер:** Форма підписки, контактна інформація та посилання на соцмережі.
- **Модальні вікна:** Форма замовлення та інтерактивні форми зворотного зв'язку.

Геро-секція: Головна область з призивом до дії та промо-зображеннями.

### Технологічний стек

- **Мови:** HTML5, CSS3, JavaScript (ES6+).
- **Інструменти:** Vite (збирач модулів).
- **HTTP-клієнт:** Axios (для API-запитів).
- **Обробка даних:** JSON Server (як бекенд-заглушка).
- **Стилізація:** Модульна архітектура CSS (Reset, Shared, Fonts, Colors).

Бестселери: Відображення найбільш популярних квіткових композицій.

### Структура файлів

- `css/`: Містить стилі (змінні, скидання та специфічні файли макету).
- `db/`: Містить `db.json` з даними для API.
- `js/`: Модульна логіка JavaScript для UI-компонентів:
  - `apiClient.js`: Конфігурація Axios та обробка запитів.
  - `bouquets.js`: Логіка рендерингу букетів, фільтрації та пагінації.
  - `modal.js`: Керування модальними вікнами.
  - `order.js`: Обробка відправки форми замовлення.
- `public/image/`: Папка з активами (містить зображення @1x та @2x для ретинізації).
- `index.html`: Точка входу в додаток.
- `vite.config.js`: Конфігурація середовища розробки Vite.

Галерея букетів: Динамічна колекція товарів з пагінацією та функціоналом фільтрації.

### Як запустити локально

1. **Передумови:** Переконайтеся, що на комп'ютері встановлено Node.js.
2. **Встановлення залежностей:**
   ```bash
   npm install
   ```
3. **Запуск сервера розробки:**
   ```bash
   npm run dev
   ```

Секція відгуків: Відгуки клієнтів.

### API-ендпоінти та структура даних

Проєкт використовує `json-server` для отримання даних про букети.

- **Ендпоінт:** `/bouquets`
- **Параметри:** `_page` та `_limit` (для бекенд-пагінації).
- **Структура даних:** JSON-об'єкти, що представляють букети з полями: назва, ціна, категорія, посилання на зображення.

Футер: Форма підписки, контактна інформація та посилання на соцмережі.

### Технологічний стек

- Мови: HTML5, CSS3, JavaScript (ES6+).
- Інструменти: Vite (збирач модулів).
- HTTP-клієнт: Axios (для API-запитів).
- Обробка даних: JSON Server (як бекенд-заглушка).
- Стилізація: Модульна архітектура CSS (Reset, Shared, Fonts, Colors).

### Деплой

Проєкт налаштований для розгортання через GitHub Pages за допомогою робочого процесу (static workflow).
