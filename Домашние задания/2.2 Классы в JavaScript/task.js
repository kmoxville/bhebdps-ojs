class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      this.name = name;
      this.releaseDate = releaseDate;
      this.pagesCount = pagesCount;
      this._state = 100; // Состояние издания
      this.type = null; // Тип издания
    }
  
    set state(value) {
      this._state = Math.max(0, Math.min(value, 100)); // Ограничение состояния от 0 до 100
    }
  
    get state() {
      return this._state;
    }
  
    fix() {
      this.state = Math.min(this.state * 1.5, 100); // Увеличение состояния, не превышая 100
    }
  }
  
  class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.type = 'magazine';
    }
  }
  
  class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.type = 'book';
      this.author = author;
    }
  }
  
  class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = 'novel';
    }
  }
  
  class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = 'fantastic';
    }
  }
  
  class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = 'detective';
    }
  }
  
  class Library {
    constructor(name) {
      this.name = name;
      this.books = []; // Список книг в библиотеке
    }
  
    addBook(book) {
      if (book.state > 30) { // Добавляем книгу только если состояние больше 30
        this.books.push(book);
      }
    }
  
    findBookBy(type, value) {
      return this.books.find(book => book[type] === value) || null; // Используем find для поиска книги
    }
  
    giveBookByName(name) {
      const idx = this.books.findIndex(book => book.name === name); // Поиск индекса книги по имени
      return idx !== -1 ? this.books.splice(idx, 1)[0] : null; // Удаляем и возвращаем книгу или null
    }
  }
  
  class Student {
    constructor(name) {
      this.name = name;
      this.marks = {}; // Объект для хранения оценок по предметам
    }
  
    addMark(mark, subject) {
      if (mark >= 2 && mark <= 5) { // Проверка на допустимые оценки
        if (!this.marks[subject]) { // Если предмета еще нет в оценках
          this.marks[subject] = [];
        }
        this.marks[subject].push(mark); // Добавляем оценку в массив оценок по предмету
      }
    }
  
    getAverageBySubject(subject) {
      if (!this.marks[subject]) return 0; // Если предмета нет — возвращаем 0
      const sum = this.marks[subject].reduce((acc, mark) => acc + mark, 0); // Суммируем оценки
      return sum / this.marks[subject].length; // Возвращаем среднее значение
    }
  
    getAverage() {
      const subjects = Object.keys(this.marks); // Получаем массив предметов
      if (subjects.length === 0) return 0; // Если нет предметов — возвращаем 0
      const sum = subjects.reduce((acc, subject) => acc + this.getAverageBySubject(subject), 0); // Суммируем средние по всем предметам
      return sum / subjects.length; // Возвращаем общее среднее значение
    }
  }