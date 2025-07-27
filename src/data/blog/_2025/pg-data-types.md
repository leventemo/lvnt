---
title: Postgres Data Types
author: Leventemo
pubDatetime: 2025-03-10T13:21:42Z
postSlug: datatypes-pg
featured: false
draft: false
tags:
  - tech
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

### DATE

you can provide a string for a date in just about any format
* PG converts it into a fixed date value
* examples:
  + `SELECT ('NOV-20-1980'::DATE)` -> `date`, `1980-11-20`
  + `SELECT ('NOV 20 1980'::DATE)` -> `date`, `1980-11-20`
  + `SELECT ('NOV 20, 1980'::DATE)` -> `date`, `1980-11-20`
  + `SELECT ('1980 NOV 20'::DATE)` -> `date`, `1980-11-20`
  + `SELECT ('1980 November 20'::DATE)` -> `date`, `1980-11-20`

### TIME / TIME WITHOUT TIME ZONE

provide a time inside of a string with or withour am/pm designation or a 24-hour format
* PG converts any format you can imagine into a 24-hour format
* TIME is an alias of TIME WITHOUT TIME ZONE
* examples:
  + `SELECT ('01:23'::TIME)` -> `time without time zone`, `01:23:00`
  + `SELECT ('01:23 PM'::TIME)` -> `time without time zone`, `13:23:00`

### TIME WITH TIME ZONE

any value put in will be converted into the appropriate UTC value
* examples:
  + `SELECT ('01:23 AM EST'::TIME WITH TIME ZONE)` -> `time with time zone`, `01:23:00-05:00`
    - `EST` = Eastern Standard Time, Eastern Coast of USA
    - `-05:00`: indicates 5 hours behind UTC time
  + `SELECT ('01:23 AM PST'::TIME WITH TIME ZONE)` -> `time with time zone`, `01:23:00-08:00`
    - `PST` = Pacific Standard Time, along the Pacific coast of USA
  + `SELECT ('01:23 AM z'::TIME WITH TIME ZONE)` -> `time with time zone`, `01:23:00+00:00`
    - `z`: short for `UTC`
  + `SELECT ('01:23 AM UTC'::TIME WITH TIME ZONE)` -> `time with time zone`, `01:23:00+00:00`

### TIMESTAMP WITH / WITHOUT TIME ZONE

date, time & optional time zone in just about any format in a string
* will be stored in a fix format
* examples:
  + `SELECT ('NOV-20-1980 1:23 AM PST'::TIMESTAMP WITH TIME ZONE)` -> `time with time zone`, `1980-11-20 10:23:00+01`
* PG has a lot of diff functions and ways to work with time as well
  + we can do calculations between diff timestamps

## Intervals

### store intervals

think of INTERVAL as being a duration of time
* examples:
  + `SELECT ('1 day'::INTERVAL)` -> `interval`, `1 day`
  + `SELECT ('1 D'::INTERVAL)` -> `interval`, `1 day`
  + `SELECT ('1 D 20 H'::INTERVAL)` -> `interval`, `1 day 20:00:00`
  + `SELECT ('1 D 20 H 30 M 45 S'::INTERVAL)` -> `interval`, `1 day 20:30:45`

### use intervals to manipulate dates, times & timestamps

numeric operations on intervals
* we can totally abstract out the idea of days, hours, minutes & seconds when it comes to doing the math behind them
* examples
  + `SELECT ('1 D 20 H 30 M 45 S'::INTERVAL) - ('1 D'::INTERVAL)` -> `interval`, `20:30:45`

add / subtract time from dates, times & timestamps
* subtract an interval from a timestamp
  + `SELECT ('NOV 20 1980 1:23 AM EST'::TIMESTAMP WITH TIME ZONE) - ('1 D'::INTERVAL)` -> `interval`, `1980-11-19 07:23:00+01`

numeric operations between 2 dates, times & timestamps
* eg. find the number of days between 2 dates
  + `SELECT ('NOV 20 1980 1:23 AM EST'::TIMESTAMP WITH TIME ZONE) - ('NOV 10 1980 1:23 AM EST'::TIMESTAMP WITH TIME ZONE)` -> `interval`, `10 days`
* eg. find the number of days and hours between 2 times
  + `SELECT ('NOV 20 1980 1:23 AM EST'::TIMESTAMP WITH TIME ZONE) - ('NOV 10 1980 11:23 AM EST'::TIMESTAMP WITH TIME ZONE)` -> `interval`, `9 days 14:00:00`
* eg. mix in time diff time zones
  + `SELECT ('NOV 20 1980 1:23 AM EST'::TIMESTAMP WITH TIME ZONE) - ('NOV 10 1980 5:43 AM PST'::TIMESTAMP WITH TIME ZONE)` -> `interval`, `9 days 16:40:00`

being able do these at a db level is useful,
* as opposed to getting some specialized lib on your server

## SOURCES

* [Postgres docs: Numeric Types](https://www.postgresql.org/docs/current/datatype-numeric.html)
* [Stephen Grider: SQL and PostgreSQL](https://www.postgresql.org/docs/current/datatype-numeric.html)

