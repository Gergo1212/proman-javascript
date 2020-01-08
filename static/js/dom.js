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
            dom.loadColumns(board.id);

        }



    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCards(function (cards) {
            dom.showCards(cards);
        });
    },
    // shows the cards of a board
    showCards: function (cards) {
        // it adds necessary event listeners also
        console.log(cards);

        let columnContents = document.querySelectorAll("div.board-column-content")
        console.log(columnContents);
        for (let column of columnContents) {
            for (let card of cards) {
                if (column.dataset.columnContentColumnSet == card.column_id && column.dataset.columnContentBoardSet == card.board_id) {
                    let cardDiv = document.createElement('div');
                    let cardRemove = document.createElement('div');
                    let iTagCard = document.createElement("i")
                    let cardTitle = document.createElement('div');

                    cardDiv.setAttribute('class', 'card');
                    cardDiv.dataset.cardIdSet = `${card.id}`;
                    cardRemove.setAttribute('class', 'card-remove');
                    iTagCard.setAttribute("class", "fas fa-trash-alt");
                    cardTitle.setAttribute('class', 'card-title');
                    cardTitle.innerHTML = `${card.card_text}`;

                    cardRemove.appendChild(iTagCard);
                    cardDiv.appendChild(cardRemove);
                    cardDiv.appendChild(cardTitle);
                    column.appendChild(cardDiv);
                }
            }
        }
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

                    columnsDiv.setAttribute("class", "board-columns");
                    columnDiv.setAttribute("class", "board-column");
                    columnTitleDiv.setAttribute("class", "board-column-title");
                    columnTitleDiv.innerHTML = column.column_name;
                    columnContentDiv.setAttribute("class", "board-column-content");
                    columnContentDiv.dataset.columnContentColumnSet = `${column.id}`;
                    columnContentDiv.dataset.columnContentBoardSet = `${column.board_id}`;

                    columnDiv.appendChild(columnTitleDiv);
                    columnDiv.appendChild(columnContentDiv);
                    columnsDiv.appendChild(columnDiv);
                    board.appendChild(columnsDiv);
                }
            }
        }
    }
};
