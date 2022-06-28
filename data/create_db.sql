use quan_ly_thu_vien;
-- tao bang role: code = 1 la admin, code = 2 la user
create table role(
id bigint not null primary key auto_increment,
role_code int(2) not null unique,
role_name varchar(100) not null unique
);
-- insert role
insert into role(role_code, role_name)
values (1, 'admin'), (2, 'user');

-- tao bang user
create table users(
id bigint not null primary key auto_increment,
card_code varchar(255),
full_name varchar(255),
email varchar(100),
user_password varchar(255),
phone_number varchar(20),
created_date timestamp,
reicieve_date timestamp,
role_id bigint not null,
user_status int(1),
FOREIGN KEY (role_id) REFERENCES role(id)
);
-- insert du lieu user
insert into users(card_code, full_name, email, user_password, phone_number, created_date, reicieve_date, role_id, user_status)
values (
	'434443',
    'Hoang Thi Hong',
    'hong@gmail.com',
    'hong0703',
    '0370000000',
    '2022-06-30 23:01:13.07',
    '2022-06-30 23:01:13.07',
    2,
    1
),
(
	'fabcd123',
    'Tran Minh Nhut',
    'nhut@gmail.com',
    'nhut1010',
    '0371111111',
    2,
    1
)
;
-- create table book