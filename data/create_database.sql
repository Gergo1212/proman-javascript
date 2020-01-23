DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS columns;
DROP TABLE IF EXISTS boards;

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