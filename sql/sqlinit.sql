drop database independentstudygit;
create database independentstudygit;
use independentstudygit;



#create Facility table
create table Facility(
fId nvarchar(50) primary key,
fName nvarchar(100),
maxOccupants int,
fAddr nvarchar(200),
fCity nvarchar(50),
fState nvarchar(2),
fZip int,
lat float,
longitude float
);

#insert testing facility
insert into facility values(
1,
"SHSU",
5,
"1905 University Ave, Huntsville",
"Huntsville",
"Tx",
77340,
30.713924493488726,
 -95.54689450118795
);

#create contact table
create table Contact(
cId int primary key,
firstName nvarchar(50),
lastName nvarchar(50),
title nvarchar(100),
phoneNum nvarchar(15),
cType nvarchar(50),
cEmail nvarchar(100),
fId nvarchar(50),
foreign key (fId) references Facility(fId)
);

#create testing contact value
insert into contact values(1, "Saul", "Goodman", "esq.", 888-888-8888, "ctype?", "itsallgoodman@bettercallsaul.com",1);

create table ContactInfo(
cMailAddr nvarchar(200),
cMailCity nvarchar(50),
cMailState nvarchar(2),
cMailZip int,
cId int,
primary key (cId),
foreign key (cId) references Contact(cId)
);

create table Chemical(
chId int primary key,
chName nvarchar(200),
CAS int,
EHS nvarchar(10)
);

create table LocType(
loc_id int primary key,
loc nvarchar(200),
loc_type nvarchar(100),
loc_pressure nvarchar(50),
loc_temp nvarchar(50)
);

create table Chemical_In_Fac(
facId nvarchar(50),
chId int,
primary key (facId, chId),
loc_id int,
percent float,
max_Amt int,
foreign key (facId) references Facility(fId),
foreign key (chId) references Chemical(chId),
foreign key (loc_id) references LocType(loc_id)
);

create table props(
chId int primary key,
chronic boolean,
fire boolean,
gas boolean,
liquid boolean,
mixture boolean,
pressure boolean,
pure boolean,
reactive boolean,
solid boolean,
explosive boolean,
flammable boolean,
oxidizer boolean,
self_reactive boolean,
pyrophoric_liquid boolean,
pyrophoric_gas boolean,
self_heating boolean,
organic_peroxide boolean,
corrosive_to_metal boolean,
gas_under_pressure boolean,
flammable_gas boolean,
acute_toxicity boolean,
mutagen boolean,
carcinogen boolean,
foreign key (chId) references Chemical(chID)
);

create table department(
	departmentId int primary key auto_increment not null,
    departmentName nvarchar(50)
);


create table users(
	userId int primary key auto_increment not null,
    departmentId int,
    primaryEmail nvarchar(100),
    secondaryEmail nvarchar(100),
    phoneNumber nvarchar(15),
    firstName nvarchar(50),
    lastName nvarchar(50),
    username nvarchar(50),
    verified boolean default false,
    isAdmin boolean default false,
    password nvarchar(100),
	foreign key(departmentId) references department(departmentId)
);

insert into department values(null, "department1");

#insert testing value as admin
insert into users values(
1,
1,
"WHW@aisd.edu",
"Heis@gmail.com",
"888-888-8888",
"Walter",
"White",
"heisenburg",
true,
true,
"password"
);

#insert testing value as regular users
insert into users values(
2,
1,
"jessiepinkman@aisd.edu",
"thecook@gmail.com",
"999-999-9999",
"Jessie",
"Pinkman",
"the Cook",
false,
false,
"password2"
);

insert into users values(
3,
1,
"GusFreind@LosPollos.com",
"GudFreind@scpglobal.com",
"999-999-9999",
"Gustavo",
"Freind",
"the Boss",
false,
false,
"chickenman21"
);

insert into users values(
4,
1,
"MikeErmantraut@LosPollos.com",
"mErmantraut@scpglobal.com",
"999-999-9999",
"Mike",
"Ermantraut",
"securityguy",
false,
false,
"securityguy21"
);

insert into users values(
5,
1,
"SaulGoodman@legallawyers.com",
"Saulg@scpglobal.com",
"999-999-9999",
"Jimmy",
"McGill",
"Lawyerup",
false,
false,
"lawislife2121"
);


create table accessRequests(
	rolerequested int,
	userId int,
    approver int,
    departmentId int,
    foreign key (userId) references users(userId),
    foreign key (approver) references users(userid),
    foreign key (departmentId) references department(departmentId)
);

#create a mock request, user2/user3 requesting access to dep1



