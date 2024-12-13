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
        refresh() {

        }
    },
    getters: {
        getBoards: (state) => state.boards,
    },
})