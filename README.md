# GitHub Actions: Docker Test

Учебный проект по теме **запуск Job в Docker-контейнере в GitHub Actions**.

## Что реализовано

- Workflow `.github/workflows/docker.yml` запускается при `push`, `pull_request` и вручную (`workflow_dispatch`).
- Job выполняется в `node:21-alpine3.17`.
- В контейнер передаётся `NODE_ENV=development`.
- Поднимается отдельный сервис `mysql:8.0` с базой `demo` и проверкой готовности.
- В лог выводится JSON с информацией о сервисном контейнере.
- Выводятся версия Node.js и сведения об ОС.
- Отдельный Docker-шаг `docker://node:18-buster-slim` выводит версию Node.js из другого образа.
- Проверяется синтаксис приложения и запускаются автоматические тесты.

## Структура

```text
.
├── .github/
│   └── workflows/
│       └── docker.yml
├── test/
│   └── app.test.js
├── app.js
├── package.json
├── Dockerfile
├── .gitignore
└── README.md
```

## Запуск локально

Требуются Node.js 18+ и npm.

```bash
npm test
npm start
```

Сборка и запуск Docker-образа:

```bash
docker build -t github-actions-docker-test .
docker run --rm github-actions-docker-test
```

## Как запустить GitHub Actions

1. Создайте на GitHub репозиторий с именем `github-actions-docker-test`.
2. Загрузите в него все файлы проекта, сохранив папку `.github/workflows`.
3. Откройте вкладку **Actions** и разрешите запуск workflows, если GitHub попросит.
4. Сделайте commit/push. Откройте workflow **Docker Test** и дождитесь зелёной отметки.
5. Внутри запуска откройте job `test-docker-container`, чтобы посмотреть логи каждого шага.

## Важные замечания

- Для MySQL задан `MYSQL_ROOT_PASSWORD`, иначе официальный образ MySQL не сможет корректно инициализироваться.
- Порт `3306` опубликован на runner, а не внутри Node job-контейнера; для соединения из job-контейнера используйте hostname сервиса `customMysql` и порт `3306`.
- Docker-образ `node:18-buster-slim` оставлен как в демонстрации. Для новых проектов лучше выбирать поддерживаемый актуальный образ Node.js.
- Этот workflow воспроизводит ключевые действия, видимые на предоставленных скриншотах. Полный видеоролик целиком не был доступен, поэтому невидимые в кадре шаги не выдаются за точную копию.
