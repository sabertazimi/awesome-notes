
* [Functional Programming Basic Notes](#functional-programming-basic-notes)
	* [Rules for expressions](#rules-for-expressions)
		* [samples](#samples)
	* [Standard ML](#standard-ml)
		* [functions](#functions)
		* [tuples](#tuples)
		* [lists](#lists)
		* [let expressions](#let-expressions)
		* [options](#options)
		* [boolean operations](#boolean-operations)

# Functional Programming Basic Notes

## Rules for expressions

*   Syntax
*   Type-checking
*   Evaluation ruls

### samples

```ml
syntax: if e1 then e2 else e3
type: e1 = bool,  e2 = e3 = any
evaluation: e1 ? e2 : e3
```

## Standard ML

### functions

```ml
syntax: fun name (arg1: type1, .., argn: typen) = body
type: name = type1 * ... * typen -> body_type
lazy evaluation
```

### tuples

```ml
(* tuples *)
syntax: e = (e1, ..., en)
type: e1 * ... * en (can become fun's arguments list)
evaluation: #1 e, #2 e, ..., #n e
```

### lists

```ml
(* lists *)
syntax: l = [e1, ..., en]
type: [] = elem_type list; hd(head) l = elem_type, tl(tail) x = elem_type list
evaluation: cons = e :: l; null [] = false; 

> 6 :: [1, 3, 5]
```

### let expressions

```ml
syntax: let
            b1 b2 ... bn
        in
            body
        end
type: whole let type = body_type
evaluation: whole let result = body_result
```

### options

*   NONE  : type = 'a option
*   SOME e: type = `e_type` option
*   isSome: type = 'a option -> bool
*   valOf : type = 'a option -> 'a

### boolean operations

*   e1 andalso e2: keyword
*   e1 orelse e2 : keyword
*   not e1       : bool -> bool
*   =(equal) <>(not equal) > < >= <=: require two same type elem
