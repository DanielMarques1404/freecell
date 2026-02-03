interface Memento {
    getState(): string;
    getName(): string;
    getDate(): string;
}

export class Originator {
    private state: string;

    constructor(state: string) {
        this.state = state
        console.log(`Originator: My initial state is: ${state}`)
    }

    private getRandomString(length: number = 10): string {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ'
        return Array.apply(null, { length } as any).map(() => charSet.charAt(Math.floor(Math.random() * charSet.length))).join('')
    }
    
    action(): void {
        console.log('Originator: executing an action')
        this.state = this.getRandomString(30)
        console.log(`Originator: and my state has changed to: ${this.state}`)
    }
   

    save(): Memento {
        return new SomeMemento(this.state)
    }

    restore(memento: Memento): void {
        this.state = memento.getState()
        console.log(`Originator: My state has changed to: ${this.state}`)
    }
}

class SomeMemento implements Memento {
    private state: string
    private date: string
    
    constructor(state: string) {
        this.state = state
        this.date = new Date().toISOString().slice(0,19).replace('T',' ')
    }

    getState(): string {
        return this.state
    }
    
    getDate(): string {
        return this.date
    }

    getName(): string {
        return `${this.date} / (${this.state.substring(0,9)}...)`
    }
}

export class Caretaker {
    private mementos: Memento[] = []
    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator
    }

    backup(): void {
        console.log('\nCaretaker: Saving Originator\'s state ...')
        this.mementos.push(this.originator.save())
    }

    undo() : void {
        if (!this.mementos.length) return
        const memento = this.mementos.pop()
        console.log(`Caretaker: Restoring state to: ${memento?.getName()}`)
        if (memento) this.originator.restore(memento)
    }

    showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:')
        for (const memento of this.mementos) {
            console.log(memento.getName())
        }
    }
}