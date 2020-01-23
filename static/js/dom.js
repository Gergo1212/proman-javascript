import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        dom.loadBoards();
    },
    loadBoards: function () {
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
            dom.addNewBoard();
        });
    },
    showBoards: function (boards) {
        let boardsContainer = document.querySelector('.board-container');

        for (let board of boards) {
            let oneBoard = dom.createBoard(board.id, board.board_name);
            boardsContainer.appendChild(oneBoard);

            dom.loadColumns(board.id, board);
        }
    },
    loadCards: function (columnId, column) {
        dataHandler.getCardsByColumnId(columnId, function (cards) {
            dom.showCards(cards, column);
        });
    },
    showCards: function (cards, columns) {
        let columnContentDivs = columns.querySelectorAll(".board-column-content");

        for (let columnDiv of columnContentDivs) {
            for (let card of cards) {
                if (Number(columnDiv.dataset.columnContentColumnSet) === Number(card.column_id)) {
                    let newCard = dom.createCard(card.id, card.title);
                    columnDiv.appendChild(newCard);
                }
            }
        }
    },
    addNewBoard: function () {
        let addBoardButton = document.querySelector('.create-board');
        addBoardButton.addEventListener('click', function () {
            dataHandler.createNewBoard(function (data) {
                dom.insertNewBoard(data);
            })
        });
    },
    loadColumns: function (boardId, board) {
        dataHandler.getColumns(boardId, function (columns) {
            dom.showColumns(columns, board);
        });
    },
    showColumns: function (columns, board) {
        let boardColumns = document.querySelectorAll(".board-columns");

        for (let boardColumn of boardColumns) {
            if (Number(boardColumn.dataset.boardId) === Number(board.id)) {
                for (let column of columns) {
                    let columnDiv = dom.createColumn(column.column_name, column.id, column.board_id);
                    boardColumn.appendChild(columnDiv);
                    dom.loadCards(column.id, columnDiv);
                }
            }
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
            let columnTitle = dom.checkForEmptyOrSpaces(event.target.textContent);
            event.target.textContent = columnTitle;
            dataHandler.updateColumnTitle(columnId, columnTitle);
        })
    },
    changeBoardText: function (event) {
        event.target.addEventListener("focusout", function (event) {
            let boardId = event.target.dataset.boardIdSet;
            let boardTitle = dom.checkForEmptyOrSpaces(event.target.textContent);
            event.target.textContent = boardTitle;
            dataHandler.updateBoardTitle(boardId, boardTitle);
        })
    },
    checkForEmptyOrSpaces: function (textContent) {
        if (textContent.replace(/\s/g, "") === "") {
            return "untitled";
        } else {
            return textContent;
        }
    },
    insertNewBoard: function (data) {
        let boardContainer = document.querySelector(".board-container");
        let newBoard = dom.createBoard(data.id, data.board_name);
        boardContainer.appendChild(newBoard);
    },
    insertNewColumn: function (data) {
        const boardColumns = document.querySelectorAll(".board-columns");
        for (let boardColumn of boardColumns) {
            if (Number(data.board_id) === Number(boardColumn.dataset.boardId)) {
                let newColumn = dom.createColumn(data.column_name, data.id, data.board_id);
                boardColumn.appendChild(newColumn);
            }
        }
    },
    insertNewCard: function (data) {
        const columnContents = document.querySelectorAll(".board-column-content");
        for (let columnContent of columnContents) {
            if (Number(columnContent.dataset.columnContentBoardSet) === Number(data.board_id) && Number(columnContent.dataset.columnContentColumnSet) === Number(data.column_id)) {
                let newCard = dom.createCard(data.id, data.title);
                columnContent.appendChild(newCard);
            }
        }
    },
    createBoard: function (boardId, boardName) {
        let section = document.createElement("section");
        let boardHeader = document.createElement("div");
        let spanHeader = document.createElement("span");
        let removeBoardButton = document.createElement("button");
        let addColumnButton = document.createElement('button');
        let toggleButton = document.createElement("button");
        let iTag = document.createElement("i");
        let columnsDiv = document.createElement("div");

        section.setAttribute("class", "board");
        section.dataset.boardIdSet = `${boardId}`;
        columnsDiv.setAttribute("class", "board-columns");

        columnsDiv.dataset.boardId = `${boardId}`;
        boardHeader.setAttribute("class", "board-header");
        spanHeader.innerHTML = `${boardName}`;
        spanHeader.dataset.boardIdSet = `${boardId}`;
        spanHeader.setAttribute("class", "board-title");
        spanHeader.setAttribute("contenteditable", "true");
        spanHeader.setAttribute("spellcheck", "false");
        spanHeader.addEventListener('click', function (event) {
            dom.changeBoardText(event);
        });
        removeBoardButton.setAttribute("class", "board-remove");
        removeBoardButton.innerHTML = "Delete Board";
        addColumnButton.setAttribute('class', 'column-add');
        addColumnButton.innerHTML = 'Add Column';
        addColumnButton.addEventListener('click', function () {
            let boardId = this.closest(".board").dataset.boardIdSet;
            dataHandler.createNewColumn(boardId, function (column) {
                dom.insertNewColumn(column)
            });
        });
        toggleButton.setAttribute("class", "board-toggle");
        iTag.setAttribute("class", "fas fa-chevron-down");

        toggleButton.appendChild(iTag);
        boardHeader.appendChild(spanHeader);
        boardHeader.appendChild(addColumnButton);
        boardHeader.appendChild(removeBoardButton);
        boardHeader.appendChild(toggleButton);
        section.appendChild(boardHeader);
        section.appendChild(columnsDiv);
        return section
    },
    createColumn: function (columnName, columnId, boardId) {
        let columnDiv = document.createElement("div");
        let columnTitleContainer = document.createElement("div");
        let columnTitleDiv = document.createElement("div");
        let columnContentDiv = document.createElement("div");
        let addNewCardButton = document.createElement("i");

        columnDiv.setAttribute("class", "board-column");
        columnTitleContainer.setAttribute("class", "column-title-container");
        columnTitleDiv.setAttribute("class", "board-column-title");
        columnTitleDiv.innerHTML = `${columnName}`;
        columnContentDiv.setAttribute("class", "board-column-content");
        columnContentDiv.dataset.columnContentBoardSet = `${boardId}`;
        columnContentDiv.dataset.columnContentColumnSet = `${columnId}`;
        addNewCardButton.setAttribute("class", "fas fa-plus-square fa-lg");
        addNewCardButton.dataset.addNewCardBoardId = `${boardId}`;
        addNewCardButton.dataset.addNewCardColumnId = `${columnId}`;
        addNewCardButton.addEventListener('click', function () {
            let columnId = this.dataset.addNewCardColumnId;
            let boardId = this.dataset.addNewCardBoardId;
            dataHandler.createNewCard(boardId, columnId, function (data) {
                dom.insertNewCard(data)
            });
        });
        columnTitleDiv.setAttribute("contenteditable", "true");
        columnTitleDiv.setAttribute("spellcheck", "false");
        columnTitleDiv.dataset.columnContentColumnSet = `${columnId}`;
        columnTitleDiv.addEventListener('click', function (event) {
            dom.changeColumnText(event);
        });

        columnTitleContainer.appendChild(columnTitleDiv);
        columnTitleContainer.appendChild(addNewCardButton);
        columnDiv.appendChild(columnTitleContainer);
        columnDiv.appendChild(columnContentDiv);

        return columnDiv;
    },
    createCard: function (cardId, cardTitle) {
        let cardDiv = document.createElement('div');
        let cardRemove = document.createElement('div');
        let iTagCard = document.createElement("i");
        let cardTitleDiv = document.createElement('div');

        cardDiv.setAttribute('class', 'card');
        cardDiv.dataset.cardIdSet = `${cardId}`;
        cardRemove.setAttribute('class', 'card-remove');
        iTagCard.setAttribute("class", "fas fa-trash-alt");
        cardTitleDiv.setAttribute('class', 'card-title');
        cardTitleDiv.innerHTML = `${cardTitle}`;
        cardTitleDiv.setAttribute("contenteditable", "true");
        cardTitleDiv.setAttribute("spellcheck", "false");
        cardTitleDiv.dataset.cardTitleIdSet = `${cardId}`;
        cardTitleDiv.addEventListener("click", function (event) {
            dom.changeCardText(event);
        });
        cardRemove.appendChild(iTagCard);
        cardDiv.appendChild(cardRemove);
        cardDiv.appendChild(cardTitleDiv);

        return cardDiv;

    }
};


