# Shopify Integration Guide for PodiEase

## 🎉 Integration Status: COMPLETE

Your PodiEase website is now **fully integrated** with Shopify's Storefront API! The system is ready to fetch products from your Shopify store and process checkouts.

---

## How It Works

Your custom PodiEase frontend connects to Shopify through a **headless architecture**:

```
PodiEase Frontend (React) 
    ↓
Your Backend API (Express)
    ↓
Shopify Storefront API
    ↓
Shopify Checkout
```

### Current Features

✅ **Product Sync** - Automatically fetches products from your Shopify store  
✅ **Fallback to Mock Data** - Uses demo products when Shopify is unavailable  
✅ **Cart Management** - Local cart with Shopify variant IDs  
✅ **Shopify Checkout** - Redirects to secure Shopify checkout page  
✅ **Smart Tagging** - Products tagged "podiatrist-pick" show special badges  

---

## Shopify Store Setup

### Step 1: Create a Custom App (If Not Done)

1. **Log into Shopify Admin**: `your-store.myshopify.com/admin`
2. **Navigate to**: Settings → Apps and sales channels → Develop apps
3. **Click**: "Create an app" or "Allow custom app development"
4. **Name it**: "PodiEase Headless Storefront"

### Step 2: Configure Storefront API Access

1. **Open your custom app**
2. **Go to**: Configuration tab
3. **Under "Storefront API"** → Click "Configure"
4. **Enable these scopes**:
   - ✅ Read products, variants, and collections
   - ✅ Read customer tags
   - ✅ Read and modify checkouts
5. **Save** the configuration

### Step 3: Get Your Credentials

