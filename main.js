(() => {
    // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
    let numbersArray = [];
    let timerID;

    function createNumbersArray(count) {
        for (let i = 0; i < count * count / 2; i++) {
            numbersArray.push(i + 1);
            numbersArray.push(i + 1);
        }
        return numbersArray;
    }

    // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек.
    //  У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

    function startGame() {
        let card = document.querySelectorAll('.card');
        let temp1;
        let temp2;
        for (let elem of card) {
            elem.onclick = () => {

                elem.style.color = 'black';
                elem.classList.add('active');
                elem.disabled = true;
                if (document.querySelectorAll('.active').length === 2) {
                    examination()
                }
                if (document.querySelectorAll('.done').length === card.length) {
                    alert('Поздравляем с победой!')
                    clearInterval(timerID);
                }
            }
        }
    }


    function examination() {
        let activeCard = document.querySelectorAll('.active');
        if (activeCard[0].textContent === activeCard[1].textContent) {
            for (let elem of activeCard) {
                elem.disabled = true;
                elem.classList.add('done');
                elem.style.backgroundColor = '#ffc107';
                elem.classList.remove('active');
            }
        } else {
            for (let elem of activeCard) {
                elem.disabled = false;
                setTimeout(() => { elem.style.color = '#0d6efd'; }, 300)
                elem.classList.remove('active');
            }
        }
    }

    function createInputModal() {
        let bodyModal = document.querySelector('.modal-body');
        let inputCount = document.createElement('input');
        let startButton = document.querySelector('.modal-footer').children[0];
        let timeDiv = document.querySelector('.timer');
        inputCount.classList.add('form-control');
        inputCount.type = 'number';
        inputCount.placeholder = 'Количество карточек по вертикали/горизонтали';
        bodyModal.append(inputCount);
        startButton.addEventListener('click', () => {
            let valueInput = inputCount.value;
            timeDiv.textContent = 60;
            numbersArray = [];
            inputValid(valueInput);
            clearInterval(timerID);
            timerID = setInterval(startTimer, 1000, timeDiv);
        });
        return;
    }

    function startTimer(timeDiv) {
        if (timeDiv.textContent > 0) {
            timeDiv.textContent--;
        } else {
            clearInterval(timerID);
            falseGame();
        };
    }

    function falseGame(){
        alert('Вы проиграли, попробуйте еще раз');
        let tools = document.querySelector('#btn-tools');
        tools.click();
    }

    function inputValid(count) {
        if (count < 2 || count > 10 || count % 2 != 0) count = 4;
        loadField(count);
        return;
    }

    function preloadGame() {
        let header = document.querySelector('.header');
        let timeValue = document.createElement('div');
        timeValue.textContent = 0;
        timeValue.classList.add('timer');
        timeValue.style.display = 'flex';
        timeValue.style.fontSize = 25 + 'px';
        timeValue.style.alignItems = 'center';
        timeValue.style.justifyContent = 'center';
        timeValue.style.height = 38 + 'px';
        timeValue.style.width = 38 + 'px';
        timeValue.style.backgroundColor = '#20c997';
        timeValue.style.borderRadius = '100%';
        header.style.display = 'flex';
        header.style.justifyContent = 'center';
        header.classList.add('mb-5');
        header.children[0].style.marginRight = 10 + 'px';
        header.append(timeValue);
        createInputModal();
        let tools = document.querySelector('#btn-tools');
        tools.click();

    }

    function loadField(count) {
        let main = document.querySelector('.main');
        main.innerHTML = '';
        for (let i = 0; i < count; i++) {
            let card = document.createElement('div');
            card.classList.add('row');
            card.style.height = Math.round((window.innerHeight - 100) / count) + 'px';
            main.append(card);
        }
        let row = document.querySelectorAll('.row');
        for (let elem of row) {
            for (let i = 0; i < count; i++) {
                let card = document.createElement('div');
                card.classList.add('col');
                elem.append(card);
            }
        }
        styleCard(count);
        let shuffleArr = shuffle(createNumbersArray(count));
        contentCard(shuffleArr);

    }

    function contentCard(arr) {
        let card = document.querySelectorAll('.card');
        for (let i = 0; i < arr.length; i++) {
            card[i].textContent = arr[i];
        }
        startGame();
    }

    function styleCard(count) {
        let card = document.querySelectorAll('.col');
        for (let elem of card) {
            let shirt = document.createElement('button');
            shirt.classList.add('card', 'btn', 'btn-primary', 'w-100');
            shirt.style.display = 'flex';
            elem.style.padding = 10 + 'px';
            shirt.style.backgroundColor = '#0d6efd';
            shirt.style.borderRadius = '20px';
            shirt.style.height = Math.round((window.innerHeight - 100) / count) - 20 + 'px';
            shirt.style.alignItems = 'center';
            shirt.style.justifyContent = 'center';
            shirt.style.fontSize = Math.round((window.innerHeight - 100) / count) / 3 + 'px';
            shirt.style.color = shirt.style.backgroundColor;
            shirt.style.transition = 'color 0.3s ease-in-out';
            elem.append(shirt);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        preloadGame();

    });
})();