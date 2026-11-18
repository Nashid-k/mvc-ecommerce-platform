# Commerce Platform — Server-rendered E-commerce (MVC)

A server-rendered e-commerce application built with Express, EJS and MongoDB. The repository includes customer-facing shopping flows and a separate administration area.

## Features represented in the codebase

- Express routes for user and admin workflows
- EJS server-rendered views
- MongoDB persistence through Mongoose
- Session-based authentication with Passport
- Google OAuth integration
- Product image uploads and static asset serving
- Razorpay integration dependency for payment workflows
- PDF generation dependency for document/report output

> This is an earlier MVC-style project. Review and harden authentication, payment and deployment configuration before using it as a production reference.

## Stack

Node.js, Express 4, EJS, MongoDB/Mongoose, Passport, express-session, Multer, Razorpay and PDFKit.

## Run locally

```bash
git clone https://github.com/Nashid-k/mvc-ecommerce-platform.git
cd mvc-ecommerce-platform
npm install
```

Create a local `.env` file with the following configuration:

```env
PORT=3000
mongo_url=mongodb://127.0.0.1:27017/commerce
SESSION_SECRET=replace-with-a-long-random-value
```

Add the Google OAuth and payment-provider settings required by the corresponding integrations. Never commit real credentials.

Start the application:

```bash
node index.js
```

## Important security notes

- Keep MongoDB credentials, OAuth secrets, payment keys and session secrets in environment variables.
- Set a strong, unique `SESSION_SECRET` before starting the application.
- Use secure, HTTP-only cookies and HTTPS in production.
- Validate uploads and payment callbacks server-side.
- Review dependencies and add automated tests before production use.
