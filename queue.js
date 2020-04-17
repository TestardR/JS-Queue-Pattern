class MicroFrontEndTaskQueue {
    constructor() {
        this.queue = []
        this.status = { TO_DO: 0, DONE: 1 }
    }
    add(fn) {
        this.queue.push({ task: fn, status: this.status.TO_DO })
    }
    commit() {
        if (!this.queue.length) { return }
        /* notion de transaction _//_ do nothing from now */
        while (this.queue.length) {
            const { task, status } = this.queue.pop()
            if (status === this.status.DONE || typeof task !== "function") { continue }
            try { task() } catch (reason) { console.log(reason) } //for now perform actual change...
        }
    }
    start() {
        setInterval(() => {
            this.commit()
        }, 0)
    }

    reset() {
        this.queue = []
    }
}
