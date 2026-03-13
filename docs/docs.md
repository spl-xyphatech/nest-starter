# Coupon Platform API

A promotional coupon platform connecting Customers and Merchants. Coupons are purely promotional (no pricing or payments).

## Overview
- 3 roles: Admin (Web), Merchant (Mobile), Customer (Mobile)
- Admin manages merchants, events, and categories
- Merchants request events and redeem coupons
- Customers browse events and claim coupons

## Tech Stack
- Backend: NestJS + Prisma + PostgreSQL
- Admin: React Web
- Merchant app: React Native
- Customer app: React Native

## Menu List

Admin (Web)
- Login: access admin dashboard
- Merchant List + Detail: approve/reject registrations with reason
- Event List + Create/Edit: manage events and link to merchants
- Event Request List + Detail: review merchant event requests
- Category List + Create/Edit: manage categories

Merchant (Mobile)
- Register + Login: create merchant account and sign in
- Registration Status: view approval status (PENDING/APPROVED/REJECTED)
- Event List + Event Detail: view own events
- Request Event + My Requests: submit and track event requests
- QR Scanner + Redemption Result: redeem customer coupons
- Redemption History: view past redemptions

Customer (Mobile)
- Login / Register: access customer account
- Home (Event Feed): browse events without login
- Event Detail + Claim: view and claim coupons
- Merchant Profile (Photos | Events): view merchant info
- My Coupons: list claimed coupons
- Coupon QR Screen: show QR from coupon UUID

## Modules

- `auth`: authentication flows (signin, validation) and guards
- `users`: user management for base user accounts
- `roles`: role definitions and assignments (ADMIN, MERCHANT, CUSTOMER)
- `permissions`: RBAC permissions (module + action)
- `tags`: manage tags for organizing content
- `categories`: manage categories for merchants and events
- `merchants`: merchant registration, status, and profile data
- `events`: event management and event requests
- `coupons`: coupon issuance, status updates, and redemption

## Core Concepts

Event
- Fields: title, description, category, total qty, per-user claim limit (default 1), start date, expiry date
- Can link to one or multiple merchants
- Admin can create platform-only events (no merchant required)
- Statuses: ACTIVE | INACTIVE | EXPIRED

Coupon
- Each claim creates a unique coupon instance (UUID)
- Claiming is FIFO (first come, first served)
- One coupon can be redeemed only once
- Statuses: CLAIMED | REDEEMED | EXPIRED
- QR code generated on-device from coupon UUID

## Data Models (High Level)
- User: base user (all roles)
- Role: ADMIN, MERCHANT, CUSTOMER
- Permission: RBAC (module + action)
- RolePermission: role to permission mapping
- Customer: extends User (social login info)
- Merchant: extends User (shop info, status, category)
- MerchantImage: multiple images per merchant
- Category: name, description
- Tag: name, description
- Event: title, desc, qty, perUserLimit, expiry, status
- EventMerchant: junction (event <-> merchant)
- EventRequest: merchant request to admin for an event
- Coupon: uuid, eventId, status
- CustomerCoupon: customerId, couponId, claimedAt, redeemedAt

## Enums
- MerchantStatus: PENDING | APPROVED | REJECTED
- EventStatus: ACTIVE | INACTIVE | EXPIRED
- EventRequestStatus: PENDING | APPROVED | REJECTED
- CouponStatus: CLAIMED | REDEEMED | EXPIRED

## Notes
- Coupon claiming must be atomic (prevent race conditions)
- QR generated client-side; no extra API call needed
- Soft delete on all major entities (`deletedAt`)
- All timestamps in UTC (`Timestamptz`)
- Images stored in object storage (e.g., S3)
- Admin verifies merchants manually outside the system
