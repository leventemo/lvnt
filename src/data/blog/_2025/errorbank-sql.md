---
title: Errorbank - Categories
author: Leventemo
pubDatetime: 2025-06-31T15:10:43Z
postSlug: errorbank-categories
draft: true
tags:
  - projects
  - language
description: "Designing a database of errors made by Spanish speakers when using English."
---

## the SQL to create the db

```sql
CREATE TABLE writing_mechanics (
id SERIAL PRIMARY KEY,
spelling BOOLEAN DEFAULT false,
capitalisation BOOLEAN DEFAULT false
);

CREATE TABLE vocab (
id SERIAL PRIMARY KEY,
mng_pool BOOLEAN DEFAULT false,
mng_false_friend BOOLEAN DEFAULT false,
mng_phrasal_verb BOOLEAN DEFAULT false,
mng_idiom BOOLEAN DEFAULT false,
form_pool BOOLEAN DEFAULT false,
form_phrasal_verb BOOLEAN DEFAULT false,
form_idiom BOOLEAN DEFAULT false,
form_irregular_verb BOOLEAN DEFAULT false,
form_irregular_plural BOOLEAN DEFAULT false,
form_prefix BOOLEAN DEFAULT false,
form_suffix BOOLEAN DEFAULT false,
form_chunk BOOLEAN DEFAULT false,
use_pool BOOLEAN DEFAULT false,
use_countable_uncountable BOOLEAN DEFAULT false,
register BOOLEAN DEFAULT false,
collocation BOOLEAN DEFAULT false,
preposition BOOLEAN DEFAULT false
);

CREATE TABLE syntax (
id SERIAL PRIMARY KEY,
missing_subj BOOLEAN DEFAULT false,
obj BOOLEAN DEFAULT false,
indirect_obj BOOLEAN DEFAULT false,
verb_pattern BOOLEAN DEFAULT false,
adj BOOLEAN DEFAULT false,
adv BOOLEAN DEFAULT false,
sing_plur BOOLEAN DEFAULT false,
articles BOOLEAN DEFAULT false
third_singular BOOLEAN DEFAULT false
);

CREATE TABLE tenses (
id SERIAL PRIMARY KEY,
pres_simp BOOLEAN DEFAULT false,
pres_cont BOOLEAN DEFAULT false,
pres_perf BOOLEAN DEFAULT false,
pres_perf_cont BOOLEAN DEFAULT false,
past_simp BOOLEAN DEFAULT false,
past_cont BOOLEAN DEFAULT false,
past_perf BOOLEAN DEFAULT false,
past_perf_cont BOOLEAN DEFAULT false,
fut_simp BOOLEAN DEFAULT false,
fut_cont BOOLEAN DEFAULT false,
fut_perf BOOLEAN DEFAULT false,
fut_perf_cont BOOLEAN DEFAULT false,
arranged BOOLEAN DEFAULT false,
insta_decision BOOLEAN DEFAULT false,
gonna_plan BOOLEAN DEFAULT false,
gonna_evidence BOOLEAN DEFAULT false,
);

--OK
CREATE TABLE levels (
	id SERIAL PRIMARY KEY,
	cefr VARCHAR(4) NOT NULL,
	course VARCHAR(15) NOT NULL
);

--OK
INSERT INTO
	levels (cefr, course)
VALUES
	('B1', 'PET1'),
	('B1', 'PET2'),
	('B2', 'First1'),
	('B2', 'First2'),
	('C1', 'Advanced1'),
	('C1', 'Advanced2'),
	('C2', 'Proficiency1'),
	('C2', 'Proficiency2');

--OK
CREATE TABLE learners (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

--OK
CREATE TABLE assignments (
	id SERIAL PRIMARY KEY,
	learner_id INTEGER REFERENCES learners(id),
	level_id INTEGER REFERENCES levels(id),
	date DATE NOT NULL,
	task VARCHAR(20) NOT NULL
);

-- id, error, correct, level_id, learner_id, assignment only: OK
CREATE TABLE errors (
	id SERIAL PRIMARY KEY,
	error VARCHAR(70) NOT NULL,
	correct VARCHAR(70) NOT NULL,
	spelling_id INTEGER REFERENCES spelling(id), --to finalize
	vocab_id INTEGER REFERENCES vocab(id), --to finalize
	syntax_id INTEGER REFERENCES syntax(id), --to finalize
	tense_id INTEGER REFERENCES tenses(id), --to finalize
	level_id INTEGER REFERENCES levels(id),
	learner_id INTEGER REFERENCES learners(id),
	assignment_id INTEGER REFERENCES assignments(id)
);

INSERT INTO "public"."errors" ("id", "error", "correct", "spelling", "vocabulary", "false_friend", "prefix", "suffix", "collocation", "preposition", "syntax", "tenses", "other", "level_id", "learner_id", "assignment_id") VALUES
(1, 'I''ll give it back for you.', 'I''ll give it back to you.', 'f', 'f', 'f', 'f', 'f', 'f', 't', 'f', 'f', 'f', 1, 1, 1),
(2, 'I go to Almeria this week.', 'I''m going to Almeria this week.', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 't', 'f', 1, 1, 1),
(3, 'I forgot read your email.', 'I forgot to read your email.', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 1, 1, 2);


```

