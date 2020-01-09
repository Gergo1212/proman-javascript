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


@connection.connection_handler
def create_new_column(cursor, board_id):
    cursor.execute(""" 
                    INSERT INTO columns (column_name, board_id, column_order)
                    VALUES ('New Column Name', %(board_id)s, 0)
                    """, {'board_id': board_id}
                   )


@connection.connection_handler
def create_new_board(cursor, board_title):
    cursor.execute("""
                    INSERT INTO boards (board_name, boards_order) 
                    VALUES (%(board_title)s, 0);
                   """,
                   {"board_title": board_title})


@connection.connection_handler
def update_board_title(cursor, board_id, board_name):
    cursor.execute(sql.SQL("""
                    UPDATE boards 
                    SET board_name = '{board_name}'
                    WHERE id = '{board_id}';
                   """).format(board_name=sql.SQL(board_name), board_id=sql.SQL(board_id)))


@connection.connection_handler
def update_column_title(cursor, column_id, column_name):
    cursor.execute(sql.SQL("""
                    UPDATE columns 
                    SET column_name = '{column_name}'
                    WHERE id = '{column_id}';
                   """).format(column_name=sql.SQL(column_name), column_id=sql.SQL(column_id)))


@connection.connection_handler
def update_card_title(cursor, card_id, card_text):
    cursor.execute(sql.SQL("""
                    UPDATE cards 
                    SET card_text = '{card_text}'
                    WHERE id = '{card_id}';
                   """).format(card_text=sql.SQL(card_text), card_id=sql.SQL(card_id)))
