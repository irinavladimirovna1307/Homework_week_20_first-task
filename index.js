document.querySelector(".form").addEventListener("submit", (event) => {
  event.preventDefault();

  //беру необходимые элементы
  const btn = document.querySelector(".btn");
  const selectList = document.getElementById("select").value;
  const numberInput = document.querySelector(".number");
  const number = numberInput.value;
  const infoBlock = document.querySelector(".info");
  const errorDiv = document.querySelector(".error");
  const load = document.querySelector(".load");

  //проверка на пустые поля
  if (number === "") {
    infoBlock.textContent = `Выберите номер`;
    return;
  }
  //сообщение о загрузке
  infoBlock.textContent = "Загрузка ...";

  //создаю  фетч запрос
  fetch(`https://swapi.dev/api/${selectList}/${number}/`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Такого объекта нет!");
        }
        throw new Error("Ошибка сервера!");
      }
      return res.json();
    })
    .then((res) => {
      if (selectList === "films") {
        infoBlock.innerHTML = `<div>${res.title}</div>`;
      } else {
        infoBlock.innerHTML = `<div>${res.name}</div>`;
      }
    })
    .catch((error) => {
      infoBlock.textContent = "";
      errorDiv.innerHTML = `<div><span>Ошибка:</span> ${error.message}</div>`;
    })
    .finally(() => {
      numberInput.value = "";
      load.textContent = "";
      btn.disabled = false;
    });
});
