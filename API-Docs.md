This is the documentation for all api routes and responses

/warehouses
* `/warehouses`
    * `GET /{user_id}`
        * Purpose: Get all warehouses by user_id
        * Return:         
        ```json 
            {"warehouses": [
                {
                    "name": "Warehouse1 name", 
                    "rows": 3, 
                    "cols": 3, 
                    "fields": [4,5,6,7]
                },
                {
                    "name": "Warehouse2 name", 
                    "rows": 3, 
                    "cols": 3, 
                    "fields": [1,2,3,9]
                }
            ]}
        ```
    <!-- * `GET /order/{order_id}`
        * Purpose: Get all warehouses by user_id
        * Return:         
        ```json 
            {"warehouses": [
                {
                    "name": "Warehouse1 name", 
                    "rows": 3, 
                    "cols": 3, 
                    "fields": [4,5,6,7]
                },
                {
                    "name": "Warehouse2 name", 
                    "rows": 3, 
                    "cols": 3, 
                    "fields": [1,2,3,9]
                }
            ]}
        ``` -->
    * `POST /{user_id}`
        * Purpose: Post new Warehouse by user_id
        * Body:
        ```json 
            {
                "name": "Warehouse name", 
                "rows": 3, 
                "cols": 3
            }
        ``` 
        * Return: 
        ```json 
            {
                "name": "Warehouse name", 
                "rows": 3, 
                "cols": 3, 
                "fields": [1,2,3,4,5,6,7,8,9]
            }
        ```
    * `PUT /{warehouse_id}`
        * Purpose: Edit a warehouse by warehouse_id
        * Body:
        ```json 
            {
                "name": "Warehouse name", 
                "rows": 3, 
                "cols": 3
            }
        ```
        * Return
        ```json 
            {
                "name": "Warehouse name", 
                "rows": 3, 
                "cols": 3, 
                "fields": [1,2,3,9]
            }
        ```
    * `DELETE /{warehouse_id}`
        * Purpose: Delete warehouse by warehouse_id
        * Return: `{'message': 'Successfully deleted the warehouse!'}`


-Delete field by fieldId
* `/fields`
    * `GET /{warehouse_id}`
        * Purpose: Get all fields by warehouse_id
        * Return:         
        ```json 
            {"fields": [
                { 
                    "id": 1,
                    "name": "fieldName",
                    "type": "vault", //or "couchbox-T" or "couchbox-B" or Stage
                    "vaults": [1, 2], //Vaults by Ids
                    "warehouseId": 1,
                    "full": false
                }
            ]}
        ```
    <!-- * `POST /{user_id}`
        * Purpose: Create a new field by warehouse_id
        * Body:
        ```json 
            {
                "name": "fieldName",
                "type": "vault", //or "couchbox-T" or "couchbox-B" or Stage
                "vaults": [], //Vaults by Ids
                "warehouseId": 1,
                "full": false
            }
        ```        
        * Return: 
        ```json 
            {
                "id": {
                    "name": "fieldName",
                    "type": "vault", //or "couchbox-T" or "couchbox-B" or Stage
                    "vaults": [], //Vaults by Ids
                    "warehouseId": 1,
                    "full": false
                }
            }
        ``` -->
    * `PUT /{field_id}`
        * Purpose: Edit a field by field_id
        * Body: 
        ```json 
            {
                "name": "fieldName",
                "type": "vault", //or "couchbox-T" or "couchbox-B" or Stage
                "vaults": [1, 2], //Vaults by Ids
                "full": false
            }
        ```
        * Return
        ```json 
            {
                "id": {
                    "name": "fieldName",
                    "type": "vault", //or "couchbox-T" or "couchbox-B" or Stage
                    "vaults": [1, 2], //Vaults by Ids
                    "warehouseId": 1,
                    "full": false
                }
            }
        ```
    <!-- * `DELETE /{field_id}`
        * Purpose: Delete a field by field_id
        * Return: `{'message': 'Successfully deleted the field!'}` -->


