/**
 * Собственная библиотека GIF с тегами для поиска.
 * URL — прямые ссылки на GIF (Giphy Media CDN и др.).
 */
export interface GifItem {
  id: string;
  url: string;
  tags: string[];
  title?: string;
}

// Прямые ссылки на GIF (Giphy Media CDN). Теги для поиска на RU/EN.
export const GIF_LIBRARY: GifItem[] = [
  { id: 'g1', url: 'https://media.giphy.com/media/3o7TKsQ82F2qK0vSw0/giphy.gif', tags: ['привет', 'hello', 'wave', 'махать', 'рука'], title: 'Привет' },
  { id: 'g2', url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', tags: ['лайк', 'класс', 'одобрение', 'like', 'thumbs up', 'палец'], title: 'Класс' },
  { id: 'g3', url: 'https://media.giphy.com/media/l0MYt5jPR6QX5lq4o/giphy.gif', tags: ['смех', 'смешно', 'laugh', 'слезы', 'ржу'], title: 'Смех' },
  { id: 'g4', url: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', tags: ['любовь', 'love', 'сердце', 'целую'], title: 'Любовь' },
  { id: 'g5', url: 'https://media.giphy.com/media/3o7TKnTMsG2j2ywKic/giphy.gif', tags: ['огонь', 'fire', 'круто'], title: 'Огонь' },
  { id: 'g6', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['праздник', 'party', 'ура', 'танцы'], title: 'Праздник' },
  { id: 'g7', url: 'https://media.giphy.com/media/26u4bohNkqd7MIGhy/giphy.gif', tags: ['ок', 'ok', 'понял', 'хорошо'], title: 'Ок' },
  { id: 'g8', url: 'https://media.giphy.com/media/l0HlPwMAzh7R8dEic/giphy.gif', tags: ['спасибо', 'thanks', 'благодарю'], title: 'Спасибо' },
  { id: 'g9', url: 'https://media.giphy.com/media/3o7TKRQqF3O8pVQYso/giphy.gif', tags: ['думать', 'think', 'размышление', 'хмм'], title: 'Думать' },
  { id: 'g10', url: 'https://media.giphy.com/media/3o7qE1e1bNhQx0n7io/giphy.gif', tags: ['грусть', 'sad', 'плачу', 'печаль'], title: 'Грусть' },
  { id: 'g11', url: 'https://media.giphy.com/media/3o7abBP0nG2qXXe0s0/giphy.gif', tags: ['котик', 'кот', 'cat', 'кошка'], title: 'Котик' },
  { id: 'g12', url: 'https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif', tags: ['собака', 'dog', 'пес'], title: 'Собака' },
  { id: 'g13', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['музыка', 'music', 'танцы', 'dance'], title: 'Музыка' },
  { id: 'g14', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['работа', 'work', 'офис', 'труд'], title: 'Работа' },
  { id: 'g15', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['утро', 'morning', 'доброе утро', 'кофе'], title: 'Утро' },
  { id: 'g16', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['ночь', 'night', 'спокойной ночи', 'сон'], title: 'Ночь' },
  { id: 'g17', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['победа', 'victory', 'успех', 'win'], title: 'Победа' },
  { id: 'g18', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['удачи', 'good luck', 'пальцы скрещены'], title: 'Удачи' },
  { id: 'g19', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['день рождения', 'birthday', 'поздравляю'], title: 'ДР' },
  { id: 'g20', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['новый год', 'new year', 'праздник'], title: 'Новый год' },
  { id: 'g21', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['вопрос', 'question', 'что', 'хмм'], title: 'Вопрос' },
  { id: 'g22', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['идея', 'idea', 'лампочка', 'эврика'], title: 'Идея' },
  { id: 'g23', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['вау', 'wow', 'невероятно', 'круто'], title: 'Вау' },
  { id: 'g24', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['нет', 'no', 'отказ'], title: 'Нет' },
  { id: 'g25', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['да', 'yes', 'согласен'], title: 'Да' },
  { id: 'g26', url: 'https://media.giphy.com/media/3o7TKsQ82F2qK0vSw0/giphy.gif', tags: ['пока', 'bye', 'до свидания'], title: 'Пока' },
  { id: 'g27', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['кофе', 'coffee', 'чашка'], title: 'Кофе' },
  { id: 'g28', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['еда', 'food', 'вкусно', 'ням'], title: 'Еда' },
  { id: 'g29', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['спорт', 'sport', 'тренировка'], title: 'Спорт' },
  { id: 'g30', url: 'https://media.giphy.com/media/3o7TKsQ8u5j3lR5rOw/giphy.gif', tags: ['путешествие', 'travel', 'отпуск', 'отдых'], title: 'Путешествие' },
];
