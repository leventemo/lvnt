---
title: Status codes
author: Leventemo
pubDatetime: 2024-04-03T06:33:51Z
postSlug: status-codes
featured: false
draft: false
tags:
  - networking
description: "HTTP response status codes."
---

<https://developer.mozilla.org/en-US/docs/Web/HTTP/Status>

## Table of contents

## 100-199: Informational respobnses

### 100 Continue

### 101 Switching Protocols

### 102 Processing (WebDAV)

### 103 Early Hints

## 200-299: Success responses

### 200 OK

### 201 Created

### 202 Accepted

### 203 Non-Authoritative Information

### 204 No Content

### 205 Reset Content

### 206 Partial Content

### 207 Multi-Status (WebDAV)

### 208 Already Reported (WebDAV)

### 226 IM Used (HTTP Delta encoding)

## 300-399: redirection messages

### 300 Multiple Choices

### 301 Moved Permanently

### 302 Found

### 303 See Other

### 304 Not Modified

### 305 Use Proxy

### 306 unused

### 307 Temporary Redirect

### 308 Permanent Redirect

## 400-499: Client error responses

### 400 Bad Request

### 401 Unauthorized

### 402 Payment Required

### 403 Forbidden

### 404 Not Found

### 405 Method Not Allowed

### 406 Not Acceptable

### 407 Proxy Authentication Required

### 408 Request Timeout

### 409 Conflict

### 410 Gone

### 411 Length Required

### 412 Precondition Failed

### 413 Payload Too Large

### 414 URI Too Long

### 415 Unsupported Media Type

### 416 Range Not Satisfiable

### 417 Expectation Failed

### 418 I'm a teapot

### 421 Misdirected Request

### 422 Unprocessable Content (WebDAV)

### 423 Locked (WebDAV)

### 424 Failed Dependency (WebDAV)

### 425 Too Early

### 426 Upgrade Required

### 428 Precondition Required

### 429 Too Many Requests

### 431 Request Header Fields Too Large

### 451 Unavailable For Legal Reasons

## 500-599: Server error responses

### 500 Internal Server Error

The server encountered an unexpected condition that prevented it from fulfilling the request.

A generic "catch-all" response. Usually, this indicates the server cannot find a better 5xx error code to respond. Sometimes, server administrators log error responses like the 500 status code with more details about the request to prevent the error from happening again in the future.

### 501 Not Implemented

The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.

This status can also send a Retry-After header, telling the requester when to check back to see if the functionality is supported by then.

If the server does recognize the method, but intentionally does not support it, the appropriate response is 405 Method Not Allowed.

### 502 Bad Gateway

The server, while working as a gateway/proxy to get a response needed to handle the request, got an invalid response from the upstream server.

### 503 Service Unavailable

### 504 Gateway Timeout

### 505 HTTP Version Not Supported

### 506 Variant Also Negotiates

### 507 Insufficient Storage (WebDAV)

### 508 Loop Detected (WebDAV)

### 510 Not Extended

### 511 Network Authentication Required
