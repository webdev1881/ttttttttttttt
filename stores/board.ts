import type { BoardDocument } from "~/types/Board";

export const useBoardStore = defineStore('board', {


    state: () => {
        return {
            boards: [],
            cards: [],
        }
    },
    actions: {
        setBoard(board: BoardDocument) {
            this.boards.push( board )
        },
        update(id) {
            const res = this.boards.filter(el =>  el === id  )
            console.log( res );
            
        }
    },
    getters: {
        getBoards: (state) => state.boards,
    },
})