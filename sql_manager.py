import connection
from psycopg2 import sql


@connection.connection_handler
def get_all_data(cursor):
    cursor.execute("""
                    SELECT * FROM boards RIGHT JOIN columns c 
                    ON boards.id = c.board_id 
                    RIGHT JOIN cards c2 ON boards.id = c2.board_id;
                   """
                   )
    data = cursor.fetchall()
    return data


@connection.connection_handler
def get_boards_from_db(cursor):
    cursor.execute("""
                    SELECT id, board_name FROM boards;
                   """
                   )
    boards = cursor.fetchall()
    return boards


@connection.connection_handler
def get_columns(cursor, board_id):
    cursor.execute("""
                    SELECT id, column_name, board_id, column_order FROM columns
                    WHERE board_id = %(board_id)s;
                   """, {'board_id': board_id}
                   )
    columns = cursor.fetchall()
    return columns


@connection.connection_handler
def get_cards_by_column_id(cursor, column_id):
    cursor.execute("""
                    SELECT * FROM cards
                    WHERE column_id = %(column_id)s;
                   """, {"column_id": column_id}
                   )
    cards = cursor.fetchall()
    return cards


@connection.connection_handler
def get_cards(cursor):
    cursor.execute("""
                    SELECT * FROM cards;
                   """
                   )
    cards = cursor.fetchall()
    return cards


@connection.connection_handler
def create_new_board(cursor):
    cursor.execute("""
                    INSERT INTO boards (board_name, boards_order)
                    VALUES ('New Board', 0);
                    """
                   )
    #
    # cursor.execute("""
    #                 SELECT MAX(id) FROM boards;
    #                 """
    #                )
    # board_id = cursor.fetchall()
    #
    # cursor.execute("""
    #                 INSERT INTO columns (column_name, board_id, column_order) VALUES ('in progress', %(id)s, 1);
    #                 INSERT INTO columns (column_name, board_id, column_order) VALUES ('not in progress', %(id)s, 2);
    #                 INSERT INTO columns (column_name, board_id, column_order) VALUES ('test', %(id)s, 3);
    #                 INSERT INTO columns (column_name, board_id, column_order) VALUES ('done', %(id)s, 4);
    #                 """, {'id': board_id}
    #                )


@connection.connection_handler
def create_new_column(cursor, board_id):
    cursor.execute(""" 
                    INSERT INTO columns (column_name, board_id, column_order)
                    VALUES ('New Column Name', %(board_id)s, 0)
                    """, {'board_id': board_id}
                   )
