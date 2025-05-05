---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [CS, Database]
---

# Database Basic Notes

## Basic Concepts

### Feature

- Massive
- Persistent
- Safe
- Multi-user
- Convenient
- Efficient
- Reliable

### Common Words

- create/drop(from)/insert into/delete from/update
- restricts
- sub-queries
- views(shorthand for queries)
- left/right join on ...
- primary/foreign key
- references

> (id, name, birth, major, grade) is not normalized,
> because grade is not relevant to student id
> (id, name, birth) + (id, major, grade) is normalized
> (name, os, lang) is not normalized, because os isn't relevant to lang
> (name, os) + (name, lang) is normalized
> Data-intensive applications may not use DBMS/Query Language at all
> e.g Hadoop, all operations on data stores in files

## Data Format

### XML

- single root element
- matched tags with proper nesting
- unique attributes within elements

#### DTD

Document Type Definition:

- similar grammar to regular expression(`*?`)
- ID/IDRef should be unique
- CDATA: character data
- (#PCDATA): parsed character data (plain text between tags)

```xml
<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE Bookstore [
    <!ELEMENT Bookstore (Book)*>
    <!ELEMENT Book (Title, Authors, Remark?)>
    <!ATTLIST Book  ISBN ID #REQUIRED
                    Price CDATA #REQUIRED
                    Authors IDREFS #REQUIRED>
    <!ELEMENT Title (#PCDATA)>
    <!ELEMENT Remark (#PCDATA | BookRef)*>
    <!ELEMENT BookRef EMPTY>
    <!ATTLIST BookRef book IDREF #REQUIRED>
    <!ELEMENT Authors (Author)*>
    <!ELEMENT Author (First_Name, Last_Name)>
    <!ATTLIST Author Ident ID #REQUIRED>
    <!ELEMENT First_Name (#PCDATA)>
    <!ELEMENT Last_Name (#PCDATA)>
]>

<Bookstore>
    <Book ISBN="ISBN-0-23-23333-233" Price="233" Authors="Sabertazimi">
        <Title>Kind of sword</Title>
        <Authors>
            <Author Ident="Sabertazimi">
                <First_Name>Yilong</First_Name>
                <Last_Name>Liu</Last_Name>
            </Author>
        </Authors>
    </Book>
</Bookstore>
```

Tools: XML Copy Editor, XML Linter:

```bash
xmllint --valid --noout Bookstore.xml
```

#### XSD

XML Schema Definition:

```bash
xmllint -schema Bookstore.xsd -noout Bookstore.xml
```

### JSON

JavaScript Object Notation:

- serializing data objects in files
- human-readable data
- semi-structured data
- number/boolean/string/array/object(empty or key-value pair) recursive constructs

## Relational Algebra

### Operators

- select operator σ(sigma): `σ(sID < 100 ^ sAge > 20)Table_Name` set constraints
- project operator π(pi) : `π(sID, GPA)Table_Name` select certain columns
- cross-product operator x: Table1 x Table2,
  m tuples(rows) x n tuples(rows) => `m*n` tuples(rows)
- natural join operator ∞: σ(E1.A1 = E2.A1 ^ E1.A2 = E2.A2 ...) (E1 x E2)
- theta join operator ∞(condition): σ(condition) (E1 x E2), call condition as ϴ
- difference operator -: matching schemas => change rows/tuples
- union/intersection operator ∪ / ∩: matching schemas => change rows/tuples
- rename operator ρ: change schemas(attributes name),
  different schemas `<=>` same schemas (**union/intersection/self-join**)
- assign statement :=
- tree notation

```sql
π(sID, GPA) (σ(sID < 100 ^ GPA > 3.7) Student)
```

## Higher-Level Database Design Models

Higher-Level Database Design Models `-Translator->` Relational implemented by RDBMS

### UML

Unified Modeling Language: PlantUML

#### Classes

for data modeling:

- add PK(primary key)
- drop methods

```cpp
-----------
| student |
|---------|
|sID   PK |
|sName    |
|GPA      |
|---------|
|<methods>|
-----------
```

#### Associations

relationships between objects of 2 classes):

- one to one: `1..1 --- 1..1`.
- many to one: `* --- 1..1`
- one to many: `1..1 --- *`.
- many to many: `* --- *`.

