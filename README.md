# GAME ASSET LAB

GAME ASSET LAB — статический браузерный Visual Game Asset / Scene Editor. В одной композиции можно сочетать несколько изображений, текст, фигуры, SVG-символы, FX, анимации, эффекты и интерактивные реакции, а затем экспортировать всю сцену в автономные HTML/CSS/JavaScript.

## Запуск

Приложение не требует npm или сборки. Откройте `index.html` напрямую либо запустите любой статический HTTP-сервер, например `python -m http.server 8000`, и перейдите на `http://localhost:8000`.

## GitHub Pages

Опубликуйте содержимое корня репозитория в ветке `main`, затем в Settings → Pages выберите Deploy from a branch и каталог `/ (root)`. Все пути относительные.

## Структура

- `index.html` — каркас интерфейса;
- `css/styles.css` — тёмная тема и адаптивная компоновка;
- `css/v2.css`, `css/sections.css` — визуальный Effect Stack, сцена и цветовая идентификация разделов;
- `js/app.js` — состояние, UI и координация модулей;
- `js/asset-manager.js` — загрузка и проверка файлов;
- `js/animation-engine.js` — композиция CSS-анимаций;
- `js/effects-engine.js` — комбинируемый стек фильтров;
- `js/particles-engine.js` — единый Canvas-цикл частиц;
- `js/interactions-engine.js` — hover/click в тестовом режиме;
- `js/presets.js` — каталоги и готовые комбинации;
- `js/exporter.js` — автономный экспорт.
- `js/v2.js`, `js/exporter-v2.js` — инструменты второго этапа, IndexedDB и расширенный экспорт эффектов.
- `js/scene-v3.js` — модель проекта, Layers, selection, Text, Shapes, FX, groups, history и scene renderer;
- `js/font-manifest.js`, `js/font-ui-v3.js` — каталог из 120 Google Fonts и управление доступными weights;
- `js/exporter-v3.js` — экспорт всей композиции из единой модели;
- `css/scene-v3.css`, `css/live-previews.css` — многослойная сцена, редакторы объектов и живые карточки.

## Реализовано

Реализованы Layers с сортировкой, visibility/lock, duplicate/delete, context menu и группами; несколько image layers; Text Layer с каталогом из 120 шрифтов, gradients, outline, shadow, glow, стилевыми пресетами и per-letter animations; Rectangle/Circle/Pill/Line и другие Shapes; SVG Symbols, Emitters, Burst и Orbit с attachment к Layer; размеры сцены до 4096×4096; Undo/Redo до 80 состояний; A/B всей композиции; shortcuts; IndexedDB autosave; composition presets и экспорт всей сцены.

Горячие клавиши: `Delete`, `Ctrl+D`, `Ctrl+Z`, `Ctrl+Y`, `Ctrl+Shift+Z`, `Ctrl+S`, стрелки (1 px), `Shift` + стрелки (10 px), `Escape`. `Shift` + клик выбирает несколько слоёв для Group.

Изображения, пользовательские шрифты и проект сохраняются в IndexedDB; лёгкая копия конфигурации хранится в localStorage для быстрого старта. Экспорт project JSON не включает тяжёлые binary-файлы: рядом показывается требуемая структура `assets/` и `fonts/`. GIF/video и ZIP не входят в MVP.

## Расширение

Новая анимация добавляется в `ANIMATIONS` и получает keyframes в `animation-engine.js`/scene renderer. Новый эффект добавляется в `EFFECTS` и `EFFECT_CONTROLS`, затем преобразуется в `effects-engine.js`. Новый particle preset добавляется в `PARTICLES`. Новый Google Font добавляется в нужную категорию `FONT_CATEGORIES`. Новый SVG symbol — это новый path в `SYMBOLS` внутри `scene-v3.js`. Object/Composition presets добавляются в `presets.js` или `applyCompositionPreset`. Preview и экспорт обходят одну структуру `galProject.layers`.
