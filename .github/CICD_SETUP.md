# 🚀 CI/CD Setup Guide for Hysteria2 VPN Client

Этот документ описывает настройку полного CI/CD pipeline для сборки и развертывания Hysteria2 VPN Client на всех поддерживаемых платформах.

## 📋 Требования

### GitHub Secrets
Для работы CI/CD необходимо настроить следующие секреты в репозитории:

#### 🔐 Docker Registry
```
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password
```

#### 🤖 Android Signing
```
ANDROID_KEYSTORE_BASE64=base64-encoded-keystore-file
ANDROID_STORE_PASSWORD=your-keystore-password
ANDROID_KEY_ALIAS=your-key-alias
ANDROID_KEY_PASSWORD=your-key-password
```

#### ☁️ AWS (для Kubernetes развертывания)
```
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
EKS_CLUSTER_NAME=your-eks-cluster-name
```

#### 📱 Slack Notifications (опционально)
```
SLACK_WEBHOOK_URL=your-slack-webhook-url
```

## 🔧 Настройка Android Keystore

### 1. Создание keystore
```bash
keytool -genkey -v -keystore release.keystore -alias your-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Конвертация в base64
```bash
base64 -i release.keystore | tr -d '\n'
```

### 3. Добавление в GitHub Secrets
Скопируйте результат в `ANDROID_KEYSTORE_BASE64`

## 📱 Поддерживаемые платформы

### ✅ Android
- **APK**: Для прямого распространения
- **AAB**: Для Google Play Store
- **Подпись**: Автоматическая подпись релизов

### ✅ iOS
- **Archive**: Для App Store Connect
- **Simulator**: Для тестирования
- **Code Signing**: Требует настройки в Xcode

### ✅ Windows
- **Native App**: React Native Windows
- **MSBuild**: Автоматическая сборка
- **x64 Platform**: Поддержка 64-bit

### ✅ Linux
- **Native App**: React Native Linux
- **CMake**: Автоматическая сборка
- **GTK3**: Современный UI framework

### ✅ macOS
- **Native App**: React Native macOS
- **Xcode**: Автоматическая сборка
- **Universal Binary**: Поддержка Intel и Apple Silicon

### ✅ Web
- **PWA**: Progressive Web App
- **React**: Веб-версия приложения
- **Responsive**: Адаптивный дизайн

### ✅ Docker
- **Multi-platform**: linux/amd64, linux/arm64, linux/arm/v7
- **Multi-arch**: Поддержка различных архитектур
- **Optimized**: Оптимизированные образы

## 🔄 Workflow Описание

### 1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
Основной pipeline для сборки и тестирования:

- **Test**: Тестирование на всех платформах
- **Build**: Сборка для всех платформ
- **Docker**: Сборка и публикация Docker образов
- **Release**: Создание GitHub Release с артефактами

### 2. **Create Release** (`.github/workflows/release.yml`)
Автоматическое создание релизов при тегировании:

- **Trigger**: При push тега `v*`
- **Changelog**: Автоматическая генерация changelog
- **Assets**: Загрузка билдов в релиз

### 3. **Deploy to Kubernetes** (`.github/workflows/deploy.yml`)
Автоматическое развертывание в Kubernetes:

- **Trigger**: После успешного CI/CD
- **Deploy**: Обновление Kubernetes манифестов
- **Verify**: Проверка статуса развертывания
- **Notify**: Уведомления в Slack

### 4. **Matrix Testing** (`.github/workflows/test-matrix.yml`)
Матричное тестирование на всех платформах:

- **Platforms**: Ubuntu, Windows, macOS
- **Node.js**: Версии 18.x и 20.x
- **Integration**: Интеграционные тесты
- **Performance**: Тесты производительности
- **Security**: Проверка безопасности

## 🚀 Запуск релиза

### 1. Создание тега
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Автоматический запуск
- Создается GitHub Release
- Запускается сборка для всех платформ
- Создаются артефакты
- Загружаются в релиз

### 3. Развертывание
- Автоматическое развертывание в Kubernetes
- Уведомления о статусе
- Проверка работоспособности

## 📊 Мониторинг

### GitHub Actions
- **Status**: Проверка статуса всех jobs
- **Logs**: Детальные логи выполнения
- **Artifacts**: Скачивание билдов

### Kubernetes
- **Pods**: Статус подов
- **Services**: Доступность сервисов
- **Ingress**: Внешний доступ

### Notifications
- **Slack**: Уведомления о деплоях
- **Email**: GitHub уведомления
- **Webhooks**: Интеграция с внешними системами

## 🛠️ Troubleshooting

### Проблемы с Android
```bash
# Очистка проекта
npm run clean:android

# Проверка keystore
keytool -list -v -keystore android/app/release.keystore
```

### Проблемы с iOS
```bash
# Обновление pods
npm run pod:update

# Очистка проекта
npm run clean:ios
```

### Проблемы с Windows
```bash
# Установка build tools
npm install --global --production windows-build-tools

# Очистка проекта
npm run clean:windows
```

### Проблемы с Linux
```bash
# Установка зависимостей
sudo apt-get install -y build-essential cmake libgtk-3-dev

# Очистка проекта
npm run clean:linux
```

## 📈 Оптимизация

### Кэширование
- **npm**: Кэш зависимостей
- **Docker**: Кэш слоев
- **Gradle**: Кэш Android сборки

### Параллелизация
- **Matrix**: Параллельное тестирование
- **Jobs**: Независимые задачи
- **Dependencies**: Оптимизация зависимостей

### Мониторинг
- **Coverage**: Покрытие тестами
- **Performance**: Время сборки
- **Quality**: Качество кода

## 🔒 Безопасность

### Секреты
- **Encryption**: Все секреты зашифрованы
- **Access**: Ограниченный доступ
- **Rotation**: Регулярная ротация

### Подписи
- **Android**: Подписанные APK/AAB
- **iOS**: Code signing
- **Docker**: Проверенные образы

### Аудит
- **Dependencies**: Проверка уязвимостей
- **Code**: Статический анализ
- **Runtime**: Мониторинг безопасности

## 📚 Дополнительные ресурсы

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)

## 🆘 Поддержка

При возникновении проблем:

1. Проверьте логи GitHub Actions
2. Убедитесь в корректности секретов
3. Проверьте конфигурацию платформ
4. Создайте issue в репозитории

---

**Примечание**: Этот CI/CD pipeline автоматически собирает и развертывает приложение на всех поддерживаемых платформах. Убедитесь, что все зависимости и конфигурации настроены корректно.
