The folling is the current store state being used
-
```json
"Redux-Store-State": {
    "Customers": {[
        "id": {
            "name": "Firstname Lastname",
            "vaultList": ["vaultId1", "vaultId2"],
            // "orderList": ["orderId1", "orderId2"] future
        }
    ]},
    "Fields": {[
        "id": {
            "name": "fieldName",
            "type": "vault", //or "couchbox-T" or "couchbox-B" or Stage
            "vaultList": ["vaultId1", "vaultId2"],
            "warehouseId": "warehouseId1",
            "full": false
        }
    ]},
    "Orders": {[
        "orderName": {
    //         // "customerId": "1234", future
            "warehouseIds": ["warehouseId1"],
            "fieldIds": ["fieldId1"],
            "vaultIds": ["vaultId1"] //There can be multiple vaults for a single order
        }
    ]},
    "Search": [], //Populates as the user searches
    "Session": { //Session User information (logged In or Out)
        "user": {
            "id": "1234",
            "userName": "User Name",
            "email": "test@gmail.com",
        }
    },
    "Vaults": {[
        "id": {
            "name": "vault name",
            "type": "standard", //or tall only if field-type is a vault
            "orderName": "ABC123", // or null
            "fieldId": "321", // or null
            "customerId": "1234",
            "attachments": ["attachment1", "attachment2"]
        }
    ]},
    "Stage": ["vaultId1", "vaultId2"],
    "Warehouses": {[
        "id": {
            "name": "Warehouse name",
            "rows": 3,
            "cols": 3,
            "fields": [
                "fieldId1",
                "fieldId2",
                "fieldId3",
                "fieldId9",
            ],
            "vaults": ["vaultId1", "vaultId2"]
        }
    ]}
}

```