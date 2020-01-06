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
    board_id int REFERENCES boards(id),
    column_order int default 0
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    title character varying(255) NOT NULL,
    card_text character varying(255) NOT NULL,
    column_id int REFERENCES columns(id),
    board_id int REFERENCES boards(id),
    card_order int default 0
);


INSERT INTO boards VALUES (1, 'Board 1');
INSERT INTO boards VALUES (2, 'Board 2');

INSERT INTO columns VALUES (1, 'in progress', 1, 1);
INSERT INTO columns VALUES (2, 'not in progress', 1, 2);
INSERT INTO columns VALUES (3, 'test', 1, 3);
INSERT INTO columns VALUES (4, 'done', 1, 4);

INSERT INTO cards VALUES (1, 'new card 1','valami text', 1, 1, 1);
INSERT INTO cards VALUES (2, 'new card 2','valami text_2', 1, 1, 2);
