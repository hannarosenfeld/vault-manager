--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7 (Debian 15.7-1.pgdg110+1)
-- Dumped by pg_dump version 15.7 (Debian 15.7-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouses" DROP CONSTRAINT IF EXISTS "warehouses_company_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouse_users" DROP CONSTRAINT IF EXISTS "warehouse_users_warehouse_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouse_users" DROP CONSTRAINT IF EXISTS "warehouse_users_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouse_orders" DROP CONSTRAINT IF EXISTS "warehouse_orders_warehouse_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouse_orders" DROP CONSTRAINT IF EXISTS "warehouse_orders_order_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."vaults" DROP CONSTRAINT IF EXISTS "vaults_order_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."vaults" DROP CONSTRAINT IF EXISTS "vaults_field_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."vaults" DROP CONSTRAINT IF EXISTS "vaults_customer_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."users" DROP CONSTRAINT IF EXISTS "users_company_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."orders" DROP CONSTRAINT IF EXISTS "orders_company_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."fields" DROP CONSTRAINT IF EXISTS "fields_warehouse_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."field_orders" DROP CONSTRAINT IF EXISTS "field_orders_order_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."field_orders" DROP CONSTRAINT IF EXISTS "field_orders_field_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."company_customers" DROP CONSTRAINT IF EXISTS "company_customers_customer_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."company_customers" DROP CONSTRAINT IF EXISTS "company_customers_company_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."attachments" DROP CONSTRAINT IF EXISTS "attachments_vault_id_fkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouses" DROP CONSTRAINT IF EXISTS "warehouses_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouses" DROP CONSTRAINT IF EXISTS "warehouses_name_key";
ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouse_users" DROP CONSTRAINT IF EXISTS "warehouse_users_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."warehouse_orders" DROP CONSTRAINT IF EXISTS "warehouse_orders_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."vaults" DROP CONSTRAINT IF EXISTS "vaults_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."users" DROP CONSTRAINT IF EXISTS "users_username_key";
ALTER TABLE IF EXISTS ONLY "vault_manager"."users" DROP CONSTRAINT IF EXISTS "users_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."users" DROP CONSTRAINT IF EXISTS "users_email_key";
ALTER TABLE IF EXISTS ONLY "vault_manager"."orders" DROP CONSTRAINT IF EXISTS "orders_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."fields" DROP CONSTRAINT IF EXISTS "fields_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."field_orders" DROP CONSTRAINT IF EXISTS "field_orders_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."customers" DROP CONSTRAINT IF EXISTS "customers_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."company_customers" DROP CONSTRAINT IF EXISTS "company_customers_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."companies" DROP CONSTRAINT IF EXISTS "companies_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."attachments" DROP CONSTRAINT IF EXISTS "attachments_pkey";
ALTER TABLE IF EXISTS ONLY "vault_manager"."alembic_version" DROP CONSTRAINT IF EXISTS "alembic_version_pkc";
ALTER TABLE IF EXISTS "vault_manager"."warehouses" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "vault_manager"."vaults" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "vault_manager"."users" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "vault_manager"."orders" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "vault_manager"."fields" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "vault_manager"."customers" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "vault_manager"."companies" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "vault_manager"."attachments" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE IF EXISTS "vault_manager"."warehouses_id_seq";
DROP TABLE IF EXISTS "vault_manager"."warehouses";
DROP TABLE IF EXISTS "vault_manager"."warehouse_users";
DROP TABLE IF EXISTS "vault_manager"."warehouse_orders";
DROP SEQUENCE IF EXISTS "vault_manager"."vaults_id_seq";
DROP TABLE IF EXISTS "vault_manager"."vaults";
DROP SEQUENCE IF EXISTS "vault_manager"."users_id_seq";
DROP TABLE IF EXISTS "vault_manager"."users";
DROP SEQUENCE IF EXISTS "vault_manager"."orders_id_seq";
DROP TABLE IF EXISTS "vault_manager"."orders";
DROP SEQUENCE IF EXISTS "vault_manager"."fields_id_seq";
DROP TABLE IF EXISTS "vault_manager"."fields";
DROP TABLE IF EXISTS "vault_manager"."field_orders";
DROP SEQUENCE IF EXISTS "vault_manager"."customers_id_seq";
DROP TABLE IF EXISTS "vault_manager"."customers";
DROP TABLE IF EXISTS "vault_manager"."company_customers";
DROP SEQUENCE IF EXISTS "vault_manager"."companies_id_seq";
DROP TABLE IF EXISTS "vault_manager"."companies";
DROP SEQUENCE IF EXISTS "vault_manager"."attachments_id_seq";
DROP TABLE IF EXISTS "vault_manager"."attachments";
DROP TABLE IF EXISTS "vault_manager"."alembic_version";
DROP SCHEMA IF EXISTS "vault_manager";
--
-- Name: vault_manager; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "vault_manager";


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: alembic_version; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."alembic_version" (
    "version_num" character varying(32) NOT NULL
);


--
-- Name: attachments; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."attachments" (
    "id" integer NOT NULL,
    "vault_id" integer,
    "file_url" character varying NOT NULL,
    "file_name" character varying NOT NULL,
    "unique_name" character varying NOT NULL
);


--
-- Name: attachments_id_seq; Type: SEQUENCE; Schema: vault_manager; Owner: -
--

CREATE SEQUENCE "vault_manager"."attachments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: vault_manager; Owner: -
--

ALTER SEQUENCE "vault_manager"."attachments_id_seq" OWNED BY "vault_manager"."attachments"."id";


--
-- Name: companies; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."companies" (
    "id" integer NOT NULL,
    "name" character varying(100) NOT NULL,
    "address" character varying,
    "phone" character varying(100),
    "logo" character varying
);


--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: vault_manager; Owner: -
--

CREATE SEQUENCE "vault_manager"."companies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: vault_manager; Owner: -
--

ALTER SEQUENCE "vault_manager"."companies_id_seq" OWNED BY "vault_manager"."companies"."id";


--
-- Name: company_customers; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."company_customers" (
    "customer_id" integer NOT NULL,
    "company_id" integer NOT NULL
);


--
-- Name: customers; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."customers" (
    "id" integer NOT NULL,
    "name" character varying(100)
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: vault_manager; Owner: -
--

CREATE SEQUENCE "vault_manager"."customers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: vault_manager; Owner: -
--

ALTER SEQUENCE "vault_manager"."customers_id_seq" OWNED BY "vault_manager"."customers"."id";


--
-- Name: field_orders; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."field_orders" (
    "order_id" integer NOT NULL,
    "field_id" integer NOT NULL
);


--
-- Name: fields; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."fields" (
    "id" integer NOT NULL,
    "name" character varying(20),
    "type" character varying,
    "full" boolean,
    "warehouse_id" integer
);


--
-- Name: fields_id_seq; Type: SEQUENCE; Schema: vault_manager; Owner: -
--

CREATE SEQUENCE "vault_manager"."fields_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fields_id_seq; Type: SEQUENCE OWNED BY; Schema: vault_manager; Owner: -
--

ALTER SEQUENCE "vault_manager"."fields_id_seq" OWNED BY "vault_manager"."fields"."id";


--
-- Name: orders; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."orders" (
    "id" integer NOT NULL,
    "name" character varying,
    "company_id" integer
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: vault_manager; Owner: -
--

CREATE SEQUENCE "vault_manager"."orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: vault_manager; Owner: -
--

ALTER SEQUENCE "vault_manager"."orders_id_seq" OWNED BY "vault_manager"."orders"."id";


--
-- Name: users; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."users" (
    "id" integer NOT NULL,
    "username" character varying(40) NOT NULL,
    "email" character varying(255) NOT NULL,
    "hashed_password" character varying(255) NOT NULL,
    "company_id" integer
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: vault_manager; Owner: -
--

CREATE SEQUENCE "vault_manager"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: vault_manager; Owner: -
--

ALTER SEQUENCE "vault_manager"."users_id_seq" OWNED BY "vault_manager"."users"."id";


--
-- Name: vaults; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."vaults" (
    "id" integer NOT NULL,
    "name" character varying(100) NOT NULL,
    "field_id" integer,
    "order_id" integer,
    "position" character varying(100),
    "type" character varying,
    "customer_id" integer,
    "note" "text",
    "empty" boolean
);


--
-- Name: vaults_id_seq; Type: SEQUENCE; Schema: vault_manager; Owner: -
--

CREATE SEQUENCE "vault_manager"."vaults_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vaults_id_seq; Type: SEQUENCE OWNED BY; Schema: vault_manager; Owner: -
--

ALTER SEQUENCE "vault_manager"."vaults_id_seq" OWNED BY "vault_manager"."vaults"."id";


--
-- Name: warehouse_orders; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."warehouse_orders" (
    "order_id" integer NOT NULL,
    "warehouse_id" integer NOT NULL
);


--
-- Name: warehouse_users; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."warehouse_users" (
    "user_id" integer NOT NULL,
    "warehouse_id" integer NOT NULL
);


--
-- Name: warehouses; Type: TABLE; Schema: vault_manager; Owner: -
--

CREATE TABLE "vault_manager"."warehouses" (
    "id" integer NOT NULL,
    "name" character varying,
    "rows" integer,
    "cols" integer,
    "address" character varying,
    "company_id" integer
);


--
-- Name: warehouses_id_seq; Type: SEQUENCE; Schema: vault_manager; Owner: -
--

CREATE SEQUENCE "vault_manager"."warehouses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: warehouses_id_seq; Type: SEQUENCE OWNED BY; Schema: vault_manager; Owner: -
--

ALTER SEQUENCE "vault_manager"."warehouses_id_seq" OWNED BY "vault_manager"."warehouses"."id";


--
-- Name: attachments id; Type: DEFAULT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."attachments" ALTER COLUMN "id" SET DEFAULT "nextval"('"vault_manager"."attachments_id_seq"'::"regclass");


--
-- Name: companies id; Type: DEFAULT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."companies" ALTER COLUMN "id" SET DEFAULT "nextval"('"vault_manager"."companies_id_seq"'::"regclass");


--
-- Name: customers id; Type: DEFAULT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."customers" ALTER COLUMN "id" SET DEFAULT "nextval"('"vault_manager"."customers_id_seq"'::"regclass");


--
-- Name: fields id; Type: DEFAULT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."fields" ALTER COLUMN "id" SET DEFAULT "nextval"('"vault_manager"."fields_id_seq"'::"regclass");


--
-- Name: orders id; Type: DEFAULT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."orders" ALTER COLUMN "id" SET DEFAULT "nextval"('"vault_manager"."orders_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"vault_manager"."users_id_seq"'::"regclass");


--
-- Name: vaults id; Type: DEFAULT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."vaults" ALTER COLUMN "id" SET DEFAULT "nextval"('"vault_manager"."vaults_id_seq"'::"regclass");


--
-- Name: warehouses id; Type: DEFAULT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouses" ALTER COLUMN "id" SET DEFAULT "nextval"('"vault_manager"."warehouses_id_seq"'::"regclass");


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."alembic_version" ("version_num") FROM stdin;
0edcb8101bb3
\.


--
-- Data for Name: attachments; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."attachments" ("id", "vault_id", "file_url", "file_name", "unique_name") FROM stdin;
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."companies" ("id", "name", "address", "phone", "logo") FROM stdin;
1	Naglee	1525 Grand Central Ave, Elmira, NY 14901	6077334671	\N
\.


--
-- Data for Name: company_customers; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."company_customers" ("customer_id", "company_id") FROM stdin;
1	1
2	1
3	1
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."customers" ("id", "name") FROM stdin;
1	OFFICE FURNITURE
2	KNOX
3	ZANG
4	TEST
6	GUTHRIE TOWANDA
7	ROSKOW
9	ALLEN
10	RICE
11	PARKHOUSE
12	GRANDT
13	PARK "ALLEN"
14	GOLDBERG
17	PONTICHINE-BAILEY
18	OFFICE ITEMS
19	BERMAN
20	REILLY
21	BAND STUFF
22	CCSS
23	BATZING
36	CORNELL - LR7 LOUNGE
38	CORNELL - SOFAS
45	MOVING PADS
46	J. ZHANG
47	CORNING  STEUBEN DIV BOOKS
48	BUCK(STO)
49	BUCK (ESD)
50	GLASSNAP
51	RUIZ
52	ODONNELL
53	PARKHOUSE SOUTH AFRICA
54	NFA
56	DADONNA
57	EMPTY LIFTVAN
58	LIFTVAN W MATTRESS CARTONS
59	PALLET OF CARDBOARD LIFTVANS
60	EMPTY (T2 CONTAINER)
15	DORM ROOM MOVERS
136	CORNELL  - MATTRESSES
137	CORNELL - DESKS/DRESSER
138	CORNELL BLUE CHAIRS AND SOFA
37	CORNELL - DESKS - 6
61	CHRISTOPHERIAN
62	CHRISTOPHERIAN
63	4
64	EMPTY
65	CORNELL - DRESSERS
66	CORNELL - DESKS
67	null
68	CORNELL - DESKTOPS
69	CORNELL - BLACK CHAIRS
70	CORNELL - NEW DESKS
71	CORNELL - MATTRESSES
72	CORNELL - DESKS (SAVE FOR DENISE)
73	CORNELL - DESKTOPS/COFFEE TABLES
74	CORNELL - DESK CHAIRS
75	CORNELL 
76	CORNELL
77	CORNE.L
78	X
79	CORNELL - WARDROBES
80	CORNELL - DRESSERS/CHAIRS
81	CORNELL - DESKS/DESKTOPS/CHAIRS
84	CORNELL - BED ENDS (KNOB)
85	CORNELL - CHAIRS
86	CORNELL - DESKTOPS (SAVE)
87	CORNELL - DESKS (SAVE)
88	CORNELL - BED ENDS (BOLT-IN)
89	CORNELL - BED ENDS
92	WENDLING
94	SCHOEBERLEIN
95	SINGH
99	JONES
102	CORNELL - MATTRESSES 15
103	CORNELL 15 MATRESS 
104	CORNELL15
105	CORNELL 25 CHAIRS
106	CORNELL 21 TOPS
107	CORNELL 4 WAREDROBES
108	CORNELL 26 CHAIRS
109	CORNELL 18 CHAIRS
110	CORNELL DESK TOPS 25
111	CORNELL 28 DESKT 
112	CORNELL 8 DRESSERS
113	CORNELL 10 DRESSERS 
114	CORNELL 8 DESK 
115	CORNELL 7 DESK 
116	CORNELL MATTRESSES
117	CORNELL  MATTRESSES 
118	CORNELL DESK TOPS 
119	CORNELL- BED ENDS 
120	CORNELL- HEADBOARDS
121	CORNELL- BED ENDS
124	CORNELL CHAIRS
125	CORNELL DESKS
126	CORNELL DRESSERS
127	CORNELL WARDROBES
128	CORNELL DESKTOPS DESKS MATTRESSES
129	CORNELL WARDEOBES
130	CORNELL DRESSERS CHAIRS
131	CORNELL DRESSERS 8
132	CORNELL 6 DRESSERS
133	CORNELL 3 DESK 1 DRESSER
135	CORNELL - DESKTOPS 
139	CORNELL 16 MATRESSES
140	CORNELL 3 WARDR 
141	CORNELL 16 CHAIRS
142	24 DESK TOPS
143	8 CHAIRS 2 TABLES FRAT FU 
144	CORNELL26 DESK TOPS
145	BARDEY
147	16 TOPS
148	8 MATRESS CORNELL
149	9 DRESSERS
150	CORNELL PARTS
151	1 WAREDROBE 2 NS
152	5 DESKS 6 TOPS 2 CHAIRS
153	CORNELL 9 DRESSERS 3 CHAIRS 
154	CORNELL - WARDROBES 4
155	5 DRESSERS
156	8 DRESSERS
157	5 CORNELL DESKS
159	20 DESK TOPS
160	CORNELL 26 DESK 
161	15 DESK 
162	22 DESK 
163	EMP 
164	EMPYY
\.


--
-- Data for Name: field_orders; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."field_orders" ("order_id", "field_id") FROM stdin;
\.


--
-- Data for Name: fields; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."fields" ("id", "name", "type", "full", "warehouse_id") FROM stdin;
530	A1	vault	f	4
531	A2	vault	f	4
474	G5	vault	f	1
475	G6	vault	f	1
476	G7	vault	f	1
493	H12	vault	f	1
477	G8	vault	f	1
478	G9	vault	f	1
479	G10	vault	f	1
480	G11	vault	f	1
481	G12	vault	f	1
482	H1	vault	f	1
483	H2	vault	f	1
470	G1	vault	f	1
471	G2	vault	f	1
472	G3	vault	f	1
473	G4	vault	f	1
484	H3	vault	f	1
485	H4	vault	f	1
486	H5	vault	f	1
487	H6	vault	f	1
488	H7	vault	f	1
489	H8	vault	f	1
490	H9	vault	f	1
491	H10	vault	f	1
532	A3	vault	f	4
533	A4	vault	f	4
534	A5	vault	f	4
535	A6	vault	f	4
536	A7	vault	f	4
537	A8	vault	f	4
492	H11	vault	f	1
160	D1	vault	t	2
161	D2	vault	f	2
162	D3	vault	f	2
163	D4	vault	f	2
164	D5	vault	f	2
165	E1	vault	f	2
166	E2	vault	f	2
167	E3	vault	f	2
168	E4	vault	f	2
169	E5	vault	f	2
29	B5	couchbox-T	f	1
248	F12	vault	f	1
244	B12	vault	f	1
30	B6	couchbox-B	f	1
31	B7	couchbox-T	f	1
32	B8	couchbox-B	f	1
33	B9	couchbox-T	f	1
25	B1	couchbox-T	f	1
26	B2	couchbox-B	f	1
27	B3	couchbox-T	f	1
28	B4	couchbox-B	f	1
518	A1	vault	f	1
519	A2	vault	f	1
520	A3	vault	f	1
521	A4	vault	f	1
522	A5	vault	f	1
523	A6	vault	f	1
524	A7	vault	f	1
525	A8	vault	f	1
526	A9	vault	f	1
527	A10	vault	f	1
528	A11	vault	f	1
529	A12	vault	f	1
514	A5	vault	f	3
515	A6	vault	f	3
516	A7	vault	f	3
517	A8	vault	f	3
510	A1	vault	f	3
511	A2	vault	f	3
512	A3	vault	f	3
513	A4	vault	f	3
288	O7	vault	f	4
289	O8	vault	f	4
268	M3	vault	t	4
282	O1	couchbox-T	t	4
273	M8	vault	t	4
283	O2	couchbox-B	f	4
382	E1	vault	t	4
284	O3	couchbox-T	t	4
285	O4	couchbox-B	f	4
383	E2	vault	t	4
384	E3	vault	t	4
385	E4	vault	t	4
386	E5	vault	t	4
387	E6	vault	t	4
388	E7	vault	t	4
389	E8	vault	t	4
280	N7	vault	f	4
281	N8	vault	f	4
274	N1	vault	f	4
275	N2	vault	f	4
276	N3	vault	f	4
277	N4	vault	f	4
278	N5	vault	f	4
279	N6	vault	f	4
269	M4	vault	t	4
286	O5	couchbox-T	f	4
455	C1	vault	f	5
456	C2	vault	f	5
457	C3	vault	f	5
220	B10	couchbox-B	f	1
75	F3	vault	f	1
79	F7	vault	t	1
80	F8	vault	t	1
287	O6	couchbox-B	f	4
81	F9	vault	t	1
224	F10	vault	t	1
74	F2	vault	f	1
73	F1	vault	f	1
236	B11	vault	f	1
240	F11	vault	f	1
266	M1	vault	t	4
267	M2	vault	t	4
76	F4	vault	t	1
77	F5	vault	t	1
78	F6	vault	t	1
375	F6	vault	t	4
376	F7	vault	t	4
364	H7	vault	t	4
365	H8	vault	t	4
377	F8	vault	t	4
271	M6	vault	t	4
353	G8	vault	t	4
272	M7	vault	t	4
358	H1	vault	t	4
359	H2	vault	t	4
360	H3	vault	t	4
361	H4	vault	t	4
362	H5	vault	t	4
363	H6	vault	t	4
346	G1	vault	t	4
347	G2	vault	t	4
348	G3	vault	t	4
349	G4	vault	t	4
350	G5	vault	t	4
351	G6	vault	t	4
352	G7	vault	t	4
370	F1	vault	t	4
371	F2	vault	t	4
372	F3	vault	t	4
373	F4	vault	t	4
374	F5	vault	t	4
270	M5	vault	t	4
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."orders" ("id", "name", "company_id") FROM stdin;
1	000	1
2	001	1
3	002	1
4	5347	\N
5	78	\N
7	x	\N
8	U901-26-3	\N
9	EMPTY	\N
10	2837	\N
6	TEST	\N
11	911119	\N
12	123	\N
13	X	\N
14	null	\N
15	NONE	\N
16	124	\N
17	1	\N
18	2	\N
19	test	\N
20	X 	\N
21	C	\N
22	D	\N
23	XC	\N
24	Cornell Denise	\N
25	qty 19	\N
26	qty 28	\N
27	18	\N
28	qty- 6	\N
29	qty 8	\N
30	qty 4	\N
31	qty 2	\N
32	qty- 8 desktops / 4 desks / 1 matt	\N
33	qty- 4	\N
34	qty- 6 dressers 11 chairs	\N
35	12	\N
36	Guthrie	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."users" ("id", "username", "email", "hashed_password", "company_id") FROM stdin;
3	HannaRosenfeld	hannazrosenfeld@gmail.com	pbkdf2:sha256:260000$7kFWpeoIqn2dvzaj$c1a3c3623427868cf2e6147a2d9e0d81d3ca0c41f4db06e7c377e4b01321c325	1
4	Warehouse	ian@nagleegroup.com	pbkdf2:sha256:260000$9WHJoITC8HHcOeMj$f2da8da3f6d760e40416f0d46358418b904f970c241668c6131180778d24ead4	1
5	Beau	broskow@nagleegroup.com	pbkdf2:sha256:260000$IwFzOUewfYcQxZnk$abfba2dc88cc815a07b4ab2f3283f3c2ba51089120327aa2f0e275c4ba5d4e50	1
6	Pat	pmarshall@nagleegroup.com	pbkdf2:sha256:260000$Nfg1HuA0xcgwvDnR$99282286fe6ccb3f2c2a210b30a3daa8a1234b893c8b9600334bbaad603ccf46	1
7	admin	operations@nagleegroup.com	pbkdf2:sha256:260000$8RjQ1QKov7H2KRDd$e0fdc0cc12295afe929f2e2ebde9ce6a8c9ec28fd78695abd3b19e74657ed002	1
\.


--
-- Data for Name: vaults; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."vaults" ("id", "name", "field_id", "order_id", "position", "type", "customer_id", "note", "empty") FROM stdin;
548	null	284	14	B	couchbox	89	40 Bed Ends	f
314	9	\N	7	M	S	68	16 Desktops	f
24	468	161	7	M	S	9	\N	\N
167	314	\N	13	B	S	15	\N	\N
549	null	284	14	M	couchbox	84	56 Bed Ends knob style	f
560	1038	\N	13	B	S	71	qty-15	f
550	null	284	14	M2	couchbox	89	38 bolt in\r\n4 uloft	f
551	null	286	14	B	couchbox	89	40 bed ends	f
11	303	\N	7	B	S	6	\N	\N
12	50	\N	7	M	S	6	\N	\N
13	520	\N	7	T	S	6	\N	\N
289	556	\N	7	T	S	73	23 Desktops\r\n3 Coffee Tables	f
559	667	\N	13	M	S	71	qty 15	f
14	319	\N	7	B	S	6	\N	\N
15	343	\N	7	M	S	6	\N	\N
17	346	\N	7	B	S	7	\N	\N
18	348	\N	7	M	S	7	\N	\N
19	729	\N	7	T	S	7	\N	\N
28	53	\N	7	M	S	12	\N	\N
309	318	\N	13	T	S	71	15 Mattresses	f
416	547	374	13	B	S	85	26 Chairs	f
51	551	\N	7	B	S	17	\N	\N
315	42	\N	7	B	S	74	18 Desk Chairs	f
301	324	\N	7	M	S	66	6 Desks	f
821	512	\N	13	T	S	163		f
297	304	\N	7	B	S	66	6 Desks	f
26	339	\N	7	M	S	9	\N	\N
557	1002	\N	13	B	S	71	Qty 15	f
52	333	165	7	B	S	18	\N	\N
53	341	165	7	M	S	18	\N	\N
54	232	165	7	T	S	18	\N	\N
55	34	166	7	B	S	18	\N	\N
56	266	166	7	M	S	3	\N	\N
57	176	166	10	T	S	19	\N	\N
58	336	167	7	B	S	20	\N	\N
59	42	167	7	M	S	21	\N	\N
60	150	167	7	T	S	20	\N	\N
61	314	168	7	B	S	20	\N	\N
62	24	168	7	M	S	22	\N	\N
63	21	168	7	T	S	23	\N	\N
64	40	169	7	B	S	23	\N	\N
65	298	169	7	M	S	23	\N	\N
46	665	\N	7	B	S	17	\N	\N
31	334	\N	7	B	S	13	\N	\N
49	1177	\N	7	M	S	13	\N	\N
48	226	\N	7	M	S	17	\N	\N
422	516	\N	13	B	S	74	25 Chairs	f
30	335	162	7	B	S	13	\N	\N
558	103	\N	13	M	S	71	qty 15	f
824	104	\N	13	B	S	64		f
825	509	\N	13	M	S	64		f
552	059	\N	13	B	S	71	Qty- 15	f
298	356	\N	7	M	S	66	6 Desks	f
826	517	\N	13	B	S	64		f
411	331	\N	13	B	S	71	15 Mattresses	f
310	22	\N	7	B	S	66	6 Desks	f
300	34	\N	7	B	S	71	15 Mattresses	f
311	340	\N	7	B	S	70	6 New Desks	f
290	101	\N	7	B	S	68	28 Desktops	f
413	14	271	13	M	S	86	24 Desktops	f
292	543	\N	14	B	S	67		f
415	644	374	13	M	S	87	6 Desks	f
155	3110	\N	13	B	S	47	\N	\N
827	553	\N	13	M	S	64		f
828	131	\N	13	B	S	64		f
829	543	\N	13	M	S	64		f
152	120	\N	13	B	S	45	\N	\N
8	27	\N	7	B	S	6	\N	\N
421	null	282	14	M	couchbox	84	38 knob style bed ends	f
308	101	\N	7	M	S	71	15 Mattresses	f
312	5	\N	7	B	S	71	15 Mattresses	f
302	53	\N	7	B	S	68	24 Desktops	f
316	517	\N	7	B	S	68	26 Desktops	f
293	508	\N	14	M	S	67		f
158	56	\N	13	T	S	48	\N	\N
419	null	282	14	M2	couchbox	88	62 Bolt in bed ends	f
307	130	\N	7	B	S	71	15 Mattresses	f
153	316	\N	13	M	S	45	\N	\N
420	null	282	13	B	couchbox	89	22 Savoy Bed Ends\r\n12 Uloft bed ends	f
156	26	\N	13	M	S	48	\N	\N
157	282	\N	13	T	S	49	\N	\N
318	7	\N	7	B	S	66	6 Desks	f
319	4	\N	7	M	S	68	26 Desktops	f
161	27	\N	13	B	T	51	\N	\N
162	91	\N	13	M	S	20	\N	\N
163	71	\N	13	B	T	52	\N	\N
164	446	\N	13	M	S	52	\N	\N
165	43	\N	13	M	S	53	\N	\N
563	516	\N	13	B	S	105		f
9	307	\N	7	M	S	6	\N	\N
553	104	\N	13	M	S	71	15 qty	f
554	061	\N	13	M	S	136	Qty-15	f
25	79	\N	7	M	S	10	\N	\N
428	LV	\N	13	T	S	57		f
294	509	\N	14	B	S	67		f
433	LV	\N	14	M	S	57		f
32	310	\N	7	B	S	14	\N	\N
47	76	\N	7	B	S	12	\N	\N
412	550	\N	13	M	S	85	26 Chairs	f
45	546	161	7	B	S	17	\N	\N
44	544	160	7	M	S	17	\N	\N
43	458	160	7	B	S	17	\N	\N
435	LV	\N	14	B	S	57		f
426	LV	\N	13	M	S	57		f
431	LV	\N	14	T	S	57		f
295	533	\N	14	M	S	67		f
102	44	\N	7	M	S	36	\N	\N
425	LV	\N	13	T	S	57		f
430	LV	\N	13	M	S	57		f
432	LV	\N	14	B	S	57		f
427	LV	\N	13	B	S	57		f
429	LV	\N	13	B	S	57		f
434	LV	\N	14	T	S	57		f
313	6	\N	7	M	S	74	20 Desk Chairs	f
27	349	\N	7	T	S	11	\N	\N
29	308	\N	7	B	S	12	\N	\N
414	329	\N	13	T	S	86	21 Desktops	f
822	53	\N	21	B	S	64		f
823	507	\N	13	M	S	64		f
830	561	\N	13	B	S	164		f
668	183	269	21	B	S	103		f
168	17	\N	13	M	T	15	\N	\N
172	null	\N	14	B	couchbox	54	\N	\N
169	545	\N	13	M	S	15	\N	\N
305	17	\N	7	M	S	71	15 Mattresses	f
175	null	\N	14	B	couchbox	56	\N	\N
501	644	\N	14	B	S	95		f
672	42	\N	13	M	S	141		f
357	347	\N	7	B	S	68	25 Desktops	f
367	393	\N	7	B	S	66	6 Desks	f
674	149	\N	13	B	S	37		f
405	345	353	13	M	S	79	4 Wardrobes	f
407	103	\N	13	M	S	79	4 wardrobes	f
209	NA	\N	13	M	S	57	\N	\N
280	323	\N	7	B	S	68	26 Desktops	f
355	319	\N	7	M	S	71	15 Mattresses	f
356	286	\N	7	M	S	71	15 Mattresses	f
362	326	\N	7	B	S	65	9 Dressers	f
284	1	\N	7	M	S	66	6 Desks	f
285	640	\N	7	T	S	66	6 Desks	f
373	2	\N	7	B	S	81	5 Desks\r\n6 Desktops\r\n2 Chairs	f
358	118	\N	7	M	S	79	4 Wardrobes	f
369	107	\N	7	B	S	79	4 Wardrobes	f
282	16	\N	7	B	S	72	6 Desks	f
276	507	\N	7	M	S	68	28 Desktops	f
502	411	\N	14	T	S	95		f
370	305	\N	7	M	S	65	8 Dressers	f
10	255	\N	7	T	S	6	\N	\N
16	529	\N	7	T	S	6	\N	\N
499	683	\N	14	T	S	95		f
500	680	\N	14	M	S	95		f
503	347	\N	14	M	S	95		f
504	632	\N	14	B	S	95		f
363	247	\N	7	M	S	79	4 Wardrobes	f
365	359	\N	7	B	S	79	4 Wardrobes	f
408	296	\N	20	B	S	79		f
364	19	\N	7	T	S	79	4 Wardrobes	f
170	555	\N	13	B	S	15	\N	\N
317	381	\N	7	M	S	71	15 Mattresses	f
564	566	\N	13	M	S	71	Qty 15	f
366	68	\N	7	M	S	66	6 Desks	f
213	NA	\N	13	M	S	57	\N	\N
571	302	266	13	M	S	135	Qty 25	f
567	296	\N	13	B	S	107		f
436	LV	\N	14	B	S	57		f
438	LV	\N	14	M	S	57		f
440	LV	\N	14	T	S	57		f
437	LV	\N	14	B	S	57		f
361	322	\N	7	T	S	79	4 Wardrobes	f
286	510	\N	7	B	S	68	28 Desktops	f
287	75L	\N	7	M	S	66	6 Desks	f
271	3	\N	13	M	S	66	6 Desks	\N
277	149285	\N	7	B	S	66	6 Desks	f
304	561	\N	7	B	S	71	15 Mattresses	f
669	27	269	13	M	S	103		f
670	315	270	13	B	S	103		f
570	302	373	13	M	S	109		f
569	550	375	13	B	S	108		f
568	552	375	13	M	S	79		f
215	NA	\N	13	T	S	57	\N	\N
671	27	270	13	M	S	107		f
566	329	271	13	B	S	106		f
673	1141	272	22	B	S	142		f
675	44	272	13	M	S	143		f
676	323	273	13	B	S	144		f
212	NA	\N	13	T	S	57	\N	\N
208	NA	\N	13	B	S	57	\N	\N
214	NA	\N	13	M	S	57	\N	\N
216	NA	\N	13	T	S	57	\N	\N
756	LIFTVAN	\N	14	B	S	67		f
217	NA	\N	13	B	S	57	\N	\N
219	NA	\N	13	M	S	57	\N	\N
439	LV	\N	14	M	S	57		f
383	465	\N	7	B	S	79	4 Wardrobes	f
574	Sofa	\N	21	\N	S	99		f
224	NA	482	13	B	S	58	\N	\N
223	NA	483	13	B	S	58	\N	\N
222	NA	484	13	B	S	58	\N	\N
221	NA	485	13	B	S	58	\N	\N
384	341	\N	7	M	S	79	4 Wardrobes	f
385	666	\N	7	B	S	66	6 Desks	f
226	NONE	\N	15	B	T	60	\N	\N
227	NONE	\N	15	M	S	60	\N	\N
374	633	\N	7	M	S	79	4 Wardrobes	f
375	309	\N	7	B	S	79	4 Wardrobes	f
376	511	\N	7	M	S	66	6 Desks	f
377	27	\N	7	B	S	66	6 Desks	f
378	238	\N	7	M	S	65	10 Dressers	f
379	635	\N	7	B	S	79	4 Wardrobes	f
380	638	\N	7	M	S	79	4 Wardrobes	f
381	152	\N	7	B	S	65	10 Dressers	f
382	344	\N	7	M	S	79	4 Wardrobes	f
371	34	\N	7	B	S	79	4 Wardrobes	f
389	NA	486	13	B	S	57		f
220	NA	487	13	B	S	58	\N	\N
583	412	370	13	M	S	112		f
173	null	\N	14	M	couchbox	52	\N	\N
774	446	77	13	M	S	52		f
771	27	76	13	B	S	51		f
582	1070	371	13	B	S	114		f
683	null	25	14	M	couchbox	52		f
682	null	25	14	B	couchbox	54		f
685	null	27	14	M	couchbox	56		f
684	null	27	14	B	couchbox	145		f
687	null	29	14	M	couchbox	67		f
686	null	29	14	B	couchbox	95		f
688	null	33	14	B	couchbox	67		f
689	null	31	14	B	couchbox	67		f
34	1223	\N	7	M	S	6	\N	\N
795	807	\N	13	B	S	64		f
475	22	\N	24	B	S	71	15 mattresses	f
581	1005	371	13	M	S	115		f
471	1002	\N	14	T	S	71	15 mattresses	f
580	103	372	13	B	S	114		f
758	LIFT VAN	\N	14	T	S	67		f
579	065	372	13	M	S	113		f
772	91	76	13	M	S	20		f
578	030	373	23	B	S	112		f
681	318	273	13	M	S	102		f
465	566	\N	13	T	S	71		f
469	1014	\N	14	M	S	71	15 mattresses	f
775	95	78	13	B	S	53		f
470	103	\N	14	B	S	71	15 mattresses	f
776	43	78	13	M	S	53		f
698	666	\N	13	B	S	37		f
789	29	\N	13	B	S	64		f
704	118	\N	13	B	S	107		f
695	635	376	13	B	S	107		f
696	638	376	13	M	S	107		f
697	341	377	13	B	S	107		f
790	333	\N	13	M	S	64		f
782	Lift Van	475	14	B	S	67		f
791	175	\N	13	T	S	64		f
792	420	\N	13	B	S	64		f
159	400	\N	13	B	S	50	\N	\N
160	327	\N	13	M	S	50	\N	\N
154	321	\N	13	T	S	46	\N	\N
406	552	\N	13	M	S	79	4 wardrobes	f
166	95	\N	13	B	T	53	\N	\N
699	9	\N	13	M	S	147		f
707	1	382	21	B	S	37		f
716	Loose 	365	13	B	S	151		f
717	309	382	13	M	S	107		f
718	2	383	13	B	S	152		f
793	989	\N	13	M	S	64		f
800	641	\N	13	B	S	64		f
801	120	\N	13	M	S	64		f
478	644	266	7	B	S	68	40 desktops	f
576	553	267	13	M	S	68	qty 26	f
575	471	267	21	B	S	68	qty 28	f
472	61	\N	14	M	S	71	15 mattresses	f
693	511	\N	13	B	S	37		f
702	286	\N	13	B	S	102		f
694	27	\N	13	M	S	37		f
703	347	\N	13	M	S	110		f
708	238	\N	13	B	S	113		f
706	238	\N	13	M	S	113		f
468	1038	\N	7	B	S	71	15 mattresses	f
474	1038	\N	7	B	S	71	15 mattresses	f
719	633	383	13	M	S	107		f
584	1032	370	13	B	S	112		f
720	524	384	13	B	S	153		f
721	34	384	13	M	S	154		f
722	75-L	385	13	B	S	37		f
723	640	385	13	M	S	37		f
724	465	386	13	B	S	107		f
725	22	386	13	M	S	155		f
726	305	387	13	B	S	156		f
727	107	387	13	M	S	107		f
728	127	388	13	B	S	113		f
729	5	388	13	M	S	102		f
710	326	\N	13	M	S	149		f
730	16	389	13	B	S	157		f
711	319	\N	13	B	S	102		f
783	Lift Van	476	14	B	S	67		f
784	Lift Van	477	14	B	S	67		f
467	571	\N	7	M	S	71	15 Mattresses	f
712	247	\N	13	M	S	107		f
680	130	\N	13	M	S	102		f
785	Lift Van	478	14	B	S	67		f
786	Lift Van	479	14	B	S	67		f
787	Lift Van	480	14	B	S	67		f
762	120	73	13	B	S	45		f
763	316	73	13	M	S	45		f
764	321	73	13	T	S	46		f
765	31	74	13	B	S	47		f
766	26	74	21	M	S	48		f
767	282	74	13	T	S	49		f
768	400	75	13	B	S	50		f
769	327	75	21	M	S	50		f
770	36	75	13	T	S	48		f
773	71	77	13	B	S	52		f
476	59	\N	14	B	S	71	15 mattresses	f
473	667	\N	14	T	S	71	15 mattresses	f
691	101	\N	13	B	S	102		f
692	304	\N	13	M	S	37		f
700	324	\N	13	B	S	37		f
701	34	\N	13	M	S	148		f
705	17	\N	13	B	S	139		f
709	322	\N	13	M	S	107		f
713	19	\N	13	B	S	107		f
715	340	\N	13	M	S	37		f
761	Empty lift	\N	13	M	S	78		f
211	NA	\N	13	T	S	57	\N	\N
218	NA	\N	13	B	S	57	\N	\N
759	LIFT VAN	\N	14	M	S	67		f
760	LIFT VAN	\N	14	B	S	67		f
629	empty	\N	14	T	S	60		f
777	LIFT VAN	470	14	B	S	67		f
778	Lift Van	471	14	B	S	67		f
779	Lift Van	472	14	B	S	67		f
780	Lift Van	473	14	B	S	67		f
781	Lift Van	474	14	B	S	67		f
788	Lift Van	481	14	B	S	67		f
714	Skid	\N	13	T	S	150		f
479	1040	\N	14	M	S	71	15 mattresses	f
600	x	\N	27	M	S	124	qty- 18	f
531	749	\N	13	\N	S	95		f
797	438	\N	13	M	S	64		f
530	416	\N	13	\N	S	95		f
798	1022	\N	13	T	S	64		f
525	999	\N	13	M	S	95		f
740	513	\N	13	T	S	64		f
631	363	358	13	B	S	127		f
526	2	\N	13	T	S	95		f
632	555	358	21	M	S	127		f
642	618	\N	21	B	S	103		f
633	17	359	13	B	S	127		f
754	420	\N	13	\N	S	64		f
634	381	359	13	M	S	127		f
635	58	360	13	B	S	127		f
518	650	\N	13	B	S	95		f
519	436	\N	21	M	S	95		f
636	545	360	13	M	S	127		f
637	504	361	13	B	S	129		f
638	37	361	13	M	S	127		f
639	340	362	13	B	S	129		f
755	118	\N	13	M	S	107		f
640	157	\N	13	B	S	138		f
368	127	\N	7	M	S	65	10 Dressers	f
510	34	\N	13	B	S	68		f
587	null	286	14	M	couchbox	119	Bolt-In 62 Qty	f
588	null	286	14	M2	couchbox	120	56 qty	f
589	null	286	14	T	couchbox	121	Bolt-In 62 qty	f
527	4	\N	13	B	S	95		f
520	911	\N	13	T	S	95		f
521	811	\N	13	B	S	95		f
522	571	\N	21	M	S	95		f
523	92	\N	13	T	S	95		f
524	582	\N	21	B	S	95		f
528	83	\N	13	M	S	95		f
643	86	362	13	M	S	127		f
529	266	\N	21	T	S	95		f
602	x	\N	29	M	S	126		f
605	x	\N	30	B	S	127		f
606	x	\N	30	M	S	127		f
653	695	\N	13	B	S	127		f
598	x	\N	25	M	S	124	qty 19	f
737	331	\N	13	T	S	64		f
641	596	\N	21	M	S	139		f
738	28	\N	13	M	S	64		f
611	x	\N	29	M	S	126		f
603	x	\N	30	B	S	127		f
652	624	\N	13	M	S	127		f
739	F28	\N	13	B	S	64		f
532	677	\N	13	B	S	64		f
533	1020	\N	13	M	S	64		f
534	328	\N	13	T	S	64		f
741	306	\N	13	M	S	64		f
742	1014	\N	13	B	S	64		f
620	8	\N	21	B	S	65		f
735	572	\N	13	M	S	64		f
621	593	\N	13	M	S	65	qty 8	f
646	1142	346	13	B	S	127		f
623	69	\N	13	B	S	65	qty 6	f
647	99	363	13	B	S	127		f
624	355	\N	13	M	S	137	3 desks\r\n1 dresser	f
648	314	363	13	M	S	127		f
599	x	\N	26	B	S	124	qty 28	f
616	084	\N	13	B	S	65	qty 10	f
649	425	364	21	B	S	127		f
650	596	346	13	M	S	127		f
651	89	347	13	B	S	127		f
654	572	347	13	M	S	127		f
655	989	348	13	B	S	127		f
656	524	348	13	M	S	127		f
657	618	349	13	B	S	127		f
658	500	349	13	M	S	127		f
659	153	350	13	B	S	127		f
660	1017	350	13	M	S	127		f
661	317	351	13	B	S	129		f
665	320	353	13	B	S	127		f
601	x	\N	28	B	S	125	qty 6	f
662	133	351	13	M	S	127		f
663	1139	352	13	B	S	127		f
664	43	352	13	M	S	140		f
538	132	81	13	M	S	99		f
543	1066	80	13	B	S	99		f
617	1868	\N	21	M	S	65	qty 10	f
536	091	224	13	B	S	99		f
540	153	80	13	M	S	99		f
541	696	79	21	B	S	99		f
618	982	\N	21	B	S	65	qty 10	f
542	643	79	13	M	S	99		f
619	59428	\N	13	M	S	65	qty 10	f
733	393	\N	13	M	S	37		f
539	025	81	13	B	S	99		f
753	989	\N	13	\N	S	64		f
608	x	\N	32	B	S	128	qty- 8 desktops / 4 desks / 1 matt	f
609	x	\N	33	M	S	129	qty- 4	f
610	x	\N	34	B	S	130	qty- 6 dressers 11 chairs	f
731	3	389	13	M	S	37		f
732	344	377	13	M	S	107		f
736	1075	\N	13	B	S	64		f
597	x	\N	14	B	S	124	qty- 20	f
752	1009	\N	13	\N	S	64		f
537	066	224	13	M	S	99		f
794	1009	\N	13	T	S	64		f
386	1141	\N	7	M	S	68	24 Desktops	f
372	524	\N	7	M	S	80	9 Dressers\r\n3 Chairs	f
577	1129	\N	22	\N	S	68	qty 26	f
803	29	\N	13	B	S	64		f
804	1022	\N	13	M	S	64		f
805	109	\N	13	T	S	64		f
802	056	\N	13	T	S	64		f
806	68	\N	13	B	S	37		f
807	359	\N	21	M	S	107		f
808	4	\N	13	B	S	144		f
809	6	\N	13	M	S	74		f
810	7	\N	13	B	S	107		f
811	84	\N	13	M	S	159		f
812	87	\N	13	B	S	139		f
813	105	\N	13	M	S	160		f
814	328	\N	13	B	S	110		f
815	25	\N	21	M	S	142		f
816	342	\N	13	B	S	161		f
817	183	\N	13	M	S	142		f
818	482	\N	13	B	S	162		f
819	20	\N	13	M	S	110		f
820	320	\N	13	B	S	107		f
\.


--
-- Data for Name: warehouse_orders; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."warehouse_orders" ("order_id", "warehouse_id") FROM stdin;
1	1
2	1
3	1
\.


--
-- Data for Name: warehouse_users; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."warehouse_users" ("user_id", "warehouse_id") FROM stdin;
\.


--
-- Data for Name: warehouses; Type: TABLE DATA; Schema: vault_manager; Owner: -
--

COPY "vault_manager"."warehouses" ("id", "name", "rows", "cols", "address", "company_id") FROM stdin;
4	Warehouse 4	8	15	\N	1
2	Warehouse 1	5	5	\N	1
3	Offsite	8	3	\N	1
5	STAGED VAULTS	3	3	\N	1
1	Warehouse 3	12	10	\N	1
\.


--
-- Name: attachments_id_seq; Type: SEQUENCE SET; Schema: vault_manager; Owner: -
--

SELECT pg_catalog.setval('"vault_manager"."attachments_id_seq"', 15, true);


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: vault_manager; Owner: -
--

SELECT pg_catalog.setval('"vault_manager"."companies_id_seq"', 1, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: vault_manager; Owner: -
--

SELECT pg_catalog.setval('"vault_manager"."customers_id_seq"', 164, true);


--
-- Name: fields_id_seq; Type: SEQUENCE SET; Schema: vault_manager; Owner: -
--

SELECT pg_catalog.setval('"vault_manager"."fields_id_seq"', 537, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: vault_manager; Owner: -
--

SELECT pg_catalog.setval('"vault_manager"."orders_id_seq"', 36, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: vault_manager; Owner: -
--

SELECT pg_catalog.setval('"vault_manager"."users_id_seq"', 7, true);


--
-- Name: vaults_id_seq; Type: SEQUENCE SET; Schema: vault_manager; Owner: -
--

SELECT pg_catalog.setval('"vault_manager"."vaults_id_seq"', 830, true);


--
-- Name: warehouses_id_seq; Type: SEQUENCE SET; Schema: vault_manager; Owner: -
--

SELECT pg_catalog.setval('"vault_manager"."warehouses_id_seq"', 5, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."alembic_version"
    ADD CONSTRAINT "alembic_version_pkc" PRIMARY KEY ("version_num");


--
-- Name: attachments attachments_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."attachments"
    ADD CONSTRAINT "attachments_pkey" PRIMARY KEY ("id");


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."companies"
    ADD CONSTRAINT "companies_pkey" PRIMARY KEY ("id");


--
-- Name: company_customers company_customers_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."company_customers"
    ADD CONSTRAINT "company_customers_pkey" PRIMARY KEY ("customer_id", "company_id");


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");


--
-- Name: field_orders field_orders_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."field_orders"
    ADD CONSTRAINT "field_orders_pkey" PRIMARY KEY ("order_id", "field_id");


--
-- Name: fields fields_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."fields"
    ADD CONSTRAINT "fields_pkey" PRIMARY KEY ("id");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("username");


--
-- Name: vaults vaults_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."vaults"
    ADD CONSTRAINT "vaults_pkey" PRIMARY KEY ("id");


--
-- Name: warehouse_orders warehouse_orders_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouse_orders"
    ADD CONSTRAINT "warehouse_orders_pkey" PRIMARY KEY ("order_id", "warehouse_id");


--
-- Name: warehouse_users warehouse_users_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouse_users"
    ADD CONSTRAINT "warehouse_users_pkey" PRIMARY KEY ("user_id", "warehouse_id");


--
-- Name: warehouses warehouses_name_key; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouses"
    ADD CONSTRAINT "warehouses_name_key" UNIQUE ("name");


--
-- Name: warehouses warehouses_pkey; Type: CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouses"
    ADD CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id");


--
-- Name: attachments attachments_vault_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."attachments"
    ADD CONSTRAINT "attachments_vault_id_fkey" FOREIGN KEY ("vault_id") REFERENCES "vault_manager"."vaults"("id") ON DELETE CASCADE;


--
-- Name: company_customers company_customers_company_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."company_customers"
    ADD CONSTRAINT "company_customers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "vault_manager"."companies"("id");


--
-- Name: company_customers company_customers_customer_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."company_customers"
    ADD CONSTRAINT "company_customers_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "vault_manager"."customers"("id");


--
-- Name: field_orders field_orders_field_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."field_orders"
    ADD CONSTRAINT "field_orders_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "vault_manager"."fields"("id");


--
-- Name: field_orders field_orders_order_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."field_orders"
    ADD CONSTRAINT "field_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "vault_manager"."orders"("id");


--
-- Name: fields fields_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."fields"
    ADD CONSTRAINT "fields_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "vault_manager"."warehouses"("id");


--
-- Name: orders orders_company_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."orders"
    ADD CONSTRAINT "orders_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "vault_manager"."companies"("id");


--
-- Name: users users_company_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."users"
    ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "vault_manager"."companies"("id");


--
-- Name: vaults vaults_customer_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."vaults"
    ADD CONSTRAINT "vaults_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "vault_manager"."customers"("id") ON DELETE CASCADE;


--
-- Name: vaults vaults_field_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."vaults"
    ADD CONSTRAINT "vaults_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "vault_manager"."fields"("id") ON DELETE CASCADE;


--
-- Name: vaults vaults_order_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."vaults"
    ADD CONSTRAINT "vaults_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "vault_manager"."orders"("id") ON DELETE CASCADE;


--
-- Name: warehouse_orders warehouse_orders_order_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouse_orders"
    ADD CONSTRAINT "warehouse_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "vault_manager"."orders"("id");


--
-- Name: warehouse_orders warehouse_orders_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouse_orders"
    ADD CONSTRAINT "warehouse_orders_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "vault_manager"."warehouses"("id");


--
-- Name: warehouse_users warehouse_users_user_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouse_users"
    ADD CONSTRAINT "warehouse_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "vault_manager"."users"("id");


--
-- Name: warehouse_users warehouse_users_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouse_users"
    ADD CONSTRAINT "warehouse_users_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "vault_manager"."warehouses"("id");


--
-- Name: warehouses warehouses_company_id_fkey; Type: FK CONSTRAINT; Schema: vault_manager; Owner: -
--

ALTER TABLE ONLY "vault_manager"."warehouses"
    ADD CONSTRAINT "warehouses_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "vault_manager"."companies"("id");


--
-- PostgreSQL database dump complete
--

