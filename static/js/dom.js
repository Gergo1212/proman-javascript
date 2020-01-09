// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        dom.loadBoards();
    },
    loadBoards: function () {
        dataHandler.getBoards(function (boards) {

            dom.showBoards(boards);
            dom.createColumnNew();
            dom.createBoardNew();
        });
    },
    clearBoards: function () {
        document.querySelector('.board-container').innerHTML = '';
    },
    clearColumns: function (columnId) {
        let columns = document.querySelectorAll(".board-column-content")

        for (let column of columns) {
            if (parseInt(column.dataset.columnContentColumnSet) === columnId) {
                column.textContent = '';
            }
        }
    },
    showBoards: function (boards) {
        dom.clearBoards();
        let boardsContainer = document.querySelector('.board-container');
        //let addNewBoardButton = document.createElement("button");
        //addNewBoardButton.setAttribute("class", "create-board");
        //addNewBoardButton.innerText = "New Board";
        // boardsContainer.appendChild(addNewBoardButton);

        for (let board of boards) {
            let section = document.createElement("section");
            let boardHeader = document.createElement("div");
            let spanHeader = document.createElement("span");
            let addButton = document.createElement("button");
            let addColumnButton = document.createElement('button');
            let toggleButton = document.createElement("button");
            let iTag = document.createElement("i");

            section.setAttribute("class", "board");
            section.dataset.boardIdSet = `${board.id}`;
            boardHeader.setAttribute("class", "board-header");
            spanHeader.innerHTML = `${board.board_name}`;
            spanHeader.dataset.boardIdSet = `${board.id}`;
            spanHeader.addEventListener('click', function (event) {
                dom.changeBoardText(event);
            });
            spanHeader.setAttribute("class", "board-title");
            spanHeader.setAttribute("contenteditable", "true");
            spanHeader.setAttribute("spellcheck", "false");
            addButton.setAttribute("class", "board-add");
            addButton.innerHTML = "Add Card";
            addColumnButton.setAttribute('class', 'column-add');
            addColumnButton.innerHTML = 'Add Column';
            toggleButton.setAttribute("class", "board-toggle");
            iTag.setAttribute("class", "fas fa-chevron-down");

            toggleButton.appendChild(iTag);
            boardHeader.appendChild(spanHeader);
            boardHeader.appendChild(addButton);
            boardHeader.appendChild(addColumnButton);
            boardHeader.appendChild(toggleButton);
            section.appendChild(boardHeader);
            boardsContainer.appendChild(section);

            dom.loadColumns(board.id, board);
        }
        dom.createColumnNew()
    },
    loadCards: function (columnId, column) {
        dataHandler.getCardsByBoardId(columnId, function (cards) {
            dom.showCards(cards, column);
        });
    },
    showCards: function (cards, columns) {
        for (let card of cards) {
            let cardDiv = document.createElement('div');
            let cardRemove = document.createElement('div');
            let iTagCard = document.createElement("i");
            let cardTitle = document.createElement('div');

            cardDiv.setAttribute('class', 'card');
            cardDiv.dataset.cardIdSet = `${card.id}`;
            cardRemove.setAttribute('class', 'card-remove');
            iTagCard.setAttribute("class", "fas fa-trash-alt");
            cardTitle.setAttribute('class', 'card-title');
            cardTitle.innerHTML = `${card.title}`;
            cardTitle.setAttribute("contenteditable", "true");
            cardTitle.setAttribute("spellcheck", "false");
            cardTitle.dataset.cardTitleIdSet = `${card.id}`;
            cardTitle.addEventListener("click", function (event) {
                dom.changeCardText(event);
            });

            cardRemove.appendChild(iTagCard);
            cardDiv.appendChild(cardRemove);
            cardDiv.appendChild(cardTitle);

            let columns = document.querySelectorAll(".board-column-content")
            for (let htmlColumn of columns) {
                if (parseInt(htmlColumn.dataset.columnContentColumnSet) === parseInt(card.column_id)) {
                    htmlColumn.appendChild(cardDiv);
                }
            }
        }
    },
    createBoardNew: function () {
        let boardAddButton = document.querySelector('.create-board');
        boardAddButton.addEventListener('click', function () {
            dataHandler.createNewBoard(function (data) {
                dom.showBoards(data)
            })

        });
    },
    createColumnNew: function () {
        let colAddButtons = document.querySelectorAll('.column-add');
        for (let button of colAddButtons) {
            button.addEventListener('click', function () {
                let boardId = button.parentElement.parentElement.dataset.boardIdSet;
                dataHandler.createNewColumn(boardId, function (column) {
                    dom.showBoards(column)
                })
            })
        }
    },
    loadColumns: function (boardId, board) {
        dataHandler.getColumns(boardId, function (columns) {
            dom.showColumns(columns, board);
        });
    },
    showColumns: function (columns, board) {
        let columnsDiv = document.createElement("div");
        for (let column of columns) {

            let columnDiv = document.createElement("div");
            let columnTitleDiv = document.createElement("div");
            let columnContentDiv = document.createElement("div");

            columnsDiv.setAttribute("class", "board-columns");
            columnDiv.setAttribute("class", "board-column");
            columnTitleDiv.setAttribute("class", "board-column-title");
            columnTitleDiv.innerHTML = `${column.column_name}`;
            columnContentDiv.setAttribute("class", "board-column-content");
            columnContentDiv.dataset.columnContentColumnSet = `${column.id}`;
            columnContentDiv.dataset.columnContentBoardSet = `${column.board_id}`;
            columnTitleDiv.setAttribute("contenteditable", "true");
            columnTitleDiv.setAttribute("spellcheck", "false");
            columnTitleDiv.dataset.columnContentColumnSet = `${column.id}`;
            columnContentDiv.setAttribute("class", "board-column-content");
            columnContentDiv.dataset.columnContentColumnSet = `${column.id}`;
            columnContentDiv.dataset.columnContentBoardSet = `${column.board_id}`;
            columnTitleDiv.addEventListener('click', function (event) {
                dom.changeColumnText(event);
            });

            columnDiv.appendChild(columnTitleDiv);
            columnDiv.appendChild(columnContentDiv);
            columnsDiv.appendChild(columnDiv);
            let htmlBoards = document.querySelectorAll('.board');
            for (let htmlBoard of htmlBoards) {
                if (parseInt(htmlBoard.dataset.boardIdSet) === board.id) {
                    htmlBoard.appendChild(columnsDiv);
                }
            }
            dom.loadCards(column.id, columnsDiv)
        }
    },
    changeCardText: function (event) {
        event.target.addEventListener("focusout", function (event) {
            let cardId = event.target.dataset.cardTitleIdSet;
            let cardTitle = event.target.innerText;
            dataHandler.updateCardTitle(cardId, cardTitle);
        })
    },
    changeColumnText: function (event) {
        event.target.addEventListener("focusout", function (event) {
            let columnId = event.target.dataset.columnContentColumnSet;
            let columnTitle = event.target.innerText;
            dataHandler.updateColumnTitle(columnId, columnTitle);
        })
    },
    changeBoardText: function (event) {
        event.target.addEventListener("focusout", function (event) {
            let boardId = event.target.dataset.boardIdSet;
            let boardTitle = event.target.innerText;
            dataHandler.updateBoardTitle(boardId, boardTitle);
        })
    }
};