## db design

In general, it's a good practice to avoid deeply nested foreign keys in relational database design. Here's why:
* __Query complexity__: Deeply nested foreign keys can lead to complex queries, making it harder to maintain and optimize your database.
* __Data consistency__: With multiple levels of nesting, ensuring data consistency across the relationships can become challenging.
* __Scalability__: Shallow databases tend to scale better, as they reduce the number of joins required to retrieve data.

That being said, there are cases where nested foreign keys are necessary and acceptable. For example:
* __Hierarchical data__: When modeling hierarchical data, such as organizational structures or geographic locations, nested foreign keys can be a natural fit.
* __Domain-specific requirements__: Certain domains, like accounting or finance, may require complex relationships between entities, making nested foreign keys a necessary evil.

To strike a balance, consider the following best practices:
* __Keep it shallow__: Aim for a maximum of 2-3 levels of nesting. This will help maintain query simplicity and data consistency.
* __Use intermediate tables__: Instead of deeply nesting foreign keys, use intermediate tables to bridge relationships between entities.
* __Denormalize strategically__: In some cases, denormalizing data can improve performance and simplify queries. However, be cautious not to compromise data consistency.

Ultimately, the decision to use nested foreign keys depends on your specific use case and database requirements. If you're unsure, consider consulting with a database expert or reviewing established database design patterns in your domain.

Would you like me to provide an example of a well-designed database schema with nested foreign keys?

Here's an example of a database schema for an e-commerce platform that uses nested foreign keys to model hierarchical data:

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  parent_id INTEGER REFERENCES categories(id)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date DATE NOT NULL
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address_id INTEGER REFERENCES addresses(id)
);

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip_code VARCHAR(255) NOT NULL
);
```
In this example:
The `categories` table has a self-referential foreign key `parent_id` to model hierarchical categories (e.g., Electronics > Computers > Laptops).
The `products` table has a foreign key `category_id` that references the `categories` table.
The `orders` table has a foreign key `customer_id` that references the `customers` table.
The `order_items` table has foreign keys `order_id` and `product_id` that reference the `orders` and `products` tables, respectively.
The `customers` table has a foreign key `address_id` that references the `addresses` table.

This schema demonstrates a moderate level of nesting, with a maximum of 2-3 levels of nesting. The relationships between tables are logical and easy to follow, making it easier to maintain and query the database.

Keep in mind that this is just one possible way to design a database schema for an e-commerce platform. Depending on your specific requirements, you may need to modify or extend this schema.

Would you like me to explain any specific aspect of this schema or provide an example query that demonstrates how to retrieve data from this database?

LM
yes, can you expand on how a self-referential foreig key works and what problem it solves?

Windsurf
8:03 pm, Jun 15, 2025
A self-referential foreign key is a foreign key that references the same table it belongs to. In the example I provided earlier, the `categories` table has a self-referential foreign key `parent_id` that references the `id` column of the same `categories` table.

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  parent_id INTEGER REFERENCES categories(id)
);
```
This self-referential foreign key allows you to establish a hierarchical relationship between categories. For example:

| id | name | parent_id | |----|-------------|-----------| | 1 | Electronics | null | | 2 | Computers | 1 | | 3 | Laptops | 2 | | 4 | Desktops | 2 | | 5 | Accessories | 1 |

In this example:
* The `Electronics` category (id 1) has no parent category (null).
* The `Computers` category (id 2) has a parent category of `Electronics` (id 1).
* The `Laptops` and `Desktops` categories (ids 3 and 4) have a parent category of `Computers` (id 2).
* The `Accessories` category (id 5) has a parent category of `Electronics` (id 1).

The self-referential foreign key parent_id enables you to:
* __Establish a hierarchical structure__: You can create a tree-like structure where categories have subcategories, and subcategories have their own subcategories.
* __Query hierarchical data__: You can write queries that traverse the hierarchical structure, such as retrieving all subcategories of a given category or finding the top-level category of a given subcategory.
* __Enforce data consistency__: The foreign key constraint ensures that you cannot create a category with a parent category that does not exist.

Self-referential foreign keys solve several problems:
* __Avoiding redundant data__: By using a self-referential foreign key, you avoid duplicating data, such as storing the parent category name in each subcategory row.
* __Improving data integrity__: The foreign key constraint ensures that the hierarchical structure is consistent and accurate.
* __Simplifying queries__: Self-referential foreign keys enable you to write more efficient and elegant queries that take advantage of the hierarchical structure.

Common use cases for self-referential foreign keys include:
* Category hierarchies (as shown in the example)
* Organizational structures (e.g., employees, departments, teams)
* Geographic locations (e.g., countries, states, cities)
* Comment threads or discussion forums

Do you have any specific questions about self-referential foreign keys or would you like me to provide an example query that demonstrates how to work with this type of data?