```cpp
-----------                   ---------
| student |                   |college|
|---------|                   |       |
|sID   PK |x..y   Apply   m..n|       |
|sName    |-------------------|       |
|GPA      |                   |       |
|---------|                   |       |
|<methods>|                   |       |
-----------                   ---------
```

#### Associations Classes

- classes store information of relationship edge between 2 data classes
- unnecessary if 0..1 or 1..1

```cpp
c1 * --- 1..1 c2
information of relationship edge can stored in c1
owing to every object of c1 only associated with 1 object of c2
```

#### Subclasses

children classes

#### Composition and Aggregation

### Entity Relationship Model

## SQL

### Basic SQL Statements

增删查改:

```sql
-- 插入
INSERT INTO table_name (column_name) VALUES (sql_value);

-- 删除
DELETE FROM table_name WHERE column_name = sql_value;

-- 查询
SELECT * FROM table_name WHERE column_name = sql_value;

-- 更新
UPDATE table_name SET column1 = value1 WHERE column2 = value2;
```

### Table Management

```sql
-- 添加列
ALTER TABLE table_name ADD COLUMN column_name;

-- 删除列
ALTER TABLE table_name DROP COLUMN column_name;

-- 修改列
ALTER TABLE table_name MODIFY COLUMN column_name;

-- 重命名列
ALTER TABLE table_name RENAME COLUMN column_name TO new_column_name;

-- 重命名表
ALTER TABLE table_name RENAME TO new_table_name;
```

### WHERE Condition

- `=`
- `<>`
- `>`
- `>=`
- `<`
- `<=`
- `NOT`
- `AND`
- `OR`
- `IN (collection)`
- `BETWEEN value1 AND value2`
- `LIKE '%王_'`
- `REGEXP 'regexp'`
- `IS NULL`
- `IS NOT NULL`

### Order

排序:

```sql
ORDER BY column_name [ASC|DESC]
```

### Group

分组:

```sql
GROUP BY column_name [HAVING condition]
```

### Aggregation

聚合函数:

```sql
AVG(column_name)

COUNT(column_name)

MAX(column_name)

MIN(column_name)

SUM(column_name)
```

### Limit

限制数量:

```sql
LIMIT [offset,] length
```

### Distinct

去重:

```sql
DISTINCT column_name
```

### Set Operations

并集:

```sql
query UNION query
```

交集:

```sql
query INTERSECT query
```

差集:

```sql
query EXCEPT query
```

### Join

表关联:

```sql
-- 内连接
INNER JOIN table_name ON condition

-- 左连接
LEFT JOIN table_name ON condition

-- 右连接
RIGHT JOIN table_name ON condition

-- 外连接
OUTER JOIN table_name ON condition
```

### Index

索引:

```sql
CREATE [UNIQUE|FULLTEXT|SPATIAL] INDEX index ON table_name (column1, column2, ...);

DROP INDEX index ON table_name;

SHOW INDEX FROM table_name;

ALTER TABLE table_name ADD INDEX index (column1, column2, ...);
```

### View

视图:

```sql
CREATE VIEW view AS query;

DROP VIEW view;

ALTER VIEW view AS query;
```

```sql
DROP VIEW IF EXISTS Standings;
DROP VIEW IF EXISTS Count;
DROP VIEW IF EXISTS Wins;
DROP TABLE IF EXISTS Matches;
DROP TABLE IF EXISTS Players;

-- Players Table
CREATE TABLE Players (
  id SERIAL primary key,
  name varchar(255)
);

-- Matches Table
CREATE TABLE Matches (
  id SERIAL primary key,
  player int references Players(id),
  opponent int references Players(id),
  result int
);

-- Wins View shows number of wins for each Player
CREATE VIEW Wins AS
  SELECT Players.id, COUNT(Matches.opponent) AS n
  FROM Players
  LEFT JOIN (SELECT * FROM Matches WHERE result>0) as Matches
  ON Players.id = Matches.player
  GROUP BY Players.id;

-- Count View shows number of matches for each Player
CREATE VIEW Count AS
  SELECT Players.id, Count(Matches.opponent) AS n
  FROM Players
  LEFT JOIN Matches
  ON Players.id = Matches.player
  GROUP BY Players.id;

-- Standings View shows number of wins and matches for each Player
CREATE VIEW Standings AS
  SELECT Players.id,Players.name,Wins.n as wins,Count.n as matches
  FROM Players,Count,Wins
  WHERE Players.id = Wins.id and Wins.id = Count.id;
```

### Export and Import

