const employeesNames = [
    "Иван Иванов",
    "Мария Петрова",
    "Алексей Смирнов",
    "Алексей Шевцов",
    "Нина Васильева",
    "Василий Василенко",
    "Петр Сидоров",
    "Анна Кузнецова",
    "Ольга Иванова",
    "Ирина Александрова",
]

const employeesData = {
    "name": employeesNames[0],
    "position": "Генеральный директор",
    "subordinates": [
        {
            "name": employeesNames[1],
            "position": "Директор по продажам",
            "subordinates": [
                {
                    "name": employeesNames[2],
                    "position": "Менеджер по продажам",
                    "subordinates": [
                        {
                            "name": employeesNames[3],
                            "position": "Агент по продажам",
                            "subordinates": []
                        }
                    ]
                },
                {
                    "name": employeesNames[4],
                    "position": "Менеджер по продажам",
                    "subordinates": [
                        {
                            "name": employeesNames[5],
                            "position": "Агент по продажам",
                            "subordinates": []
                        }
                    ]
                }
            ]
        },
        {
            "name": employeesNames[6],
            "position": "Директор по маркетингу",
            "subordinates": [
                {
                    "name": employeesNames[7],
                    "position": "Маркетолог",
                    "subordinates": []
                }
            ]
        },
        {
            "name": employeesNames[8],
            "position": "Главный бухгалтер",
            "subordinates": [
                {
                    "name": employeesNames[9],
                    "position": "Бухгалтер",
                    "subordinates": []
                }
            ]
        }
    ]
};


function createTree(data) {
    const ul = document.createElement('ul');
    ul.className = 'json-tree'
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = `${data.name} - ${data.position}`;
    li.appendChild(span);

    if (data.subordinates && data.subordinates.length > 0) {
        const nestedTree = createSubordinatesTree(data.subordinates);
        li.appendChild(nestedTree);
        span.addEventListener('click', function () {
            li.classList.toggle('open');
        });
    }
    ul.appendChild(li);
    return ul;
}

function createSubordinatesTree(subordinates) {
    const ul = document.createElement('ul');
    ul.className = 'json-tree'
    subordinates.forEach(subordinate => {
        const li = document.createElement('li');
        li.className = 'json-tree'
        const span = document.createElement('span');
        span.textContent = `${subordinate.name} - ${subordinate.position}`;
        li.appendChild(span);

        if (subordinate.subordinates && subordinate.subordinates.length > 0) {
            const nestedTree = createSubordinatesTree(subordinate.subordinates);
            li.appendChild(nestedTree);
            span.addEventListener('click', function () {
                li.classList.toggle('open');
            });
        }
        ul.appendChild(li);
    });
    return ul;
}

function searchEmployee() {
    const name = document.getElementById('search').value.trim().toLowerCase();
    for (let idx in employeesNames) {
        const li = document.getElementById(employeesNames[idx].trim().toLowerCase())
        li.className = 'lst-default'
    }
    if (name) {
        const foundEmployee = findEmployeeByNameOrPosition(employeesData, name);
        if (foundEmployee) {
            const name = foundEmployee?.name.trim().toLowerCase();
            const currentLi = document.getElementById(name);
            currentLi.addEventListener('click', function () {
                const treeContainer = document.getElementById('json-tree');
                treeContainer.innerHTML = '';
                treeContainer.appendChild(createTree(foundEmployee));
            });
            currentLi.classList.add('selected')

        } else {
            alert("Сотрудник не найден");
        }
    }
}

function findEmployeeByNameOrPosition(data, name) {
    if (data.name.toLowerCase().includes(name)) {
        return data;
    }

    if (data.subordinates) {
        for (let subordinate of data.subordinates) {
            const result = findEmployeeByNameOrPosition(subordinate, name);
            if (result) return result;
        }
    }

    return null;
}

function refresh() {
    document.getElementById('json-tree').innerHTML = ''
    document.getElementById('json-tree').appendChild(createTree(employeesData));
}

const ul = document.createElement('ul')
ul.className = 'lst-default'
for (let idx in employeesNames) {
    const li = document.createElement('li')
    li.textContent = employeesNames[idx]
    li.id = employeesNames[idx].trim().toLowerCase()
    li.className = 'lst-default'
    ul.appendChild(li)
}
document.getElementById('lst').appendChild(ul)