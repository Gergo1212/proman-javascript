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
            let boardHeader = document.createElement("div");
            let spanHeader = document.createElement("span");
            let addButton = document.createElement("button")
            let toggleButton = document.createElement("button");
            let iTag = document.createElement("i");

            section.setAttribute("class", "board");
            section.dataset.boardIdSet = `${board.id}`;
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
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards);
        });

    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        console.log(cards);
    },
    loadColumns: function () {
        dataHandler.getColumns(function (columns) {
            dom.showColumns(columns);
        });


    },
    showColumns: function (columns) {
        let sections = document.querySelectorAll("section");
        for (let board of sections) {
            let columnsDiv = document.createElement("div");
            for (let column of columns) {
                if (column.board_id == board.dataset.boardIdSet) {
                    let columnDiv = document.createElement("div");
                    let columnTitleDiv = document.createElement("div");
                    let columnContentDiv = document.createElement("div");

                    columnTitleDiv.innerHTML = column.column_name;

                    columnsDiv.setAttribute("class", "board-columns");
                    columnDiv.setAttribute("class", "board-column");
                    columnTitleDiv.setAttribute("class", "board-column-title");
                    columnContentDiv.setAttribute("class", "board-column_content");

                    columnDiv.appendChild(columnTitleDiv);
                    columnDiv.appendChild(columnContentDiv);
                    columnsDiv.appendChild(columnDiv);
                    board.appendChild(columnsDiv);
                }
            }
        }
    }
};
