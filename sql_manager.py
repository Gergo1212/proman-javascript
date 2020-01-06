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
