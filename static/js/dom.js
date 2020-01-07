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
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsContainer = document.querySelector('.board-container');

        for (let board of boards) {
            let section = document.createElement("section");
            section.setAttribute("class", "board");
            let boardHeader = document.createElement("div");
            boardHeader.setAttribute("class", "board-header");
            let spanHeader = document.createElement("span");
            spanHeader.innerHTML = `${board.board_name}`;
            spanHeader.setAttribute("class", "board-title");
            let addButton = document.createElement("button")
            addButton.setAttribute("class", "board-add");
            addButton.innerHTML = "Add Card";
            let toggleButton = document.createElement("button");
            toggleButton.setAttribute("class", "board-toggle");
            let iTag = document.createElement("i");
            iTag.setAttribute("class", "fas fa-chevron-down");

            toggleButton.appendChild(iTag);
            boardHeader.appendChild(spanHeader);
            boardHeader.appendChild(addButton);
            boardHeader.appendChild(toggleButton);
            section.appendChild(boardHeader);
            boardsContainer.appendChild(section);

        };

    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};
