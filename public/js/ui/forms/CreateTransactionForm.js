/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
 class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
      super(element);
      this.renderAccountsList(); // по сути не нужно из-за App.js:207-208
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
      Account.list(User.current(), (err, response) => {
          if (response.success) {
              const select = this.element.querySelector('select');
              select.innerHTML = '';
              for (const option of response.data) {
                  select.innerHTML += `<option value="${option.id}">${option.name}</option>`;
              }
          }
      });
  }


  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
      Transaction.create(data, (err, response) => {
          if (response.success) {
              if(App.getModal('newExpense')) {
                App.getModal('newExpense').close();
              };
              if(App.getModal('newIncome')) {
                App.getModal('newIncome').close();
              };
              this.element.reset();
              App.update();
          }
      });
  }
}