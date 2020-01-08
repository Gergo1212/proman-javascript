import connection
from psycopg2 import sql


@connection.connection_handler
def get_all_data(cursor):
    cursor.execute("""
                    SELECT * FROM boards RIGHT JOIN columns c 
                    ON boards.id = c.board_id 
                    RIGHT JOIN cards c2 ON boards.id = c2.board_id;
                   """)
    data = cursor.fetchall()
    return data


@connection.connection_handler
def get_boards_from_db(cursor):
    cursor.execute("""
                    SELECT id, board_name FROM boards;
                   """)
    boards = cursor.fetchall()
    return boards


@connection.connection_handler
def get_columns(cursor):
    cursor.execute("""
                    SELECT id, column_name, board_id, column_order FROM columns;
                   """)
    columns = cursor.fetchall()
    return columns


@connection.connection_handler
def get_cards_by_board_id(cursor, board_id):
    cursor.execute("""
                    SELECT * FROM cards
                    WHERE board_id = %(board_id)s;
                   """,
                   {"board_id": board_id})
    cards = cursor.fetchall()
    return cards


@connection.connection_handler
def get_cards_by_board_id(cursor, board_id):
    cursor.execute("""
                    SELECT * FROM cards
                    WHERE board_id = %(board_id)s;
                """,
                   {'board_id': board_id})
    cards = cursor.fetchall()
    return cards
