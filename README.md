# colors-lab-COP43331

## Overview
colors-lab-COP43331 is a full-stack CRUD web application that allows users to securely manage a personalized list of colors. The project was built to explore backend architecture, API design, and deployment using the LAMP stack.

---

## Tech Stack

**Backend**
- Linux
- Apache
- MySQL
- PHP

**Frontend**
- HTML
- CSS
- Vanilla JavaScript

**Hosting**
- Deployed on a DigitalOcean droplet
- Apache configured to serve public files and route API requests
- MySQL database running on the same droplet

---

## Features

- User authentication
- Add new color entries
- Search existing color entries
- Session persistence via cookies

---

## API Endpoints

### POST /Login.php
Authenticates a user and returns:
- userId
- firstName
- lastName

### POST /AddColor.php
Adds a new color entry associated with a specific user.

### POST /SearchColors.php
Returns all colors matching a search query for the authenticated user.

---

## Setup Instructions

1. Install Apache, MySQL, and PHP on Ubuntu.
2. Import the database schema.
3. Configure database credentials in `config.php`.
4. Place API files in the Apache document root.
5. Access via browser at the configured domain.

---

## Limitations

- Basic session handling via cookies.
- No input validation hardening.
- No role-based access control.
- Designed for educational purposes.
