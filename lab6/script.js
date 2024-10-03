class Base {
    constructor() {
        this.items = [];
    }

    render() {
        const queueList = document.getElementById('queueList');
        queueList.innerHTML = '';
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            queueList.appendChild(li);
        });
    }
}

class Queue extends Base {
    push(element) {
        if (!isNaN(parseInt(element))) {
            this.items.push(element);
            this.render();
        }
    }

    take() {
        if (this.items.length > 0) {
            this.items.shift();
            this.render();
        }
    }
}

class Stack extends Base {
    push(element) {
        if (!isNaN(parseInt(element))) {
            this.items.unshift(element);
            this.render();
        }
    }

    take() {
        if (this.items.length > 0) {
            this.items.shift();
            this.render();
        }
    }

}

let struct = new Queue();

document.getElementById('enqueueBtn').addEventListener('click', () => {
    const inputValue = document.getElementById('inputValue').value;
    if (inputValue) {
        struct.push(inputValue);
        document.getElementById('inputValue').value = '';
    }
});

document.getElementById('dequeueBtn').addEventListener('click', () => {
    struct.take();
});

document.getElementById('createQueue').addEventListener('click', () => {
    struct = new Queue();
    document.getElementById('name').textContent = 'Управление очередью';
});

document.getElementById('createStack').addEventListener('click', () => {
    struct = new Stack();
    document.getElementById('name').textContent = 'Управление стеком';
});