```bash
mysqldump -u <user> -p<password> <database> > sync.sql

mysql -u <user> -p<password> <database> < sync.sql
```

## Relational Design

### Decomposition

- start with mega-relations: including all attributes
- decompose into smaller relations(BCNF/4NF)

### Functional Dependencies

- A -> B => 1-1/n-1 mapping
- key sets: closure of sets contains all attributes

> assuming relation R(A, B, C, D, ..., G)
> and closure of A, B `{A, B}` + `A->C->D, B->E->F, F->G`
> => `{A, B}+ = {A, B, C, ..., G}`
> then, `{A, B}` is a key
> if there no exists such closure, then treat all-attributes as a key

### BCNF

boyce-codd normal form:

- for each A -> B having A is super key && B isn't key
- not exists A -> B -> C
- here's the algorithm:

```cpp
/*
 * @brief fixed point algorithm just like most algorithms from compiler
 *
 * by decomposing to transform non-key dependent attributes to key dependent attributes
 */

compute FDs for R
compute key for R using its FDs

while (there is relation R' aren't in BCNF) {
    pick any R' with A -> B that violates BCNF (A is not its key)
    decompose R' into R1(A, B) and R2(A, rest)
    compute FDs for R1 and R2
    compute keys for R1 and R2 using their FDs
}
```

### Multi Valued Dependencies

- `A -> B && rest attributes` => `A ->> B`.
- `A ->> B` (1-n mapping), `A ->> C` (1-n mapping),
  no `B -> C`/`C ->> B`, `B * C` redundant tuples/rows.
- `A ->>B && A ->>C` => `A ->> B∩C`.
- `A ->>B && B ->>C` => `A ->> C-B`.

### 4NF

Forth normal form:

- if A ->> B then A is key && B isn't key
- here's the algorithm:

```cpp
/*
 * @brief fixed point algorithm just like most algorithms from compiler
 *
 * by decomposing to transform non-key dependent attributes to key dependent attributes
 */

compute FDs and MVDs for R
compute key for R using its FDs

while (there is relation R' aren't in 4NF) {
    pick any R' with A ->> B that violates 4NF(A is not its key)
    decompose R' into R1(A, B) and R2(A, rest)
    compute FDs and MVDs for R1 and R2
    compute keys for R1 and R2 using their FDs
}
```

### Normalized Design

- every row has the same number of columns
- every row has a unique key(PRIMARY KEY)
- everything in a row is all relevant to unique key
- everything in a row is all relevant to each other

## Indexes

- primary mechanism to improve performance of database
- persist data structures stored in database (hash tables/B trees/B+ trees)
- trade off: `scale of database` and `workload(query/update rate)`
  as input of physical design advisors

```sql
CREATE INDEX IndexName on T(A)
CREATE INDEX IndexName on T(A1, A2, ..., An)
CREATE UNIQUE INDEX IndexName on T(A)
DROP INDEX IndexName
```

## Transactions

- a sequence of one/more SQL operations treated as a unit
- target: concurrency and failures recovery

### Transaction Standard

- all or nothing(atomicity)
- transaction begins automatically on first SQL statement
- on "commit": old transaction ends, new one begins
- on session termination: current transaction ends
- "AutoCommit" turns each statement into transaction

### ACID Properties

- Atomicity(Logging)
- Consistency
- Isolation: guarantee serializability(Locking)
- Durability(Logging)

#### Isolation Level

weaker isolation level: read uncommitted < read committed < repeatable read < serializable

- increased concurrency + decreased overhead = increased performance
- weaker consistency guarantees
- some system default: repeatable read

```sql
SET TRANSACTION READ ONLY;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

## Integrity Constraints

```sql
CREATE TABLE TableName (
    ... PRIMARY KEY,
    ... UNIQUE,
    ... CHECK (Condition),
    ... references TableName(ForeignKey),
    ... references TableName(ForeignKey) ON DELETE/UPDATE RESTRICT/SET NULL/CASCADE,
    ... ,
    PRIMARY KEY (Attr1, Attr2, ...),
    UNIQUE (Attr1, Attr2, ...),
    CHECK (Condition),
    FOREIGN KEY (Attr1, Attr2, ...) references
      TableName(Bttr1, Bttr2, ...) [ ON ... (default RESTRICT) ]
);

