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
-- create table category
create table category(
id bigint not null primary key auto_increment,
category_name varchar(255)
);
-- chen du lieu category
insert into category(category_name) values('Tình cảm'), ('Bí ẩn'), ('Kinh Dị'), ('Truyền cảm hứng'), ('Truyện ngắn'), ('Lịch sử');
-- create table book
create table book(
	id bigint not null primary key auto_increment,
    title varchar(255),
    book_description text,
    author varchar(255),
    thumbnail varchar(255),
    numbers int,
    published_date timestamp,
    published_company varchar(255),
    price bigint,
    category_id bigint,
    FOREIGN KEY (category_id) REFERENCES category(id)
);
insert into book(title, book_description, author, thumbnail, numbers, published_date, published_company, price, category_id)
values
(
	'Khi lỗi thuộc về những vì sao',
    'Sâu sắc, táo bạo, ngang tàng, và thô ráp, Khi lỗi thuộc về những vì sao là một quyển sách hay ý nghĩa nhưng cũng thương tâm và tham vọng nhất của John Green, tác giả của những giải thưởng, nhưng đồng thời lại khám phá một cách khéo léo nét hài hước, li kỳ, và bi thảm của việc sống và việc yêu.',
    'John Green',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
	50,
    '2011-03-16',
    'Nhà xuất bản Kim Đồng',
    56000,
    4
),
(
	'Giết con chim nhại',
    'Được kể dưới góc nhìn của một cô bé, cuốn sách Giết con chim nhại không né tránh bất kỳ vấn đề nào, gai góc hay lớn lao, sâu xa hay phức tạp: nạn phân biệt chủng tộc, những định kiến khắt khe, sự trọng nam khinh nữ… Góc nhìn trẻ thơ là một dấu ấn đậm nét và cũng là đặc sắc trong Giết con chim nhại. Trong sáng, hồn nhiên và đầy cảm xúc, những câu chuyện tưởng như chẳng có gì to tát gieo vào người đọc hạt mầm yêu thương.',
    'Harper Lee',
    'https://sachyeu.com/wp-content/uploads/2021/06/GietConChimNhai.jpeg',
	40,
    '2010-07-15',
    'Nhà xuất bản Trẻ',
    88000,
    1
),
(
	'Điệu vũ bên lề',
    'Quyển sách hay ý nghĩa này nói về sự mất mát, tình yêu, nỗi sợ hãi và hy vọng. Truyện đề cập đến những khía cạnh nhân văn của tình bạn ở ngấp nghé lứa tuổi trưởng thành. Tình bạn kỳ lạ và cảm động đã giúp một cậu bé nhút nhát, gặp vấn đề về tính cách trở nên tự tin và yêu cuộc sống. Cuốn sách được viết dưới dạng độc thoại qua những bức thư Charlie gửi cho một người bạn tưởng tượng. Charlie là một cậu bé sống nội tâm, phải chịu mất mát lớn trong quá khứ. Charlie bước vào trường trung học với nỗi sợ hãi, bơ vơ không bạn bè. Tại trường học mới, cậu gặp hai anh em nhà Sam và Patrick. Sam xinh đẹp, mạnh mẽ, cá tính nhưng mắc phải nhiều sai lầm trong quá khứ, còn Patrick vui vẻ, nhanh nhảu, hòa đồng nhưng giấu kín chuyện mình là một người đồng tính.',
    'Stephen Chbosky',
    'https://static.8cache.com/cover/o/eJzLyTDW183LdQ9LNfUuq_Iy0A8zyajwjMrzLa3w1HeEgsBST_0y96jixAyP3IjC5Krk0Lwq94IUx9zEEvP0QteiUl0X53Rn53z9YgMALV4a1g==/dieu-vu-ben-le.jpg',
	30,
    '2009-01-20',
    'Nhà xuất bản Tổng hợp thành phố Hồ Chí Minh',
    110000,
    5
),
(
	'Kẻ trôm sách',
    'Kẻ trộm sách mang đề tài cuộc chiến tranh thế giới lần thứ 2 và người kể chuyện trong tác phẩm này là Thần Chết. Nhưng câu chuyện mà thần chết kể ra, về sự dữ dội của những gì con người gây ra đối với chính đồng loại của họ thì đến ngay cả Thần Chết cũng phải rùng mình.',
    'Markus Zusak',
    'https://sach86.com/wp-content/uploads/2019/12/ke-trom-sach.jpg',
	45,
    '2012-05-19',
    'Nhà xuất bản Kim Đồng',
    95000,
    3
),
(
	'Đại gia Gatsby',
    'Là bức chân dung của “Thời đại Jazz” (Jazz Age, cái tên do chính Fitzgerald đặt cho thời kỳ 1918 – 1929), đại gia Gatsby nắm bắt vô cùng sâu sắc tinh thần của thế hệ cùng thời ông: những ám ảnh thường trực về thành đạt, tiền bạc, sang trọng, dư dật, hào nhoáng; song đồng thời là nỗi âu lo trước thói sùng bái vật chất vô độ và sự thiếu vắng đạo đức đang ngày một lên ngôi. Phất lên nhanh chóng từ chỗ “hàn vi”, Gatsby, nhân vật chính của câu chuyện, những tưởng sẽ có tất cả – tiền bạc, quyền lực, và sau rốt là tình yêu -, nhưng rồi ảo tưởng tình yêu đó tan vỡ thật đau đớn, theo sau là cái chết tức tưởi của Gatsby, để cuối cùng lập tức bị người đời quên lãng. Là lời cảnh tỉnh để đời của Scott Fitzgerald về cái gọi là “Giấc mơ Mỹ”, Đại gia Gatsby được ví như một tượng đài văn học, một cánh cửa cần mở ra cho những ai quan tâm tới văn học và lịch sử tinh thần nước Mỹ thời hiện đai.',
    'F. Scott Fitzgerald',
    'https://static.247phim.com/152022/conversions/5f4c7f2257422_gatsby-435_627.jpg',
	60,
    '2015-08-01',
    'Nhà xuất bản Trẻ',
    150000,
    1
),
(
	'Người truyền ký ức',
    'Người Truyền Ký Ức được viết từ năm 1993 này có một lý lẽ lay động về cuộc sống. Nó không như một bài giảng dạy đơn thuần rằng người ta cần thiết nên làm thế này, thế kia, mà khiến mọi người ý thức hơn về những gì mình đang có, về không gian mình đang sống, và về cả ước mơ được nhen nhóm trong đó.',
    'Lois Lowry',
    'https://imemun.files.wordpress.com/2014/03/nguoi-truyen-ky-uc.jpg?w=598&h=598',
	35,
    '2011-11-20',
    'Nhà xuất bản Kim Đồng',
    120000,
    2
),
(
	'Chúa ruồi',
    'Trong một cuộc chiến tranh nguyên tử, mấy chục đứa trẻ chưa đến tuổi thiếu niên “may mắn” sống sót trên một hoang đảo sau khi chiếc máy bay chở chúng đi sơ tán bị trúng đạn. Chúng tập họp dưới bầu trời Nam Thái Bình Dương nắng gắt, chia sẻ gánh nặng và đặt niềm tin vào thủ lĩnh. Nhưng rồi, cái đói và thiên nhiên khắc nghiệt từng bước vắt kiệt bọn trẻ. Bản năng sinh tồn đã dần bóp nghẹt sự ngây thơ – từ đây thực tại của chúng tan hòa vào ác mộng. Một câu truyện ngụ ngôn đau đớn và hãi hùng, ngập tràn những tư tưởng ẩn sâu dưới hàng hàng lớp lớp ẩn dụ và biểu tượng.',
    'William Golding',
    'https://sachxuasaigon.com/wp-content/uploads/2020/02/chua-ruoi-1.jpg',
	50,
    '2007-03-25',
    'Nhà xuất bản Trẻ',
    65000,
    5
),
(
	'Eleanor & Park',
    'Rainbow Rowell đang kể về tình đầu ngốc xít của Eleanor và Park trong quyển sách này. Thế nhưng bà lại đặt nó giữa kha khá những con sóng lớn: nào là kì thị, phân biệt chủng tộc, nào là quấy rối, bạo lực vv. Tưởng chừng sẽ bị nhận chìm, vậy mà tình yêu vẫn sáng lên, cứu sinh hai tâm hồn rất đỗi mong manh. Eleanor & Park: chúng đủ thông minh để biết tình đầu đâu có bền lâu, song cũng đủ dũng cảm để thử và cố gắng. Ngọt, đắng cứ chầm chậm quyện vào nhau thành vị chocolate của tình đầu – nồng ấm, khó quên.',
    'Rainbow Rowell',
    'https://images-na.ssl-images-amazon.com/images/I/610-KtPafmL.jpg',
	30,
    '2010-06-10',
    'Nhà xuất bản Kim Đồng',
    180000,
    1
),
(
	'Người đua diều',
    'Quyển sách hay ý nghĩa này là lời tự thuật của nhà văn người Mỹ gốc Afghanistan Amir về những năm tháng tuổi thơ đầy niềm vui cũng như lỗi lầm, về những ngày trôi dạt trên đất khách rồi cuộc hành trình trở lại quê hương đổ nát để cứu chuộc tội lỗi cho bản thân và cho cả người cha đã khuất. Theo dòng hồi ức của Amir, người đọc trở lại hơn hai mươi năm về trước, khi Amir còn là một cậu bé mười hai tuổi sống trong vòng tay che chở của Baba giàu sang và thanh thế.',
    'Khaled Hosseini',
    'https://sach86.com/wp-content/uploads/2020/04/Nguoi-Dua-Dieu.jpg',
	45,
    '2006-10-12',
    'Nhà xuất bản Trẻ',
    53000,
    4
),
(
	'Cuộc đời của Pi',
    'Piscine Molitor Patel, hay bị gọi nhầm thành Pissing cho đến khi cậu tự đặt cho mình biệt danh Pi – con số 3,14 huyền thoại. Ngẫu nhiên thay, cái tên ấy cùng những biến cố sau này đã biến cuộc đời Pi trở thành huyền thoại. Mà ngay cả nếu không phải huyền thoại thì Pi đã là một cậu bé kỳ lạ, đứa trẻ lớn lên cùng những người bạn trong vườn thú và có niềm tin mạnh mẽ vào Thượng đế. Chắc hẳn trên thế giới này, Pi là cậu bé duy nhất theo đến ba tôn giáo: Hindu, đạo Hồi và đạo Cơ đốc. Trong con người Pi, tôn giáo cũng như dân tộc, như quốc tịch và nếu như chúng ta đều tôn thờ Thượng đế thì tại sao lại không thể tin theo nhiều đạo.',
    'Yann Martel',
    'https://sach86.com/wp-content/uploads/2020/04/Nguoi-Dua-Dieu.jpg',
	45,
    '2007-11-22',
    'Nhà xuất bản Kim Đồng',
    95000,
    5
),
(
	'Những thành phố giấy',
    'Quentin Jacobsen thầm phải lòng cô bạn Margo Roth Spiegelman xinh đẹp thích phiêu lưu. Thế nên khi Margo cậy cửa sổ lách vào đời cậu – ăn vận như ninja và triệu tập cậu vào một chiến dịch trả thù đầy táo bạo – cậu lập tức đi theo. Qua một đêm rong ruổi, ngày mới đến, Q tới trường và phát hiện ra rằng Margo, vốn luôn là một ẩn số quyến rũ, đã thực sự biến mất đầy bí ẩn. Nhưng Q cũng sớm biết được rằng có những manh mối – và những manh mối ấy được để lại cho cậu. Gấp gáp lần theo cung đường đứt khúc, càng đến gần, Q càng khó nhận ra được cô gái mà cậu tưởng chừng đã quá quen thuộc…',
    'John Green',
    'https://www.ybook.vn/uploads/books/full-img-13778-1436505181.jpg',
	60,
    '2015-10-09',
    'Nhà xuất bản Trẻ',
    135000,
    4
),
(
	'Nhà Giả Kim',
    'Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Nhà giả kim là câu chuyện về chàng trai chăn cừu Santiago và chuyến hành trình của anh đến châu Phi. Trong chuyến đi đó, anh đã gặp được nhà giả kim. Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người.',
    'Paulo Coelho',
    'https://images.lifewithbook.com/2020/03/nha-gia-kim-004.jpeg',
	55,
    '2011-01-01',
    'Nhà xuất bản Kim Đồng',
    150000,
    5
),
(
	'451 độ F',
    'Hãy mường tượng một thế giới nơi truyền hình thống trị và văn chương ngấp nghé trên bờ tuyệt chủng, nơi thông tin nông cạn được tung hô còn tri thức và ý tưởng thì bị ruồng rẫy, nơi tàng trữ sách là phạm pháp, ta có thể bị bắt chỉ vì tản bộ trên vỉa hè, còn nhiệm vụ của những người lính không phải cứu hỏa mà là châm mồi cho những đám cháy…',
    'Ray Bradbury',
    'https://nld.mediacdn.vn/2020/8/21/13-chot-15980146991181978466022.jpg',
	48,
    '2004-09-11',
    'Nhà xuất bản Trẻ',
    89000,
    1
),
(
	'Hoàng tử bé',
    'Câu chuyện kể về một hoàng tử nhỏ cô đơn từ tiểu tinh cầu xa xôi viếng thăm rồi lại lìa xa Trái đất. Hoàng tử bé được xem là tác phẩm thơ mộng nhất của mọi thời đại. Cho đến nay, tác phẩm ra đời vào năm 1943 của nhà văn Saint-Exupéry này đã được dịch sang hơn 160 ngôn ngữ và phát hành hơn 50 triệu bản trên khắp thế giới. Sự giản dị trong sáng tỏa khắp tác phẩm đã khiến nó trở thành một bài thơ bất hủ mà mãi mãi người ta muốn đem làm quà tặng của tình yêu. Cho đến nay, không biết bao nhiêu người đã đọc đi đọc lại tác phẩm này để rồi lần nào cũng lặng đi trong nước mắt.',
    'Antoine de Saint-Exupéry',
    'http://4.bp.blogspot.com/-hTqSE5lC08o/UfDWfptH3HI/AAAAAAAAAaw/4uFMhu_Yl4I/s1600/hoang-tu-be.jpg',
	48,
    '2016-01-01',
    'Nhà xuất bản Kim Đồng',
    115000,
    5
),
(
	'Jane Eyre',
    'Jane Eyre là cuốn tiểu thuyết nổi tiếng của nữ tác giả người Anh Charlotte Bronte thế kỷ 19. Tác phẩm nói về cuộc đời của một người con gái nghèo tỉnh lẻ đã kiên cường vật lộn với số phận phũ phàng để bảo vệ phẩm giá và tự khẳng định vị trí xã hội của mình bằng cuộc sống lao động lương thiện. “Tôi không phải là chim, không có chiếc lồng nào có thể bẫy được tôi. Tôi là một người tự do, với một ý chí độc lập.” – Trích tác phẩm',
    'Charlotte Bronte',
    'https://media.movieassets.com/static/images/items/movies/posters/5a76964974bd9e0428968a2349e05c50.jpg',
	65,
    '2002-02-12',
    'Nhà xuất bản Trẻ',
    65000,
    1
)
;
-- tao bang borrowed-book
create table borrowed_book(
	id bigint not null primary key auto_increment,
    numbers int,
    borrowed_date timestamp,
    borrowed_restore timestamp,
    user_id bigint,
    book_id bigint,
    borrow_status int, -- chua tra co gia tri la 0, tra roi co gia tri la 1
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES book(id)
);
insert into borrowed_book(numbers, borrowed_date, borrowed_restore, user_id, book_id, borrow_status)
values
(1, '2022-06-29', '2022-07-02', 7, 2, 0),
(2, '2022-06-29', '2022-07-02', 7, 5, 1)
;