DROP TABLE IF EXISTS boards;
DROP TABLE IF EXISTS columns;
DROP TABLE IF EXISTS cards;

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    board_name character varying(255) NOT NULL,
    boards_order int default 0
);

CREATE TABLE columns (
    id SERIAL PRIMARY KEY,
    column_name character varying(255) NOT NULL,
    board_id int,
    column_order int default 0
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    title character varying(255) NOT NULL,
    card_text character varying(255) NOT NULL,
    column_id int,
    board_id int,
    card_order int default 0
);


INSERT INTO boards (board_name) VALUES ('Board 1');
INSERT INTO boards (board_name) VALUES ('Board 2');

INSERT INTO columns (column_name, board_id, column_order) VALUES ('in progress', 1, 1);
INSERT INTO columns (column_name, board_id, column_order) VALUES ('not in progress', 1, 2);
INSERT INTO columns (column_name, board_id, column_order) VALUES ('test', 1, 3);
INSERT INTO columns (column_name, board_id, column_order) VALUES ('done', 1, 4);

INSERT INTO cards (title, card_text, column_id, board_id, card_order) VALUES ('new card 1','valami text', 1, 1, 1);
INSERT INTO cards (title, card_text, column_id, board_id, card_order) VALUES ('new card 2','valami text_2', 1, 1, 2);
