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


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