* `/vaults`
    * `GET /`
        * Purpose: Get all vaults by warehouse_id and field_id is not None (Get all vaults in a specific warehouse)
        * Return:         
        ```json 
            {"vaults": [
                {
                    "name": "Vault1 name",
                    "type": "standard", //or tall only if field-type is a vault
                    "orderName": "ABC123", // or null
                    "fieldId": 321, // or null
                    "position": "bottom",
                    "customerId": 1234,
                    "attachments": ["attachment1", "attachment2"]
                },
                {

                    "name": "Vault2 name",
                    "type": "standard", //or tall only if field-type is a vault
                    "orderName": "ABC123", // or null
                    "fieldId": 321, // or null
                    "position": "lowerMid",
                    "customerId": 1234,
                    "attachments": ["attachment3", "attachment4"]
                }
            ]}
        ```
    * `GET /staged`
        * Purpose: Get all vaults by field_id is None (Get all staged vaults)
        * Return:         
        ```json 
            {"vaults": [
                {
                    "id": 1,
                    "name": "Vault1 name",
                    "type": "standard", //or tall only if field-type is a vault
                    "orderName": "ABC123", // or null
                    "fieldId": null, // or null
                    "position": null,
                    "customerId": 1234,
                    "attachments": ["attachment1", "attachment2"]
                },
                {
                    "id": 2,                    
                    "name": "Vault2 name",
                    "type": "standard", //or tall only if field-type is a vault
                    "orderName": "ABC123", // or null
                    "fieldId": null, // or null
                    "position": null,
                    "customerId": 1234,
                    "attachments": ["attachment3", "attachment4"]
                }
            ]}
        ```
    * `POST /{user_id}`
        * Purpose: Post new vault by user_id
        * Body: 
        ```json
            {
                "name": "vault name",
                "type": "standard", //or tall only if field-type is a vault
                "orderName": "ABC123", // or null
                "fieldId": 321, // or null
                "position": "upperMid",
                "customerId": 1234,
                "warehouseId": 1,
                "attachments": ["attachment1", "attachment2"]
            }
        ```
        * Return: 
        ```json 
            {
                "name": "vault name",
                "type": "standard", //or tall only if field-type is a vault
                "orderName": "ABC123", // or null
                "fieldId": 321, // or null
                "position": "upperMid",
                "customerId": 1234,
                "warehouseId": 1,
                "attachments": ["attachment1", "attachment2"]
            }
        ```
    * `PUT /{vault_id}`
        * Purpose: Edit a vault by vault_id
        * Body:
        ```json 
            {
                "name": "vault name",
                "type": "standard", //or tall only if field-type is a vault
                "orderName": "ABC123", // or null
                "fieldId": 321, // or null
                "position": "bottom",
                "customerId": 1234,
                "warehouseId": 1,
                "attachments": [1, 2]
            }
        ```
        * Return
        ```json 
            {
                "name": "vault name",
                "type": "standard", //or tall only if field-type is a vault
                "orderName": "ABC123", // or null
                "fieldId": 321, // or null
                "position": "bottom",
                "customerId": 1234,
                "warehouseId": 1,
                "attachments": [1, 2]
            }
        ```
    * `DELETE /{vault_id}`
        * Purpose: Delete vault by vault_id
        * Return: `{'message': 'Successfully deleted the vault!'}`

* `/customer`
    * `GET /{customer_name}`
        * Purpose: Get customer by customer_name
        * Return:
        ```json
            {
                "id": 1,
                "name": "Firstname Lastname",
                "vaults": [1,2],
                "orders": [1,2],
            }
        ```
    * `POST /`
        * Purpose: Create a new customer
        * Body: 
        ```json
            {
                "name": "Firstname Lastname"
            }
        ```
        * Return:
        ```json
            {
                "name": "Firstname Lastname",
                "vaults": []
            }
        ```

* `/order`
    * `GET /{order_id}`
        * Purpose: Get order by order_name
        * Return:
        ```json
            { "name" : {
                    "id": 1,
                    "warehouses": [1],
                    "fields": [1],
                    "vaults": [1, 2], 
                }
            }
        ```
    * `POST /`
        * Purpose: Create a new order
        * Body:
        ```json
            {
                "name": "order name",
                "warehouseId": 1,
                "fieldId": 1,
                "vaultId": 1
            }
        ```
        * Return:
        ```json
            { "name" : {
                    "id": 1,
                    "warehouses": [1],
                    "fields": [1],
                    "vaults": [1]
                }
            }
        ```

-Get attachments by vaultId
* `/attachment`
    * `GET /`
        * Purpose: Get attachments by vaultId
        * Return:
        ```json
            { 
                "id": 1,
                "vaultId": 1,
                "fileUrl": "url.jpg",
                "fileName": "file name",
                "uniqueName": "unique name"
            }
        ```
    * `Delete /`
        * Purpose: Delete attachments by attachmentId
        * Return: `{'message': 'Successfully deleted the attachment!'}`

