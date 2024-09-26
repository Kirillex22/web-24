class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
        this.render();
    }

    dequeue() {
        if (this.items.length > 0) {
            this.items.shift();
            this.render();
        }
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

const queue = new Queue();

document.getElementById('enqueueBtn').addEventListener('click', () => {
    const inputValue = document.getElementById('inputValue').value;
    if (inputValue) {
        queue.enqueue(inputValue);
        document.getElementById('inputValue').value = '';
    }
});

document.getElementById('dequeueBtn').addEventListener('click', () => {
    queue.dequeue();
});