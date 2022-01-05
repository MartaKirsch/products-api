## Table of Contents

1.  [Usage](#usage)
2.  [API docs](#apidocs)

<a id="usage"></a>

## Usage

You need Docker to start the project and run one of the following commands from the project root directory.

##### development

```
docker-compose up -d
```

##### production

```
docker-compose -f docker-compose.prod.yaml up
```

When the server is up, you can visit http://localhost:8080 or make requests using Postman.
The project comes with a database that already has a few records.

<a id="apidocs"></a>

## API docs

#### GET /

Root route of the API, you can get a link to this github page there.

#### GET /products

Returns a JSON object with the list of products in the following form.

```
{
	products: [{
		id: string,
		name: string,
		price: number,
		updateDate: string
	}]
}
```

#### GET /products/some-id

Returns a JSON object with the details of a product. Product id is taken from the route param. If no product with such id is found, an exception is thrown.

```
{
	id: string,
	name: string,
	price: number,
	updateDate: string
}
```

#### POST /products

Endpoint for adding a new product to the database.
**Request body** structure should look like the following. Price needs to be a string convertible to float.

```
{
	name: string,
	price: string,
}
```

**Response body** contains the details of the product saved in the database.

```
{
	id: string,
	name: string,
	price: number,
	updateDate: string
}
```

#### DELETE /products/some-id

Deletes a product. Product id is taken from the route param. If no product with such id is found, an exception is thrown. Returns a JSON object with the details of the deleted product.

```
{
	id: string,
	name: string,
	price: number,
	updateDate: string
}
```

#### PUT /products

Deletes a product. Product id is taken from the route param. If no product with such id is found, an exception is thrown.
**Request body** structure should look like the following. Price needs to be a string convertible to float.

```
{
	id: string,
	name: string,
	price: string,
}
```

**Response body** contains the details of the deleted product.

```
{
	id: string,
	name: string,
	price: number,
	updateDate: string
}
```

#### Custom request body validation error

I have implemented a custom error object, which could be further used on the frontend (form validation). The structure is as follows. Error **property** could be e.g. "price" and the **message** comes from validation, e.g. "price should not be empty"

```
{
    isDtoError: true,
    message: "Invalid data!",
    errors: [
        {
            property: string,
            message: string
        }
    ]
}
```