LM
8:06 pm, Jun 15, 2025
yes, demo example queries would be handy.

Windsurf
8:06 pm, Jun 15, 2025
Here are some example queries that demonstrate how to work with the self-referential foreign key in the categories table:

__1. Retrieve all categories with their parent categories__
```sql
SELECT c1.name AS category, c2.name AS parent_category
FROM categories c1
LEFT JOIN categories c2 ON c1.parent_id = c2.id;
```
Result:
| category | parent_category | |-------------|-----------------| | Electronics | null | | Computers | Electronics | | Laptops | Computers | | Desktops | Computers | | Accessories | Electronics |

__2. Retrieve all subcategories of a given category__
```sql
SELECT c1.name AS subcategory
FROM categories c1
WHERE c1.parent_id = (SELECT id FROM categories WHERE name = 'Computers');
```
Result:
| subcategory | |-------------| | Laptops | | Desktops |

__3. Retrieve the top-level category of a given subcategory__
```sql
SELECT c2.name AS top_level_category
FROM categories c1
JOIN categories c2 ON c1.parent_id = c2.id
WHERE c1.name = 'Laptops';
```
Result:
| top_level_category | |--------------------| | Electronics |

__4. Retrieve all categories in a hierarchical structure__
```sql
WITH RECURSIVE category_hierarchy AS (
  SELECT id, name, parent_id, 0 AS level
  FROM categories
  WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, c.parent_id, level + 1
  FROM categories c
  JOIN category_hierarchy p ON c.parent_id = p.id
)
SELECT name, level
FROM category_hierarchy
ORDER BY level;
```
Result:
| name | level | |-------------|-------| | Electronics | 0 | | Computers | 1 | | Laptops | 2 | | Desktops | 2 | | Accessories | 1 |

These queries demonstrate how to:
* Retrieve categories with their parent categories
* Retrieve subcategories of a given category
* Retrieve the top-level category of a given subcategory
* Retrieve all categories in a hierarchical structure using a recursive common table expression (CTE)

Do you have any specific questions about these queries or would you like me to provide more examples?

## integrate Angular

Integrating Angular as a frontend framework with your Node.js API server involves several steps. Here's a high-level overview:

### Step 1: Set up a new Angular project

Create a new Angular project using the Angular CLI:
```bash
ng new my-angular-app
```
This will create a new directory with the basic file structure for an Angular app.

### Step 2: Configure the Angular app to communicate with your Node.js API

In your Angular app, create a new service that will handle API requests. For example, you can create a file called `api.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api'; // replace with your Node.js API URL

  constructor(private http: HttpClient) { }

  // example method to fetch data from your API
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

}
```
### Step 3: Create components and templates to interact with your API

Create new components and templates to display data fetched from your API. For example, you can create a file called `data.component.ts`:
```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-data',
  template: `
    <ul>
      <li *ngFor="let item of data">{{ item }}</li>
    </ul>
  `
})
export class DataComponent implements OnInit {

  data: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe(data => {
      this.data = data;
    });
  }

}
```
### Step 4: Configure CORS in your Node.js API

To allow your Angular app to make requests to your Node.js API, you need to configure CORS (Cross-Origin Resource Sharing) in your API. You can use the `cors` middleware package:
```bash
npm install cors
```
Then, in your Node.js API, add the following code:
```javascript
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// your API routes here
```
### Step 5: Run your Angular app and Node.js API

Run your Angular app using the Angular CLI:
```
ng serve
```
Run your Node.js API using Node.js:
```
node server.js
```
Your Angular app should now be able to communicate with your Node.js API.

Note that this is a high-level overview, and you may need to add additional configuration and error handling depending on your specific use case.

LM:
does it have to be a separate project in a separate directory?

No, it doesn't have to be a separate project in a separate directory. You can create an Angular app within your existing Node.js project directory.

Here are a few ways to structure your project:

### Option 1: Create an Angular app within a subdirectory of your Node.js project

You can create a new Angular app within a subdirectory of your Node.js project, for example:
```bash
my-node-project/
server.js
app/
...
angular-app/
e2e/
node_modules/
src/
...
...
package.json
```
In this case, you would run `ng new angular-app` within the `my-node-project` directory.

### Option 2: Use a monorepo structure

You can use a monorepo structure, where your Node.js API and Angular app are separate projects within the same repository. For example:
```bash
my-monorepo/
packages/
node-api/
server.js
...
angular-app/
e2e/
node_modules/
src/
...
...
package.json
```
In this case, you would create separate `package.json` files for each project, and use a tool like `lerna` or `yarn workspaces` to manage dependencies between projects.

### Option 3: Use a single `package.json` file

You can also use a single `package.json` file for both your Node.js API and Angular app. For example:
```bash
my-project/
server.js
angular-app/
e2e/
node_modules/
src/
...
...
package.json
```
In this case, you would install dependencies for both projects in the same `package.json` file, and use scripts to build and run each project separately.

Ultimately, the choice of project structure depends on your specific needs and preferences.

