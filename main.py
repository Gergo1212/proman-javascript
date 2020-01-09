from flask import Flask, render_template, url_for, request
from util import json_response

import sql_manager

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    return sql_manager.get_boards_from_db()


@app.route("/create-board")
@json_response
def create_board():
    sql_manager.create_new_board()
    return sql_manager.get_boards_from_db()


@app.route("/create-column/<int:board_id>")
@json_response
def create_column(board_id: int):
    sql_manager.create_new_column(board_id)
    return sql_manager.get_boards_from_db()


@app.route("/get-columns/<int:board_id>")
@json_response
def get_columns(board_id: int):
    """
    All the boards
    """
    return sql_manager.get_columns(board_id)


# @app.route("/get-cards")
# @json_response
# def get_cards():
#     """
#     All cards that belongs to a board
#     :param board_id: id of the parent board
#     """
#     return sql_manager.get_cards()


@app.route("/get-cards/<int:column_id>")
@json_response
def get_cards(column_id: int):
    return sql_manager.get_cards_by_column_id(column_id)


@app.route("/create-board", methods=['POST'])
@json_response
def create_board():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    board_title = request.get_json()['data']

    return sql_manager.create_new_board(board_title)


@app.route("/update-board-title", methods=['POST'])
@json_response
def update_board_title():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    ID_VALUE = 0
    TITLE_VALUE = 1
    board_id = request.get_json()['data'][ID_VALUE]
    board_title = request.get_json()['data'][TITLE_VALUE]

    return sql_manager.update_board_title(board_id, board_title)


@app.route("/update-column-title", methods=['POST'])
@json_response
def update_column_title():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    ID_VALUE = 0
    TITLE_VALUE = 1
    column_id = request.get_json()['data'][ID_VALUE]
    column_title = request.get_json()['data'][TITLE_VALUE]

    return sql_manager.update_column_title(column_id, column_title)


@app.route("/update-card-title", methods=['POST'])
@json_response
def update_card_title():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    ID_VALUE = 0
    TITLE_VALUE = 1
    card_id = request.get_json()['data'][ID_VALUE]
    card_title = request.get_json()['data'][TITLE_VALUE]

    return sql_manager.update_card_title(card_id, card_title)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
