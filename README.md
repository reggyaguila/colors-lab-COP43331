# colors-lab-COP43331
Personal color manager

## Local integration test

This project no longer needs the original droplet to run the `AddColor` integration test.

1. Install PHP and make sure MySQL is running locally.
2. Create the database and seed a test user:

```bash
mysql -u YOUR_MYSQL_USER -p < colors-lamp/api/schema.sql
```

3. Start the PHP API server with your local database credentials:

```bash
DB_USER=YOUR_MYSQL_USER DB_PASS=YOUR_MYSQL_PASSWORD npm run start:api
```

If you use a different host or database name, you can also set `DB_HOST` and `DB_NAME`.

4. In a second terminal, run the integration test:

```bash
npm run test:integration
```

The test defaults to `http://127.0.0.1:8000/AddColor.php`. Override it with `API_BASE_URL` if you serve the API somewhere else.
