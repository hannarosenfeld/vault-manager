The folling is the current store state being used
-
```json
"Redux-Store-State": {
    "Customers": {
        "name": {
            "id": 1,
            "vaults": [1, 2], //Vaults by Ids
            // "order": [1,2] Orders by Ids future
        }
    },
    "Fields": {
        "id": {
            "name": "fieldName",
            "type": "vault", //or "couchbox-T" or "couchbox-B" or Stage
            "position": {
                "top": ,
                "upperMid": ,
                "lowerMid": 1,
                "bottom": 2,
            }, //Vault Ids
            "warehouseId": 1,
            "full": false
        }
    },
    "Orders": {
        "name": {
            "id": 1,
            // "customerId": "1234", future
            "warehouses": [1], //Warehouse by Ids
            "fields": [1], //Fields by Ids
            "vaults": [1, 2], //Vaults by ids //There can be multiple vaults for a single order
        }
    },
    "Search": [], //Populates as the user searches
    "Session": { //Session User information (logged In or Out)
        "user": {
            "id": 1234,
            "userName": "User Name",
            "email": "test@gmail.com",
        }
    },
    "Vaults": {
        "id": {
            "name": "vault name",
            "type": "standard", //or tall only if field-type is a vault
            "orderName": "ABC123", // or null
            "fieldId": 321, // or null
            "customerId": 1234,
            "attachments": [1, 2] // Attachments by Ids
        }
    },
    "Attachments": {
        "id": {
            "vaultId": 1,
            "fileUrl": "url.jpg",
            "fileName": "file name",
            "uniqueName": "unique name"
        }
    },
    "Stage": [1, 2], //Vaults by Ids
    "Warehouses": {
        "id": {
            "name": "Warehouse name",
            "rows": 3,
            "cols": 3,
            "fields": [1,2,3,9], //Fields by Ids
            // "vaults": [1, 2] //Vaults by Ids
        }
    }
}

```