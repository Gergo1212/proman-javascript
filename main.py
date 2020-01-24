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
    last_added_board = sql_manager.get_last_added_board()

    return last_added_board


@app.route("/create-column/<int:board_id>")
@json_response
def create_column(board_id: int):
    sql_manager.create_new_column(board_id)
    last_added_column = sql_manager.get_last_added_column_by_board_id(board_id)

    return last_added_column


@app.route("/create-card/<int:board_id>/<int:column_id>")
@json_response
def create_card(board_id, column_id):
    sql_manager.create_new_card(board_id, column_id)
    last_added_card = sql_manager.get_last_added_card_by_board_id_column_id(board_id, column_id)

    return last_added_card


@app.route("/get-columns/<int:board_id>")
@json_response
def get_columns(board_id: int):
    """
    All the boards
    """

    return sql_manager.get_columns(board_id)


@app.route("/get-cards/<int:column_id>")
@json_response
def get_cards(column_id: int):
    return sql_manager.get_cards_by_column_id(column_id)


@app.route("/update-board-title", methods=['POST'])
@json_response
def update_board_title():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """

    board_id = request.get_json()['board_id']
    board_title = request.get_json()['board_title']

    return sql_manager.update_board_title(board_id, board_title)


@app.route("/update-column-title", methods=['POST'])
@json_response
def update_column_title():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """

    column_id = request.get_json()['column_id']
    column_title = request.get_json()['column_title']

    return sql_manager.update_column_title(column_id, column_title)


@app.route("/update-card-title", methods=['POST'])
@json_response
def update_card_title():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """

    card_id = request.get_json()['card_id']
    card_title = request.get_json()['card_title']

    return sql_manager.update_card_title(card_id, card_title)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
