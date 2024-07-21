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

Sources:

- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Status>
- <https://en.wikipedia.org/wiki/List_of_HTTP_status_codes>

## Table of contents

## 1xx: Informational responses

### 100 Continue

Indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.

To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request and receive a 100 Continue status code in response before sending the body.

### 101 Switching Protocols

Indicates a protocol to which the server switches. The protocol is specified in the [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) request header received from a client, which is HTTP/1.1 only, HTTP/2 explicitly disallows the use of this mechanism/header.

The server includes in this response an Upgrade response header to indicate the protocol it switched to. The process is described in the following article: [Protocol upgrade mechanism](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism).

### 102 Processing (WebDAV)

Indicates to client that a full request has been received and the server is working on it. It is only sent if the server expects the request to take significant time. It tells the client that your request is not dead yet.

Deprecated, no longer recommended. Avoid using it, and update existing code if possible; May cease to work at any time.

### 103 Early Hints

May be sent by a server while it is still preparing a response, with hints about the sites and resources that the server is expecting the final response will link. This allows a browser to [preconnect](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preconnect) to sites or start preloading resources even before the server has prepared and sent that final response.

It is primarily intended for use with the [Link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) header, which indicates the resources to be loaded. It may also contain a [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header that is enforced while processing the early hint.

A server might send multiple 103 responses, eg. following a redirect. Browsers only process the first early hint response, and this response must be discarded if the request results in a cross-origin redirect. Preloaded resources from the early hint are effectively pre-pended to the Document's head element, and then followed by the resources loaded in the final response.

see more about compatibility & examples [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103)

## 2xx: Success responses

### 200 OK

Indicates that the request has succeeded. A 200 response is cacheable by default.

The meaning of a success depends on the HTTP request method:

- [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET): The resource has been fetched ad is transmitted in the message body.
- [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD): The representation headers ae included in the response without any message body
- [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST): The resource describing the rsult of the action is transmitted in the message body
- [TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE): The message body contains the request message as received by the server.

The successful result of a [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or a [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) is often not a 200 OK but a 204 No Content (or a 201 Created when the resource is uploaded for the first time).

### 201 Created

The request succeeded and a new resource was created as a result.

- This is typically the response sent after POST requests or some PUT requests.

### 202 Accepted

The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs.

It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.

### 203 Non-Authoritative Information

The server is a transforming proxy (eg. a [Web accelerator](https://en.wikipedia.org/wiki/Web_accelerator)) that received a 200 OK from its origin, but is returning a modified version of the origin's response.

This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. It is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.

### 204 No Content

The server successfully processed the request but there is no content to send. However, the headers may be useful. The user agent may update its cached headers for this resource with the new ones.

### 205 Reset Content

The server successfully processed the request, and tells the user agent to reset the document which sent this request. The server is not returning any content.

### 206 Partial Content

This response code is used when the Range header is sent from the client to request only part of a resource.

The server is delivering only part of the resource (byte serving) due to a range header sent by the client. The range header is used by HTTP clients to enable resuming of interrupted downloads, or split a download into multiple simultaneous streams.

### 207 Multi-Status (WebDAV; RFC 4918)

Conveys information about multiple resources, for situations where multiple status codes might be appropriate.

The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.

### 208 Already Reported (WebDAV; RFC 5842)

Used inside a `<dav:propstat>` response element to avoid repeatedly enumerating the internal members of multiple bindings to the same collection.

The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.

### 226 IM Used (HTTP Delta encoding; RFC 3229)

The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.

## 3xx: redirection messages

This class of status code indicates the client must take additional action to complete the request. Many of these status codes are used in [URL redirection](https://en.wikipedia.org/wiki/URL_redirection).

A user agent

- may carry out the additional action with no user interaction only if the method used in the second request is GET or HEAD.
- may automatically redirect a request.
- should detect and intervene to prevent cyclical redirects.

### 300 Multiple Choices

The request has more than one possible response. The user agent or user should choose one of them. There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so the user can pick.

The client may choose via [agent-driven content negotiation](https://en.wikipedia.org/wiki/Content_negotiation#Agent-driven). Eg. this code could be used to present multiple video format options, to list files with different filename extensions, or to suggest [word-sense disambiguation](https://en.wikipedia.org/wiki/Word-sense_disambiguation).

### 301 Moved Permanently

The URL of the requested resource has been changed permanently. The new URL is given in the response.

### 302 Found (Previously "Moved temporarily")

The the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.

Tells the client to look at (browse to) another URL. The HTTP/1.0 specification required the client to perform a temporary redirect with the same method (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302 redirects by changing the method to GET. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours.

### 303 See Other (since HTTP/1.1)

### 304 Not Modified

### 305 Use Proxy

### 306 unused

### 307 Temporary Redirect

### 308 Permanent Redirect

## 4xx: Client error responses

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

## 5xx: Server error responses

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
