
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

## Relational Algebra



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


