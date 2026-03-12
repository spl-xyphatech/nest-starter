/*
  Warnings:

  - You are about to drop the `role-permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MerchantStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "EventRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CouponStatus" AS ENUM ('AVAILABLE', 'CLAIMED', 'REDEEMED', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "role-permission" DROP CONSTRAINT "role-permission_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "role-permission" DROP CONSTRAINT "role-permission_role_id_fkey";

-- DropTable
DROP TABLE "role-permission";

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "description" TEXT,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchants" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "address" VARCHAR(512),
    "phone" VARCHAR(20),
    "status" "MerchantStatus" NOT NULL DEFAULT 'PENDING',
    "rejected_reason" TEXT,
    "approved_at" TIMESTAMPTZ(6),
    "approved_by" TEXT,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_images" (
    "id" SERIAL NOT NULL,
    "merchant_id" INTEGER NOT NULL,
    "url" VARCHAR(512) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "merchant_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "social_provider" VARCHAR(50),
    "social_id" VARCHAR(256),
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(64) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(64) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_categories" (
    "id" SERIAL NOT NULL,
    "merchant_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchant_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_tags" (
    "id" SERIAL NOT NULL,
    "merchant_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "created_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchant_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "total_qty" INTEGER NOT NULL,
    "claimed_qty" INTEGER NOT NULL DEFAULT 0,
    "per_user_limit" INTEGER NOT NULL DEFAULT 1,
    "start_at" TIMESTAMPTZ(6) NOT NULL,
    "expired_at" TIMESTAMPTZ(6) NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_admin_event" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_merchants" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "merchant_id" INTEGER NOT NULL,
    "qty_limit" INTEGER,
    "claimed_qty" INTEGER NOT NULL DEFAULT 0,
    "created_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_requests" (
    "id" SERIAL NOT NULL,
    "merchant_id" INTEGER NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "status" "EventRequestStatus" NOT NULL DEFAULT 'PENDING',
    "event_id" INTEGER,
    "rejected_note" TEXT,
    "reviewed_at" TIMESTAMPTZ(6),
    "reviewed_by" TEXT,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "event_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "status" "CouponStatus" NOT NULL DEFAULT 'AVAILABLE',
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_coupons" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "coupon_id" INTEGER NOT NULL,
    "claimed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "redeemed_at" TIMESTAMPTZ(6),
    "redeemed_by" INTEGER,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "customer_coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "merchants_user_id_key" ON "merchants"("user_id");

-- CreateIndex
CREATE INDEX "merchants_name_idx" ON "merchants"("name");

-- CreateIndex
CREATE INDEX "merchants_status_idx" ON "merchants"("status");

-- CreateIndex
CREATE INDEX "merchant_images_merchant_id_idx" ON "merchant_images"("merchant_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_user_id_key" ON "customers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_code_key" ON "categories"("code");

-- CreateIndex
CREATE INDEX "categories_name_idx" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_code_key" ON "tags"("code");

-- CreateIndex
CREATE INDEX "tags_code_idx" ON "tags"("code");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_categories_merchant_id_category_id_key" ON "merchant_categories"("merchant_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_tags_merchant_id_tag_id_key" ON "merchant_tags"("merchant_id", "tag_id");

-- CreateIndex
CREATE INDEX "events_status_idx" ON "events"("status");

-- CreateIndex
CREATE INDEX "events_expired_at_idx" ON "events"("expired_at");

-- CreateIndex
CREATE UNIQUE INDEX "event_merchants_event_id_merchant_id_key" ON "event_merchants"("event_id", "merchant_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_requests_event_id_key" ON "event_requests"("event_id");

-- CreateIndex
CREATE INDEX "event_requests_merchant_id_idx" ON "event_requests"("merchant_id");

-- CreateIndex
CREATE INDEX "event_requests_status_idx" ON "event_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_uuid_key" ON "coupons"("uuid");

-- CreateIndex
CREATE INDEX "coupons_event_id_idx" ON "coupons"("event_id");

-- CreateIndex
CREATE INDEX "coupons_status_idx" ON "coupons"("status");

-- CreateIndex
CREATE UNIQUE INDEX "customer_coupons_coupon_id_key" ON "customer_coupons"("coupon_id");

-- CreateIndex
CREATE INDEX "customer_coupons_customer_id_idx" ON "customer_coupons"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_coupons_customer_id_coupon_id_key" ON "customer_coupons"("customer_id", "coupon_id");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchants" ADD CONSTRAINT "merchants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_images" ADD CONSTRAINT "merchant_images_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_categories" ADD CONSTRAINT "merchant_categories_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_categories" ADD CONSTRAINT "merchant_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_tags" ADD CONSTRAINT "merchant_tags_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_tags" ADD CONSTRAINT "merchant_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_merchants" ADD CONSTRAINT "event_merchants_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_merchants" ADD CONSTRAINT "event_merchants_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_requests" ADD CONSTRAINT "event_requests_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_requests" ADD CONSTRAINT "event_requests_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_coupons" ADD CONSTRAINT "customer_coupons_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_coupons" ADD CONSTRAINT "customer_coupons_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