CREATE ASSERTION AssertionName
CHECK (Condition);
```

## Triggers (DBMS Level Constraints)

```sql
CREATE TRIGGER TriggerName
BEFORE|AFTER|INSTEAD OF Events(INSERT/UPDATE OF/DELETE ON TableName)
[ referencing-variables ]
[ FOR EACH ROW ]
WHEN ( Condition )
[ BEGIN ]
Action
[ END ];

CREATE TRIGGER Cascade
After DELETE ON S
REFERENCING OLD ROW AS O
FOR EACH ROW
DELETE FROM R WHERE A = O.B (R.A = S.B)

CREATE TRIGGER Cascade
After DELETE ON S
REFERENCING OLD TABLE AS OT
DELETE FROM R WHERE A IN (SELECT B FROM BT)
```

## Views

- logical layer: hiding data from users
- modularity and reuse of query

```sql
VIEW ViewName = VIEWQUERY (R1, R2, ..., Rn)

CREATE VIEW ViewName (T1, T2, ..., Tn) AS
< Query >
```

### Modifications on Views

owing to views are logical layer, it's senseless to modify data on views

#### Implements Modification with Triggers

```sql
CREATE TRIGGER TriggerName
INSTEAD OF DELETE/UPDATE OF/INSERT ON ViewName
[ referencing-variables ]
[ FOR EACH ROW ]
WHEN ( Condition )
[ BEGIN ]
Action
[ END ];
```

#### SQL Standard - Updatable Views

- SELECT (no DISTINCT) on single table T
- no GROUP BY/HAVING or Aggregation
- attributes can't be NULL/default values
- sub-queries cant' refer to table T

```sql
CREATE VIEW
...
WITH CHECK OPTION;
```

## MySQL

### MySQL Setup

Setup in [Docker](https://github.com/dromara/RuoYi-Vue-Plus/blob/5.X/script/docker/docker-compose.yml):

```yml
services:
  mysql:
    image: mysql:8.0.33
    container_name: mysql
    restart: unless-stopped
    environment:
      # 时区上海
      TZ: Asia/Shanghai
      # root 密码
      MYSQL_ROOT_PASSWORD: 123456
      # 初始化数据库
      MYSQL_DATABASE: ry-vue
    ports:
      - '3306:3306'
    volumes:
      # 配置挂载
      - ./docker/mysql/conf:/etc/mysql/conf.d/
      - ./docker/mysql/conf/ry.cnf:/etc/mysql/conf.d/ry.cnf:ro
      # 数据挂载
      - ./docker/mysql/data:/var/lib/mysql/
      # 日志挂载
      - ./docker/mysql/logs:/var/log/mysql
      # 数据库初始化
      - ./docker/mysql/init:/docker-entrypoint-initdb.d
      # 数据库脚本
      - ./docker/mysql/sql:/opt/mysql/sql
    privileged: true
    command:
      # 将mysql8.0默认密码策略 修改为 原先 策略 (mysql8.0对其默认策略做了更改 会导致密码无法匹配)
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
```

[允许外部连接](https://cloud.tencent.com/developer/article/2356690):

```bash
mysql -uroot -proot
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
FLUSH PRIVILEGES;
chmod 644 /etc/mysql/conf.d/mysql.cnf
mysql -h 127.0.0.1 -P 3306 -uroot -proot
```

### MySQL Infrastructure

![MySQL Server Layer](./figures/MySQLServerLayer.png 'MySQL Server Layer')

![MySQL Infrastructure](./figures/MySQLInfrastructure.jpg 'MySQL Infrastructure')

## MongoDB

### MongoDB Setup

#### MongoDB Installation

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse"
\ | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org mongodb-org-server
\ mongodb-org-shell mongodb-org-mongos mongodb-org-tools
```

#### MongoDB Not Upgrade

```bash
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

#### MongoDB Control

```bash
sudo service mongod start
sudo service mongod stop
sudo service mongod restart
```

#### MongoDB Uninstall

```bash
sudo service mongod stop
sudo apt-get purge mongodb-org*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```

### Shell Instruction

#### create and drop

##### create

```bash
use test
show dbs
```

##### drop

```bash
use dbToDrop
db.dropDatabase()
```

#### query

```bash
db.collection.find().pretty()
```

#### insert

```bash
db.collection.insert();
```

#### information

##### database

```bash
db.getName()
db.stats()
db.version()
db.getMongo()
```

##### collection

```bash
db.getCollectionNames()
db.printCollectionStats()
```
