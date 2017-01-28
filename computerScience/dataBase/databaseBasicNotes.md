
* [Basic Concepts](#basic-concepts)
	* [Feature](#feature)
	* [Common Words](#common-words)
	* [Normalized Design](#normalized-design)
* [Relational Algebra](#relational-algebra)
* [Nosql - MongoDB Basic Notes](#nosql---mongodb-basic-notes)
	* [Set Up](#set-up)
		* [Install](#install)
		* [Not Upgrade](#not-upgrade)
		* [Start/Stop/Restart](#startstoprestart)
		* [Uninstall](#uninstall)
	* [Shell Instruction](#shell-instruction)
		* [create and drop](#create-and-drop)
			* [create](#create)
			* [drop](#drop)
		* [query](#query)
		* [insert](#insert)
		* [information](#information)
			* [database](#database)
			* [collection](#collection)

## Basic Concepts

### Feature

*   Massive
*   Persistent
*   Safe
*   Multi-user
*   Convenient
*   Efficient
*   Reliable

### Common Words

*   create/drop(from)/insert into/delete from/update
*   restricts
*   sub-queries
*   views(shorthand for queries)
*   left/right join on ...
*   primary/foreign key
*   references

### Normalized Design

*   every row has the same number of columns
*   every row has a unique key(PRIMARY KEY)
*   everything in a row is all relevant to unique key
*   everything in a row is all relevant to each other

> (id, name, birth, majar, grade) is not normalized, because grade is not relevant to student id
> (id, name, birth) + (id, majar, grade) is normalized
> (name, os, lang) is not mormalized, because os isn't relevant to lang
> (name, os) + (name, lang) is normalized

> Data-intensive applications may not use DBMS/Query Language at all
> e.g Hadoop, all operations on data stores in files

## Data Format

### XML

*   single root element
*   matched tags with proper nesting
*   unique attributes within elements

#### DTD(Document Type Definition)

*   similar grammar to regular expression(`*?`)
*   ID/IDRef should be unique
*   CDATA: character data
*   (#PCDATA): parsed character data (plain text between tags)

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

tools: xmlcopyeditor xmllint

```sh
$ xmllint --valid --noout Bookstore.xml
```

#### XSD(XML Schema Definition)

```sh
$ xmllint -schema Bookstore.xsd -noout Bookstore.xml
```

### JSON(JavaScript Object Notation)

*   serializing data objects in files
*   human-readable data
*   semi-structured data
*   number/boolean/string/array/object(empty or key-value pair) recursive constructs

## Relational Algebra

### Operators

*   select operator σ(sigma): `σ(sID < 100 ^ sAge > 20)Table_Name` set constraints
*   project operator π(pi)  :   `π(sID, GPA)Table_Name` select certain columns
*   cross-product operator x: Table1 x Table2, m tuples(rows) x n tuples(rows) => m*n tuples(rows)
*   natural join operator ∞: σ(E1.A1 = E2.A1 ^ E1.A2 = E2.A2 ...) (E1 x E2)
*   theta join operator ∞(cond): σ(cond) (E1 x E2), call cond as ϴ
*   difference operator -: matching schemas => change rows/tuples
*   union/intersection operator ∪ / ∩: matching schemas => change rows/tuples
*   rename operator ρ: change schemas(attributes name), different schemas <=> same schemas (**union/intersection/self-join**)
*   assign statement :=
*   tree notation

```sql
π(sID, GPA) (σ(sID < 100 ^ GPA > 3.7) Student)
```

## Higher-Level Database Design Models

Higher-Level Database Design Models `-Translator->` Relational implemented by RDBMS

### UML(Unified Modeling Language)

#### Classes

for data modeling: 

*   add PK(primary key)
*   drop methods

```uml
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

*   one to one: 1..1  --- 1..1
*   many to one: *    --- 1..1
*   one to many:1..1  ---  *
*   many to many: *   ---  *

```uml
-----------                   ---------
| student |                   |collegs|
|---------|                   |       |
|sID   PK |x..y   Apply   m..n|       |
|sName    |-------------------|       |
|GPA      |                   |       |
|---------|                   |       |
|<methods>|                   |       |
-----------                   ---------
```

#### Associations Classes

*   classes store information of relationship edge between 2 data classes
*   unnecessary if 0..1 or 1..1

```uml
c1 * --- 1..1 c2
information of relationship edge can stored in c1
owing to every object of c1 only associated with 1 object of c2
```

#### Subclasses

children classes

#### Composition and Aggregation

### E/R Model(Entity-Relationship Model)

## Nosql - MongoDB Basic Notes

### Set Up

#### Install

```shell
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list 
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org mongodb-org-server mongodb-org-shell mongodb-org-mongos mongodb-org-tools
```

#### Not Upgrade

```shell
$ echo "mongodb-org hold" | sudo dpkg --set-selections
$ echo "mongodb-org-server hold" | sudo dpkg --set-selections
$ echo "mongodb-org-shell hold" | sudo dpkg --set-selections
$ echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
$ echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

#### Start/Stop/Restart

```shell
$ sudo service mongod start
$ sudo service mongod stop
$ sudo service mongod restart
```

#### Uninstall

```shell
$ sudo service mongod stop
$ sudo apt-get purge mongodb-org*
$ sudo rm -r /var/log/mongodb
$ sudo rm -r /var/lib/mongodb
```

### Shell Instruction

#### create and drop

##### create

```sh
use test
show dbs
```

##### drop

```sh
use dbToDrop
db.dropDatabase()
```

#### query

```sh
db.collection.find().pretty()
```

#### insert

```sh
db.collection.insert(ison);
```

#### information

##### database

```sh
db.getName()
db.stats()
db.version()
db.getMongo()
```

##### collection

```sh
db.getCollectionNames()
db.printCollectionStats()
```


