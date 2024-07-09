import json

# Cargar el archivo JSON de Thunder Client
with open('./thunder-collection_Security System.json', 'r') as f:
    thunder_data = json.load(f)

# Estructura básica del archivo JSON de Postman
postman_data = {
    "info": {
        "name": thunder_data["collectionName"],
        "_postman_id": "",
        "description": "",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": []
}

# Convertir carpetas y solicitudes
folders = {folder["_id"]: folder["name"] for folder in thunder_data["folders"]}
for request in thunder_data["requests"]:
    postman_request = {
        "name": request["name"],
        "request": {
            "method": request["method"],
            "header": request["headers"],
            "body": {
                "mode": "raw",
                "raw": request["body"]["raw"] if "body" in request else ""
            },
            "url": {
                "raw": request["url"],
                "protocol": request["url"].split("://")[0],
                "host": [request["url"].split("://")[1].split("/")[0]],
                "path": request["url"].split("://")[1].split("/")[1:]
            }
        },
        "response": []
    }

    folder_name = folders.get(request["containerId"], None)
    if folder_name:
        folder_item = next((item for item in postman_data["item"] if item["name"] == folder_name), None)
        if not folder_item:
            folder_item = {"name": folder_name, "item": []}
            postman_data["item"].append(folder_item)
        folder_item["item"].append(postman_request)
    else:
        postman_data["item"].append(postman_request)

# Guardar el archivo JSON de Postman
with open('postman-collection.json', 'w') as f:
    json.dump(postman_data, f, indent=4)

print("Conversion completed. File saved as 'postman-collection.json'.")
