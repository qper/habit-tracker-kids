# Трекер привычек — Инструкция по запуску и деплою

> **Полная структура проекта** см. в [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 📋 Содержание
1. [Предварительные требования](#предварительные-требования)
2. [Сборка и запуск локально](#сборка-и-запуск-локально)
3. [Настройка интеграции с Firebase](#настройка-интеграции-с-firebase)
4. [Публикация на GitHub Pages](#публикация-на-github-pages)

---

## 🔧 Предварительные требования

Убедитесь, что у вас установлены:
- **Node.js** версии 18+ ([https://nodejs.org/](https://nodejs.org/))
- **npm** или **yarn** (поставляются с Node.js)
- **Git** ([https://git-scm.com/](https://git-scm.com/))
- **GitHub аккаунт** (для публикации)

Проверьте версии:
```bash
node --version
npm --version
git --version
```

**📝 Структура проекта:**
```
habit-tracker/
├── index.html          ← главная страница
├── index.ts            ← точка входа приложения
├── firebase.ts         ← конфиг Firebase
├── db.ts              ← работа с базой данных
├── vite.config.ts     ← конфиг Vite
└── package.json       ← зависимости
```

---

## 🚀 Сборка и запуск локально

### Шаг 1: Установка зависимостей

```bash
cd /Users/qper/habit-tracker
npm install
```

### Шаг 2: Запуск в режиме разработки

```bash
npm run dev
```

Приложение откроется на [http://localhost:5173/habit-tracker/](http://localhost:5173/habit-tracker/)

### Шаг 3: Остановка сервера разработки

Нажмите `Ctrl + C` в терминале.

### Шаг 4: Сборка для производства

```bash
npm run build
```

Это создаст оптимизированную версию в папке `dist/`. Проверить работу:

```bash
npm run preview
```

---

## 🔐 Настройка интеграции с Firebase

### Шаг 1: Создание проекта Firebase

1. Перейдите на [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Нажмите **"Add project"** (или выберите существующий проект)
3. Введите название проекта (например, `habit-tracker-kids`)
4. Следуйте инструкциям мастера создания проекта
5. После создания проекта вы попадёте в консоль Firebase

### Шаг 2: Получение учетных данных Firebase

1. В левом меню нажмите на значок шестеренки ⚙️ → **Project Settings**
2. Перейдите на вкладку **"Your apps"**
3. Нажмите **"Web"** (иконка `</>`), если приложения еще нет
4. Введите название приложения
5. Нажмите **"Register app"**
6. Скопируйте код конфигурации. Вам нужны следующие значения:
   ```
   apiKey
   authDomain
   projectId
   storageBucket
   messagingSenderId
   appId
   ```

### Шаг 3: Настройка переменных окружения

#### Для локальной разработки:

Создайте файл `.env.local` в корне проекта:

```bash
touch .env.local
```

Откройте `.env.local` и добавьте ваши Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**⚠️ Важно:** Файл `.env.local` уже добавлен в `.gitignore`, поэтому он не будет загружен в Git.

#### Для GitHub Actions (автоматический деплой):

Вам нужно добавить те же переменные как GitHub Secrets:

1. Перейдите в репозиторий на GitHub
2. Нажмите **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **"New repository secret"**
4. Добавьте каждую переменную отдельно:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

### Шаг 4: Включение Authentication

1. В консоли Firebase выберите **Authentication**
2. Нажмите **"Get started"**
3. Выберите метод аутентификации:
   - ✅ **Email/Password** (рекомендуется для начала)
   - Опционально: Google, GitHub и др.

### Шаг 5: Включение Firestore Database

1. В консоли Firebase выберите **Firestore Database**
2. Нажмите **"Create database"**
3. Выберите регион (рекомендуется ближайший к вашему месторасположению)
4. Выберите режим безопасности:
   - **Production mode** (потом настроите правила безопасности)
   - или **Test mode** (для быстрого старта, но менее защищен)

### Шаг 6: Правила безопасности Firestore (Production)

В консоли Firebase перейдите **Firestore Database** → **Rules** и установите правила:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Пользователь может читать и писать только свои данные
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      match /{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
    
    // Привычки
    match /habits/{habitId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    
    // История
    match /history/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

### Шаг 7: Тестирование Firebase локально

```bash
npm run dev
```

Откройте приложение в браузере и проверьте:
- ✅ Можно ли создать аккаунт
- ✅ Можно ли войти
- ✅ Сохраняются ли данные в Firestore

---

## 📦 Публикация на GitHub Pages

### Шаг 1: Создание репозитория на GitHub

1. Перейдите на [https://github.com/new](https://github.com/new)
2. Введите имя репозитория: `habit-tracker`
3. Выберите **Public** (чтобы был доступен через GitHub Pages)
4. Нажмите **Create repository**

### Шаг 2: Синхронизация локального проекта с GitHub

```bash
cd /Users/qper/habit-tracker

# Инициализируем Git (если еще не инициализирован)
git init

# Добавляем все файлы
git add .

# Создаем первый коммит
git commit -m "Initial commit"

# Добавляем удаленный репозиторий (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/habit-tracker.git

# Загружаем код на GitHub
git branch -M main
git push -u origin main
```

### Шаг 3: Создание GitHub Actions для автоматического деплоя

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Build project
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
        VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
        VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
        VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
        VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

Процесс создания файла:

```bash
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Build project
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
        VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
        VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
        VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
        VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
EOF
```

Добавьте и загрузите этот файл:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

### Шаг 4: Проверка GitHub Actions

1. Перейдите на GitHub в свой репозиторий
2. Нажмите вкладку **Actions**
3. Вы должны увидеть запущенный workflow **"Deploy to GitHub Pages"**
4. Дождитесь завершения (зеленая галочка ✅)

### Шаг 5: Включение GitHub Pages

1. В репозитории перейдите **Settings**
2. В левом меню выберите **Pages**
3. Под **"Source"** выберите **Deploy from a branch**
4. Выберите ветку: **gh-pages** и папку: **/(root)**
5. Нажмите **Save**

### Шаг 6: Проверка публикации

Через 1-2 минуты ваше приложение будет доступно по адресу:

```
https://YOUR_USERNAME.github.io/habit-tracker/
```

Замените `YOUR_USERNAME` на ваше имя пользователя GitHub.

---

## 🔄 Обновление и переразвертывание

После любых изменений:

```bash
# Проверьте локально
npm run dev

# После проверки добавьте и загрузьте изменения
git add .
git commit -m "Describe your changes"
git push origin main
```

GitHub Actions автоматически пересоберет и переразвернет приложение.

---

## 🐛 Решение проблем

### Проблема: "Rollup failed to resolve import /src/main.tsx"
**Причина:** неправильная ссылка на точку входа в `index.html`

**Решение:** Убедитесь, что в `index.html` строка:
```html
<script type="module" src="./index.ts"></script>
```

А не `/src/main.tsx`.

### Проблема: ERESOLVE — конфликт версий Vite
**Сообщение об ошибке:**
```
npm error ERESOLVE could not resolve
npm error peer vite@"^4.2.0 || ^5.0.0..." from @vitejs/plugin-react@4.3.1
```

**Решение:**
Удалите node_modules и переустановите зависимости:
```bash
rm -rf node_modules package-lock.json
npm install
```

Если проблема сохраняется, используйте флаг:
```bash
npm install --legacy-peer-deps
```

### Проблема: "Cannot find module 'firebase'"
**Решение:**
```bash
npm install
```

### Проблема: Ошибка Firebase при запуске
- Проверьте, что `.env.local` содержит корректные Firebase credentials
- Убедитесь, что переменные начинаются с `VITE_`

### Проблема: Страница 404 на GitHub Pages
- Проверьте, что имя репозитория совпадает с `REPO_NAME` в `vite.config.ts`
- Убедитесь, что GitHub Pages включен в Settings → Pages

### Проблема: GitHub Actions не запускается
- Проверьте наличие всех 6 secrets в Settings → Secrets and variables → Actions
- Убедитесь, что файл `.github/workflows/deploy.yml` создан корректно

---

## 📚 Полезные ссылки

- 🔥 [Firebase Console](https://console.firebase.google.com/)
- ⚡ [Vite Documentation](https://vitejs.dev/)
- 🔗 [GitHub Pages](https://pages.github.com/)
- ⚛️ [React Documentation](https://react.dev/)

---

## ✅ Чеклист быстрого старта

- [ ] Установлены Node.js и npm
- [ ] Зависимости установлены (`npm install`)
- [ ] Приложение запускается локально (`npm run dev`)
- [ ] Создан проект Firebase
- [ ] Добавлены Firebase credentials в `.env.local`
- [ ] Включены Authentication и Firestore в Firebase
- [ ] Создан репозиторий на GitHub
- [ ] Код загружен на GitHub (`git push`)
- [ ] Добавлены Firebase secrets в GitHub Actions
- [ ] Создан файл `.github/workflows/deploy.yml`
- [ ] GitHub Pages включены и деплой успешен ✅

---

**Удачи с вашим трекером привычек! 🎯**