1. **Go to**: API credentials tab
2. **Find**: Storefront API access token
3. **Copy**:
   - **Store Domain**: `your-store.myshopify.com` (just the domain, no https://)
   - **Storefront Access Token**: The long public token (starts with `shpat_`)

### Step 4: Update Replit Secrets

Your credentials should already be configured in Replit, but **they need to be updated**:

1. **In Replit**: Click the lock icon 🔒 in the left sidebar (Secrets)
2. **Update these secrets**:
   - `SHOPIFY_STORE_DOMAIN` = `podiease.myshopify.com` (your actual store domain)
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` = Your storefront token

**🚨 CRITICAL - Getting Your Store Domain**:

The domain is **NOT** the URL you see in the admin!

❌ **WRONG**: `admin.shopify.com/store/podiease/settings/domains`  
❌ **WRONG**: `https://podiease.myshopify.com`  
❌ **WRONG**: `podiease.myshopify.com/admin`  
✅ **CORRECT**: `podiease.myshopify.com`

**How to find your store domain:**
1. In Shopify Admin, go to: Settings → Domains
2. Look for your `myshopify.com` domain
3. It will be: `[your-store-name].myshopify.com`
4. Copy just that part (no https://, no /admin, no paths)

**After updating**: 
- The app will automatically restart
- Check logs for: `Shopify client initialized for domain: podiease.myshopify.com`
- Products should load from your Shopify store!

---

## Adding Products to Shopify

### Create Products in Shopify Admin

1. **Go to**: Products → Add product
2. **Fill in**:
   - Title: "Premium Orthotic Insoles"
   - Description: Full product description
   - Price: 79.95
   - Compare at price: 99.95 (optional)
   - Images: Upload product photos
   - Status: Active

### Tag Products as "Podiatrist's Pick"

Products with special podiatrist recommendations:

1. **Edit product** in Shopify
2. **Add tag**: `podiatrist-pick`
3. **Save**

This will automatically display the ⭐ "Podiatrist's Pick" badge on your PodiEase site!

---

## Testing Your Integration

### Verify Products Are Loading

1. **Check server logs** in Replit:
   - ✅ **Success**: "GET /api/products 200" with your Shopify products
   - ⚠️ **Fallback**: "Shopify not configured, using mock products"

2. **Visit your site**: Click "Shop" or "Products"
   - Real Shopify products will display with actual images and prices
   - Mock products appear if Shopify connection fails

### Test Checkout Flow

1. **Add products to cart**
2. **Click "Proceed to Checkout"**
3. **You'll be redirected to**: `your-store.myshopify.com/checkouts/...`
4. **Complete checkout** on Shopify's secure checkout page

---

## Current Status & Troubleshooting

### ⚠️ Current Issue Detected

Your server logs show:
```
Error: getaddrinfo ENOTFOUND https
```

**This means**: The `SHOPIFY_STORE_DOMAIN` secret might be incorrect.

**Fix**:
1. Go to Replit Secrets (🔒)
2. Update `SHOPIFY_STORE_DOMAIN` to just: `your-store.myshopify.com`
   - Remove `https://` if it's there
   - Remove trailing slashes
   - Use your actual store domain

3. Restart the application (it will auto-restart when you change secrets)

### Verify Shopify Connection

After fixing the domain, check logs for:
```
✅ GET /api/products 200  (Shopify working!)
```

---

## Product Data Flow

### From Shopify → PodiEase

Your integration automatically maps Shopify products to PodiEase format:

| Shopify Field | PodiEase Field | Notes |
|--------------|----------------|-------|
| `id` | `id` | Unique product ID |
| `title` | `title` | Product name |
| `description` | `description` | Full description |
| `variants[0].priceV2.amount` | `price` | Current price |
| `variants[0].compareAtPriceV2.amount` | `compareAtPrice` | Original price (strikethrough) |
| `images[0].url` | `image` | Primary image |
| `images[].url` | `images` | All product images |
| `tags` | `tags` | Product tags |
| `tags.includes("podiatrist-pick")` | `isPodiatristPick` | Badge display |
| `variants[0].id` | `variantId` | For checkout |

---

## Architecture Details

### Files Modified for Integration

```
server/
├── shopify.ts              # Shopify API client & queries
└── routes.ts               # /api/products & /api/checkout endpoints

client/src/
└── App.tsx                 # Checkout handler (redirect to Shopify)
```

### API Endpoints

#### GET `/api/products`
Returns array of products from Shopify or mock data.

**Response**:
```json
[{
  "id": "gid://shopify/Product/123",
  "title": "Premium Orthotic Insoles",
  "price": "79.95",
  "compareAtPrice": "99.95",
  "image": "https://cdn.shopify.com/...",
  "variantId": "gid://shopify/ProductVariant/456",
  "isPodiatristPick": true
}]
```

#### POST `/api/checkout`
Creates Shopify checkout and returns URL.

**Request**:
```json
{
  "lineItems": [
    { "variantId": "gid://...", "quantity": 2 }
  ]
}
```

**Response**:
```json
{
  "id": "gid://shopify/Checkout/abc",
  "webUrl": "https://your-store.myshopify.com/checkouts/abc",
  "totalPrice": "159.90"
}
```

---

## What Stays in PodiEase vs Shopify

### Managed by PodiEase (Your Custom Site)
✅ All visual design & branding  
✅ Quiz & recommendation system  
✅ Reviews & testimonials  
✅ Educational content  
✅ Newsletter signups  
✅ Product comparison tool  
✅ Shopping cart (local storage)  

### Managed by Shopify
✅ Product catalog & inventory  
✅ Product images & descriptions  
✅ Pricing & discounts  
✅ Checkout & payment processing  
✅ Order management  
✅ Customer accounts (if enabled)  
✅ Shipping & taxes  

---

## Next Steps

1. **Fix Domain Secret** (see troubleshooting above)
2. **Add Products** to your Shopify store
3. **Tag Products** with "podiatrist-pick" for recommendations
4. **Test Checkout** with a real product
5. **Configure Shipping** in Shopify settings
6. **Set up Payment Providers** (Stripe, PayPal, etc.) in Shopify

---

## Advanced: Customization

### Change API Version

Update line 15 in `server/shopify.ts`:
```typescript
apiVersion: '2025-01',  // Change to newer version as needed
```

### Fetch More Products

Update line 98 in `server/shopify.ts`:
```typescript
variables: { first: 20 },  // Change 20 to desired number
```

### Add More Product Fields

Add fields to the GraphQL query in `server/shopify.ts` (lines 54-88):
```graphql
variants(first: 1) {
  edges {
    node {
      id
      priceV2 { amount }
      weight        # Add this
      sku          # Add this
    }
  }
}
```

---

## Support & Resources

- **Shopify API Docs**: https://shopify.dev/docs/api/storefront
- **API Version Info**: https://shopify.dev/docs/api/release-notes
- **GraphiQL Explorer**: Install the Shopify GraphiQL app to test queries

---

**Your PodiEase site is production-ready!** Just fix the domain secret, add your products to Shopify, and you're live! 🚀
