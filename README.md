# DDB Back End Developer Challenge

### This repository contains my implementation of the [DDB Back-End Developer Challenge](https://github.com/DnDBeyond/back-end-developer-challenge). 

# Stack
- Node.js
- Express.js
- Typescript
- MongoDB

# Run Application Locally
1. Clone the repository:
```bash
git clone https://github.com/EkaterinaGorbunova/dndbeyond-backend-challenge.git
```

2. Install dependencies:
```bash
npm install
```

3. Add the environment configuration:

    Create a `.env` file with your `MONGODB_URI` to connect to the database.

4. Start the server:
```bash
npm start
```

# Character Routes

These endpoints are used to interact with character resources in the application:

| HTTP Method | Endpoint                          | Description                                      |
|-------------|-----------------------------------|--------------------------------------------------|
| GET         | `http://localhost:3000/character/:characterId`    | Fetch character details by ID.                  |
| POST        | `http://localhost:3000/character/deal-damage/:characterId` | Apply damage to the specified character.        |
| POST        | `http://localhost:3000/character/heal/:characterId` | Heal the specified character.                   |
| POST        | `http://localhost:3000/character/add-temporary-hp/:characterId` | Add temporary Hit Points to the specified character. |

# Test the API

You can use [Postman](https://www.postman.com) to test API endpoints.
    
### Request examples:
1. Fetch character details by ID: 
    - Endpoint: http://localhost:3000/character/briv

2. Apply damage to the specified character:
    - Endpoint: http://localhost:3000/character/deal-damage/briv
    - Example Request body:
    ```JSON
      {
        "damageType": "cold",
        "damageAmount": 10
      }
    ```
3. Heal the specified character:
    - Endpoint: http://localhost:3000/character/heal/briv
    - Example Request body:
    ```JSON
      {
        "healAmount": 20
      }
    ```
4. Add temporary Hit Points to the specified character:

    - Endpoint: http://localhost:3000/character/add-temporary-hp/briv
    - Example Request body:
    ```JSON
      {
        "temporaryHpAmount": 5
      }
    ```





