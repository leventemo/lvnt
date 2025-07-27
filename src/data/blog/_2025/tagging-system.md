---
title: Building a Tagging System
author: Leventemo
pubDatetime: 2025-02-12T11:11:51Z
postSlug: tagging-system
featured: false
draft: true
tags:
  - tech
description: "On a database level."
---

## Intro

## the SQL

## example queries

## notes

Simply SQL by Rudy Limeback

[fsim](https://fsim.ca/docs/sql.pdf)
[SitePoint](https://www.sitepoint.com/premium/books/simply-sql/read/1/)
[O'Reilly](https://www.oreilly.com/library/view/simply-sql/9780980455250/)
[Amazon](https://www.amazon.com/Simply-SQL-Easy-Learn-Best-Practice/dp/0980455251)

after playing around with my own data for a while I realized that one drawback of the method Limeback recommends is, if a tag string needs to be changed, you would need to edit all the references too, for the SQL to work. If you stick to the "official" way of referring to your tags and use the tags.id, you just change the string once in your tags table and you're good to go. As an exmple, change "friend" to "friends". - Although that can be done using a simple SQL command, no need for changing every single ingle value in the given rows manually.
