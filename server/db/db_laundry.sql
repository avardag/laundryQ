-- DROP TYPE roles_enum;

CREATE TYPE roles_enum AS ENUM (
	'user',
	'moderator',
	'admin',
	'superuser');

-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	phone varchar(255) NULL,
	"password" varchar(255) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	is_activated bool NULL DEFAULT false,
	activation_link varchar(255) NULL,
	"role" roles_enum NULL DEFAULT 'user'::roles_enum,
	city varchar(32) NOT NULL,
	address text NOT NULL,
	laundry_id int4 NULL,
	postcode varchar(6) NOT NULL,
	CONSTRAINT users_email_unique UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- public.laundries definition

-- Drop table

-- DROP TABLE public.laundries;

CREATE TABLE public.laundries (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	address text NOT NULL,
	phone varchar(12) NULL,
	city varchar(32) NOT NULL,
	postcode varchar(6) NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	admin_id int4 NULL,
	is_active bool NULL DEFAULT false,
	CONSTRAINT laundries_pkey PRIMARY KEY (id)
);


-- public.laundries foreign keys

ALTER TABLE public.laundries ADD CONSTRAINT laundries_admin_id_foreign FOREIGN KEY (admin_id) REFERENCES public.users(id) ON DELETE SET NULL;

-- public.users foreign keys

ALTER TABLE public.users ADD CONSTRAINT users_laundry_id_foreign FOREIGN KEY (laundry_id) REFERENCES public.laundries(id);

-- public.bookings definition

-- Drop table

-- DROP TABLE public.bookings;

CREATE TABLE public.bookings (
	id serial4 NOT NULL,
	pin varchar(6) NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	machine_id int4 NULL,
	user_id int4 NULL,
	datetime_from timestamptz NOT NULL,
	datetime_till timestamptz NOT NULL,
	CONSTRAINT bookings_pkey PRIMARY KEY (id)
);

-- public.machines definition

-- Drop table

-- DROP TABLE public.machines;

CREATE TABLE public.machines (
	id serial4 NOT NULL,
	"size" int4 NOT NULL,
	"number" int4 NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	laundry_id int4 NULL,
	CONSTRAINT machines_pkey PRIMARY KEY (id)
);


-- public.machines foreign keys

ALTER TABLE public.machines ADD CONSTRAINT machines_laundry_id_foreign FOREIGN KEY (laundry_id) REFERENCES public.laundries(id) ON DELETE CASCADE;

-- public.bookings foreign keys

ALTER TABLE public.bookings ADD CONSTRAINT bookings_machine_id_foreign FOREIGN KEY (machine_id) REFERENCES public.machines(id);
ALTER TABLE public.bookings ADD CONSTRAINT bookings_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- public.tokens definition

-- Drop table

-- DROP TABLE public.tokens;

CREATE TABLE public.tokens (
	id serial4 NOT NULL,
	refresh_token text NOT NULL,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_id int4 NULL,
	CONSTRAINT tokens_pkey PRIMARY KEY (id)
);


-- public.tokens foreign keys

ALTER TABLE public.tokens ADD CONSTRAINT tokens_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-------------------------------------------------------------------------------------------------------------------------------------------
select * from users;
select * from tokens;
select * from laundries;
select * from machines;
select * from bookings;

--delete from users where id<2;
