# Overview
An e-commerce site mockup for a small business selling baked goods

## Description

**Backgound:** This website was designed soley as a template for a small business that is currently seeking a commerce platform to sell their products. 
All products (images sourced from Unsplash) and descriptions in the site are placeholders.

**Technologies:** The web app was built using React for the frontend and Spring Boot + MySQL for the backend. Both frontend and backend together are built 
with Maven using a plugin, and the app is containerized with Docker. The Docker image is then pushed to Docker Hub and deployed to AWS Elastic Beanstalk 
via a Github Actions CI/CD pipeline.

**Features:** 
- Create an account and log in to the account
- Add to or remove items from a shopping cart
- Query an item from the given product list
- Checkout your cart and simulate a payment using a test card # from Stripe
- View fulfilled orders through an authenticated account

## Usage
The project is hosted in AWS through the following link: http://bakeshopapp-env-1.eba-bf5dgg3k.us-east-1.elasticbeanstalk.com

## Documentation
Navigate to [this porfolio] and click on the Documentation link under 'Bakeshop App' for a full description of steps, as well as screenshots
