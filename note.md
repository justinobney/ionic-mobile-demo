# Turner Demo App Notes

## Profile

* Name
* Email
* Phone #
* Location
* DeviceId

## Categories

* Name

## Notifications

* CategoryId
* Profile Id
* Location (center)

## Openings

* Category
* Location
* Description (center)

### Add Opening

```js
=> POST '/opening' ::: {categoryId, location, description}
=> GET '/notification/categoryId' in radius
```

## Commands

`ionic config set dev_push true|false`

