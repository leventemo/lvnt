---
title: Postgres Data Types
author: Leventemo
pubDatetime: 2025-03-10T13:21:42Z
postSlug: datatypes-pg
featured: false
draft: false
tags:
  - databases
  - datatypes
  - Postgres
description: "The most common data types in Postgres."
---

## Table of contents

## Overview

**some** of the categories of data types in Postgres

* **Numbers**
* Currency
* Binary
* **Date/Time**
* **Character**
* JSON
* Geometric
* Range
* Arrays
* **Boolean**
* XML
* UUID

## Numeric Types

### Numbers with no decimal points

| Name     | Storage | Description                | Range                                        |
| :------- | :------ | :------------------------- | :------------------------------------------- |
| smallint | 2 bytes | small-range integer        | -32768 to +32767                             |
| integer  | 4 bytes | typical choice for integer | -2147483648 to +2147483647                   |
| bigint   | 8 bytes | large-range integer        | -9223372036854775808 to +9223372036854775807 |

### Numbers with no decimal points, auto increment

| Name        | Storage | Description                     | Range                    |
| :---------- | :------ | :------------------------------ | :----------------------- |
| smallserial | 2 bytes | small autoincrementing integer  | 1 to 32767               |
| serial      | 4 bytes | autoincrementing integer        | 1 to 2147483647          |
| bigserial   | 8 bytes | large autoincrementing integer  | 1 to 9223372036854775807 |

### Numbers with decimal points

| Name        | Storage | Description                     | Range                    |
| :---------- | :------ | :------------------------------ | :----------------------- |
| decimal | variable | user-specified precision, exact  | up to 131072 digits before the decimal point; up to 16383 digits after the decimal point |
| numeric | variable | user-specified precision, exact  | up to 131072 digits before the decimal point; up to 16383 digits after the decimal point |
| real | 4 bytes | variable-precision, inexact  | 6 decimal digits precision |
| double precision | 8 bytes | variable-precision, inexact  | 15 decimal digits precision |
| [float](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-FLOAT) | ... | variable-precision, inexact  | ... |

Numeric types: things to consider
* type
* expected accuracy
* range
* storage size

## Character Types


CHAR(5)
* stores a fixed length of characters
* if we provide a larger number of characters than what the param defines, PG trims the string down until it gets down to the right number
  + `SELECT ('dsaadfsfdsfdsfsadfsad'::CHAR(3))` -> `character(3)`, `dsa`
* if we prove a string less than what the param defines, PG inserts spaces to the right-hand side until it gets up to the right number
  + `SELECT ('d'::CHAR(3))` -> `character(3)`, `d..`

VARCHAR
* stores any length of string

VARCHAR(40)
* stores any length of string using a provided param to specify the length
* any extra characters will be removed automatically
  + `SELECT ('dsaadfsfdsfdsfsadfsad'::VARCHAR(5))` -> `character(5)`, `dsaad`
* a string with less than the provided number of characters: no space will be added, unlike the case with CHAR()
  + `SELECT ('ds'::VARCHAR(5))` -> `character(5)`, `ds`

TEXT
* stores any length of string
* very much like VARCHAR() but no param

Character types: things to consider
* no performance / optimization difference between these character types
* unlike many other types of DBs
* pick the type that best suits your app
* even putting a limit on VARCHAR(40) gives no performance gain whatsoever
  + it just does some validation for you to filter out strings that are way too long

## Boolean Types

we can provide diff values to PG & tell it to treat as a Boolean:
* TRUE values:
  + `true, 'yes', 'on', 1, 't', 'y'`
* FALSE values:
  + `false, 'no', 'off', 0, 'f', 'n'`
* NULL values:
  + null: we don't know, there's no value here, not true and not false

eg.
* `SELECT ('true'::BOOLEAN)` -> `boolean`, `true`
* `SELECT ('t'::BOOLEAN)` -> `boolean`, `true`
* etc.

why so many possible values?
* for historical reasons, for backword support

## Times, Dates and Timestamps

...

## Intervals

...

## SOURCES

* [Postgres docs: Numeric Types](https://www.postgresql.org/docs/current/datatype-numeric.html)
* [Stephen Gider: SQL and PostgreSQL](https://www.postgresql.org/docs/current/datatype-numeric.html)

