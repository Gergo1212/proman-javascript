// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        let boardsContainer = document.querySelector('.board-container');

        for (let board of boards) {
            let section = document.createElement("section");
            let boardHeader = document.createElement("div");
            let spanHeader = document.createElement("span");
            let addButton = document.createElement("button");
            let toggleButton = document.createElement("button");
            let iTag = document.createElement("i");


            section.setAttribute("class", "board");
            boardHeader.setAttribute("class", "board-header");
            spanHeader.innerHTML = `${board.board_name}`;
            spanHeader.setAttribute("class", "board-title");
            addButton.setAttribute("class", "board-add");
            addButton.innerHTML = "Add Card";
            toggleButton.setAttribute("class", "board-toggle");
            iTag.setAttribute("class", "fas fa-chevron-down");


            toggleButton.appendChild(iTag);
            boardHeader.appendChild(spanHeader);
            boardHeader.appendChild(addButton);
            boardHeader.appendChild(toggleButton);
            section.appendChild(boardHeader);
            boardsContainer.appendChild(section);

        }
        ;

    },

    loadCards: function (boardId) {
        dataHandler.getCardsByBoardId(function (boardId) {
            dom.showCards(boardId);
        });
    },


    showCards: function (cards) {
        for (let card of cards) {
            let card = document.createElement('div');
            let cardRemove = document.createElement('div');
            let cardTitle = document.createElement('div');

            card.setAttribute('class', 'card');
            cardRemove.setAttribute('class', 'card-remove');
            cardTitle.setAttribute('class', 'card-title');

            cardRemove.appendChild(card);
            cardTitle.appendChild(card);

        }
    }
};
