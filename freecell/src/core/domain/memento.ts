import type { Game, GameState } from "./entities/game-tools";

export interface Memento {
    getState(): GameState;
    getName(): string;
    getDate(): string;
}


export class GameMemento implements Memento {
    private state: GameState
    private date: string
    
    constructor(state: GameState) {
        this.state = state
        this.date = new Date().toISOString().slice(0,19).replace('T',' ')
    }

    getState(): GameState {
        return this.state
    }
    
    getDate(): string {
        return this.date
    }

    getName(): string {
        return `${this.date} / (${this.state.name})`
    }
}

export class Caretaker {
    private mementos: Memento[] = []
    private originator: Game;

    constructor(originator: Game) {
        this.originator = originator
    }

    backup(): void {
        const mm = this.originator.save()
        console.log('\nCaretaker: Saving Originator\'s state ...', [...mm.getState().columns[2].getCards()!], mm.getState().guards.getCards())
        this.mementos.push(mm)
    }

    undo() : void {
        if (!this.mementos.length) return
        const memento = this.mementos.pop()
        console.log(`Caretaker: Restoring state to: ${memento?.getName()}`, [...memento?.getState().columns[2].getCards()!], memento?.getState().guards.getCards())
        if (memento) this.originator.restore(memento)
    }

    showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:')
        for (const memento of this.mementos) {
            console.log(memento.getName())
        }
    }
}