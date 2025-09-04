# Тесты для Hysteria2 VPN Client

## Запуск тестов

```bash
# Запуск всех тестов
npm test

# Запуск тестов с покрытием
npm test -- --coverage

# Запуск тестов в watch режиме
npm test -- --watch

# Запуск конкретного теста
npm test -- --testNamePattern="Basic Test"
```

## Структура тестов

- `basic.test.ts` - Базовые тесты для проверки работы Jest
- `App.test.tsx` - Тесты для главного компонента App

## Конфигурация

Тесты используют Jest с конфигурацией для React Native. Все модули правильно замоканы для стабильной работы в CI/CD.
