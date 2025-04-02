# Test Task

## Описание
API на NestJS для управления задачами с аутентификацией, логами и миграциями базы данных.

## Установка
1. Установите Git:
   - Windows: Скачайте и установите с [git-scm.com](https://git-scm.com/). Выберите "Use Git from the Windows Command Prompt" при установке.
   - Linux/Mac: `sudo apt install git` (Ubuntu) или `brew install git` (MacOS).
2. Установите Docker Compose:
   - Windows/Mac: Установите [Docker Desktop](https://www.docker.com/products/docker-desktop/), включает Docker Compose.
   - Linux: Установите Docker (`sudo apt install docker.io`), затем Docker Compose (`sudo apt install docker-compose`).
3. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/Irrenriel/test-task.git
   cd test-task
   ```
4. Создайте в корне проекта `.env` файл с [переменными окружения](#переменные-окружения).

## Запуск
1. Запустите проект с Docker Compose:
   ```bash
   docker-compose up --build
   ```
2. API доступно на `http://localhost:3000`.

## Миграции
- Сгенерировать миграцию (локально):
   ```bash
   npm run migration:generate -- ./src/migrations/<имя_миграции>
   ```

   > Миграция инициализации уже создана, не требуется создавать при установке. Использовать для создания новых.

- Применить миграцию:
   ```bash
   npm run migration:run
   ```

   > Миграции применяются автоматически при запуске приложения.

- Откатить миграцию:
   ```bash
   npm run migration:revert
   ```

## Эндпоинты
- **POST /auth/register** - Регистрация пользователя
   - Тело: `{ "name": "string", "email": "string", "password": "string" }`
   - Ответ: `{ "id": number, "name": "string", "email": "string", "createdAt": "string" }`
- **POST /auth/login** - Авторизация пользователя
   - Тело: `{ "email": "string", "password": "string" }`
   - Ответ: `{ "access_token": "string" }`
- **GET /tasks** - Получение списка задач (требуется JWT)
   - Заголовок: `Authorization: Bearer <token>`
   - Ответ: `[{ "id": number, "title": "string", "description": "string", "status": "string", "createdAt": "string", "userId": number }]`
- **POST /tasks** - Создание задачи (требуется JWT)
   - Заголовок: `Authorization: Bearer <token>`
   - Тело: `{ "title": "string", "description": "string" }`
   - Ответ: `{ "id": number, "title": "string", "description": "string", "status": "created", "createdAt": "string", "userId": number }`
- **PATCH /tasks/:id** - Обновление задачи (требуется JWT)
   - Заголовок: `Authorization: Bearer <token>`
   - Параметры: `id` (число)
   - Тело: `{ "title": "string", "description": "string", "status": "string" }`
   - Ответ: `{ "id": number, "title": "string", "description": "string", "status": "string", "createdAt": "string", "userId": number }`
- **DELETE /tasks/:id** - Удаление задачи (требуется JWT)
   - Заголовок: `Authorization: Bearer <token>`
   - Параметры: `id` (число)
   - Ответ: `204 No Content`
- **GET /logs** - Получение логов (требуется JWT)
   - Заголовок: `Authorization: Bearer <token>`
   - Ответ: `[{ "id": number, "points": number, "new_status": "string", "timestamp": "string", "userId": number, "taskId": number }]`


## Структура проекта
- `src/auth/` - Аутентификация (JWT)
- `src/tasks/` - Управление задачами
- `src/logs/` - Логирование действий
- `src/entities/` - Сущности базы данных
- `src/migrations/` - Миграции TypeORM

## Переменные окружения:
- `DATABASE_HOST=db`
- `DATABASE_PORT=5432`
- `DATABASE_USER=postgres`
- `DATABASE_PASSWORD=password`
- `DATABASE_NAME=task_manager`
- `JWT_SECRET=secretKey`

## Очистка
```bash
docker-compose down -v
```
