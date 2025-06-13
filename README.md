# Product Stock Watcher Backend

## Setup Instructions
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file using `.env.example`
4. Run `node index.js`

## API Endpoints
- `POST /api/products/subscribe` { email, productId }
- `PUT /api/products/update-stock/:productId` { stock }
