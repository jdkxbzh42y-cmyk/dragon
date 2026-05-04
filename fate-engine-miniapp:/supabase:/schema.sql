create table users (
id bigint primary key,
energy int default 50,
streak int default 1,
score int default 0,
birth text,
created_at timestamp default now()
);