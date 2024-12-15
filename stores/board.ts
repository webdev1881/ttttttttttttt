import type { BoardDocument } from "~/types/Board";


export const useBoardStore = defineStore('board', {



    state: () => {
        return {
            boards: <BoardDocument[]>[],
            cards: [],
        }
    },
    actions: {
        setBoard(board: BoardDocument) {
            this.boards.push( unref(board) )
            localStorage.setItem("boards", JSON.stringify(this.boards));
        },
        update(board: BoardDocument, name: string) {
            this.boards.map(el => {
                if (el.id === board.id) {
                    el.name = name
                    localStorage.clear()
                    localStorage.setItem("boards", JSON.stringify(this.boards));
                }
            })           
        },
        deleteBoard(board: BoardDocument) {
            this.boards = this.boards.filter(el => el.id !== board.id)
            localStorage.setItem("boards", JSON.stringify(this.boards));
        },
    },
    getters: {
        getBoards: (state) => {
            // console.log(JSON.parse(localStorage.getItem('boards')));
            state.boards = JSON.parse(localStorage.getItem('boards') || '[]');
            return state.boards 
            // = JSON.parse(localStorage.getItem('boards') || '[]');
        },
    },
})