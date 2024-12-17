class AlarmClock {
    constructor() {
      this.alarmCollection = []; // Коллекция звонков
      this.intervalId = null; // ID таймера
    }
  
    addClock(time, callback) {
      if (!time || !callback) {
        throw new Error('Отсутствуют обязательные аргументы');
      }
  
      if (this.alarmCollection.some(alarm => alarm.time === time)) {
        console.warn('Уже присутствует звонок на это же время');
        return;
      }
  
      this.alarmCollection.push({
        time: time,
        callback: callback,
        canCall: true
      });
    }
  
    removeClock(time) {
      this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }
  
    getCurrentFormattedTime() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  
    start() {
      if (this.intervalId) {
        return; // Если интервал уже запущен, не создаем новый
      }
  
      this.intervalId = setInterval(() => {
        const currentTime = this.getCurrentFormattedTime();
        this.alarmCollection.forEach(alarm => {
          if (alarm.time === currentTime && alarm.canCall) {
            alarm.canCall = false; // Запрещаем повторный вызов
            alarm.callback(); // Вызываем коллбек
          }
        });
      }, 1000);
    }
  
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null; // Сбрасываем ID интервала
    }
  
    resetAllCalls() {
      this.alarmCollection.forEach(alarm => alarm.canCall = true); // Сбрасываем возможность вызова
    }
  
    clearAlarms() {
      this.stop(); // Останавливаем будильник
      this.alarmCollection = []; // Удаляем все звонки
    }
  }