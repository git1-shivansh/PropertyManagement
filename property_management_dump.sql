--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8 (Homebrew)
-- Dumped by pg_dump version 15.8 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: owner; Type: TABLE; Schema: public; Owner: sshriv21
--

CREATE TABLE public.owner (
    ownerid integer NOT NULL,
    ownername character varying(255) NOT NULL,
    email character varying(255)
);


ALTER TABLE public.owner OWNER TO sshriv21;

--
-- Name: property; Type: TABLE; Schema: public; Owner: sshriv21
--

CREATE TABLE public.property (
    propertyid integer NOT NULL,
    address character varying(255) NOT NULL,
    price numeric(10,2),
    ownerid integer
);


ALTER TABLE public.property OWNER TO sshriv21;

--
-- Name: propertydetails; Type: TABLE; Schema: public; Owner: sshriv21
--

CREATE TABLE public.propertydetails (
    property_propertyid integer NOT NULL,
    numbathroom integer,
    numbedroom integer
);


ALTER TABLE public.propertydetails OWNER TO sshriv21;

--
-- Name: renter; Type: TABLE; Schema: public; Owner: sshriv21
--

CREATE TABLE public.renter (
    renterid integer NOT NULL,
    rentername character varying(255) NOT NULL,
    email character varying(255),
    propertyid integer
);


ALTER TABLE public.renter OWNER TO sshriv21;

--
-- Data for Name: owner; Type: TABLE DATA; Schema: public; Owner: sshriv21
--

COPY public.owner (ownerid, ownername, email) FROM stdin;
1	John Doe	john.doe@email.com
2	Jane Smith	jane.smith@email.com
3	Robert Johnson	robert.johnson@email.com
4	Emily Brown	emily.brown@email.com
5	Michael Davis	michael.davis@email.com
6	Sarah Wilson	sarah.wilson@email.com
7	David Thompson	david.thompson@email.com
8	Lisa Anderson	lisa.anderson@email.com
9	Thomas Taylor	thomas.taylor@email.com
10	Jennifer Martinez	jennifer.martinez@email.com
\.


--
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: sshriv21
--

COPY public.property (propertyid, address, price, ownerid) FROM stdin;
1	123 Main St, Anytown, USA	250000.00	1
2	456 Elm St, Somewhereville, USA	300000.00	2
3	789 Oak Ave, Anycity, USA	275000.00	3
4	101 Pine Rd, Somewhere, USA	225000.00	4
6	303 Cedar Blvd, Somewhere Else, USA	280000.00	6
7	404 Birch Dr, Another Town, USA	320000.00	7
9	606 Cherry Ave, Big City, USA	400000.00	9
10	707 Spruce Ct, Suburbia, USA	290000.00	10
5	202 Maple Ln, Anystate, USA	350000.00	5
11	123 New Street, Cityville	200000.00	1
8	505 Walnut St, Smallville, USA	360000.00	8
\.


--
-- Data for Name: propertydetails; Type: TABLE DATA; Schema: public; Owner: sshriv21
--

COPY public.propertydetails (property_propertyid, numbathroom, numbedroom) FROM stdin;
1	2	3
2	2	4
3	1	2
5	3	4
7	2	4
8	1	2
9	3	5
\.


--
-- Data for Name: renter; Type: TABLE DATA; Schema: public; Owner: sshriv21
--

COPY public.renter (renterid, rentername, email, propertyid) FROM stdin;
1	Alice Johnson	alice.johnson@email.com	1
2	Bob Williams	bob.williams@email.com	2
3	Carol Davis	carol.davis@email.com	3
4	Daniel Brown	daniel.brown@email.com	4
5	Eva Wilson	eva.wilson@email.com	5
6	Frank Miller	frank.miller@email.com	6
7	Grace Lee	grace.lee@email.com	7
8	Henry Garcia	henry.garcia@email.com	8
9	Isabel Rodriguez	isabel.rodriguez@email.com	9
10	Jack Thompson	jack.thompson@email.com	10
11	Olivia Hernandez	olivia.hernandez@example.com	11
12	James Hernandez	olivia.hernandez@example.com	5
\.


--
-- Name: owner owner_pkey; Type: CONSTRAINT; Schema: public; Owner: sshriv21
--

ALTER TABLE ONLY public.owner
    ADD CONSTRAINT owner_pkey PRIMARY KEY (ownerid);


--
-- Name: property property_pkey; Type: CONSTRAINT; Schema: public; Owner: sshriv21
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT property_pkey PRIMARY KEY (propertyid);


--
-- Name: propertydetails propertydetails_pkey; Type: CONSTRAINT; Schema: public; Owner: sshriv21
--

ALTER TABLE ONLY public.propertydetails
    ADD CONSTRAINT propertydetails_pkey PRIMARY KEY (property_propertyid);


--
-- Name: renter renter_pkey; Type: CONSTRAINT; Schema: public; Owner: sshriv21
--

ALTER TABLE ONLY public.renter
    ADD CONSTRAINT renter_pkey PRIMARY KEY (renterid);


--
-- Name: property property_ownerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sshriv21
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT property_ownerid_fkey FOREIGN KEY (ownerid) REFERENCES public.owner(ownerid);


--
-- Name: propertydetails propertydetails_property_propertyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sshriv21
--

ALTER TABLE ONLY public.propertydetails
    ADD CONSTRAINT propertydetails_property_propertyid_fkey FOREIGN KEY (property_propertyid) REFERENCES public.property(propertyid);


--
-- Name: renter renter_propertyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sshriv21
--

ALTER TABLE ONLY public.renter
    ADD CONSTRAINT renter_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public.property(propertyid);


--
-- PostgreSQL database dump complete
--

