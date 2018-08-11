# REST API tests for https://jsonplaceholder.typicode.com

## Installation
```
npm i
```

## Launch
```
npm t
```

## Implemented tests

### Positive tests

#### GET tests

Action: sends a GET request to a specific resource uri.

Check: response status code. Expected: 200.

Check: response status message. Expected: OK.

Check: response body. Expected: an object that fits the json schema for this resource (schemas are described in "data" directory).

#### DELETE tests

Action: sends a DELETE request to a specific resource uri.

Check: response status code. Expected: 200.

Check: response status message. Expected: OK.

Check: response body. Expected: an empty object.

#### POST tests

Action: sends a POST request with an object in its body to a common resource uri.

Check: response status code. Expected: 201.

Check: response status message. Expected: Created.

Check: response body. Expected: an object that fits the json schema for this resource.

Check: response body contents. Expected: an object identical to the one sent in the request.

#### PUT tests

Action: sends a PUT request with an object in its body to a specific resource uri.

Check: response status code. Expected: 200.

Check: response status message. Expected: OK.

Check: response body. Expected: an object that fits the json schema for this resource.

Check: response body contents. Expected: an object identical to the one sent in the request, with adjusted id.

### Negative tests

#### Wrong URI tests

Action: send a request to a nonexistent URI.

Check: response status code. Expected: 404.

Check: response status message. Expected: Not Found.

#### Bad Request tests

Action: send a request to the base uri with a method that is not supported by the API.

Check: response status code. Expected: 400.

Check: response status message. Expected: Bad Request.

#### Incorrect Body tests

Action: send a POST request to a specific resource uri with a body that does not satisfy server's requirements (empty, string, number, null).

Check: response status code. Expected: 400.

Check: response status message. Expected: Bad Request.

#### Invalid Body tests

Action: send a POST request to the base uri with a body that has missing/incorrect parameters.

Check: response status code. Expected: 400.

Check: response status message. Expected: Bad Request.
