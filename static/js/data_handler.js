// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json_response => callback(json_response));
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getColumns: function (boardId, callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get(`/get-columns/${boardId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getCardsByColumnId: function (columnId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        this._api_get(`/get-cards/${columnId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    createNewBoard: function (callback) {
        this._api_get('/create-board', (response) => {
            this._data = response;
            callback(response);
        });
    },
    createNewColumn: function (boardId, callback) {
        this._api_get(`/create-column/${boardId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    createNewCard: function (boardId, columnId, callback) {
        this._api_get(`/create-card/${boardId}/${columnId}`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    updateCardTitle: function (cardId, cardTitle) {
        // updates card title text, saves it and calls the callback function with its data
        let cardInfo = [];
        cardInfo.push(cardId);
        cardInfo.push(cardTitle);
        this._api_post("/update-card-title", {"data": cardInfo}, (response) => {
            this._data = response;
        });
    },
    updateBoardTitle: function (boardId, boardTitle) {
        // updates card title text, saves it and calls the callback function with its data
        let boardInfo = [];
        boardInfo.push(boardId);
        boardInfo.push(boardTitle);
        this._api_post("/update-board-title", {"data": boardInfo}, (response) => {
            this._data = response;
        });
    },
    updateColumnTitle: function (columnId, columnTitle) {
        // updates card title text, saves it and calls the callback function with its data
        let columnInfo = [];
        columnInfo.push(columnId);
        columnInfo.push(columnTitle);
        this._api_post("/update-column-title", {"data": columnInfo}, (response) => {
            this._data = response;
        });
    }
};
