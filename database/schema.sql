set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.

drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."accounts" (
	"accountId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "accounts_pk" PRIMARY KEY ("accountId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."favorites" (
	"restaurantId" TEXT NOT NULL UNIQUE,
	"accountId" int NOT NULL UNIQUE
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."roulette" (
	"restaurantId" TEXT NOT NULL UNIQUE,
	"accountId" int NOT NULL UNIQUE
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."restaurants" (
	"restaurantId" TEXT NOT NULL UNIQUE,
	"details" json NOT NULL,
	CONSTRAINT "restaurants_pk" PRIMARY KEY ("restaurantId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("restaurantId");
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk1" FOREIGN KEY ("accountId") REFERENCES "accounts"("accountId");

ALTER TABLE "roulette" ADD CONSTRAINT "roulette_fk0" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("restaurantId");
ALTER TABLE "roulette" ADD CONSTRAINT "roulette_fk1" FOREIGN KEY ("accountId") REFERENCES "accounts"("accountId");
