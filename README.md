# Team-_4495_S002-JanviA  
CyberAware – Web-Based Cybersecurity Awareness Platform  

## Course Info  
- Term: W26  
- Course: 4495  
- Section: S002  

## Team  
- Janvi Arora  
  - Student ID: 300383801  
  - Email: janviarora13579@gmail.com  

## Project  

CyberAware is a web-based cybersecurity awareness and training platform built using React and Supabase.  

The platform allows users to securely create accounts, log in, access protected routes, and complete interactive cybersecurity training modules.  

Users earn points based on quiz performance, and modules unlock sequentially to guide structured learning. Progress is tracked per user and secured using Supabase Row-Level Security policies.

The system demonstrates both secure web application development and practical cybersecurity awareness implementation.

## Implemented Features  

- Email/password authentication using Supabase  
- Secure login and logout functionality  
- Session management  
- Protected dashboard route  
- Phishing Awareness module with scoring  
- Password Security module with passphrase and quiz  
- Social Engineering module  
- Sequential module unlock logic  
- Points system and level calculation  
- Dynamic progress tracking  

## Tech Stack  

- Frontend: React (JavaScript)  
- Routing: React Router  
- Backend: Supabase (Authentication + Database)  
- Security: Row-Level Security (RLS)  

## How to Run  

1. Install dependencies  
   npm install  

2. Create a `.env` file and add:  

   VITE_SUPABASE_URL=your_project_url  
   VITE_SUPABASE_ANON_KEY=your_anon_key  

3. Start development server  
   npm run dev  

The application runs at:  
http://localhost:5173  

## Future Improvements  

- Full database-based progress synchronization  
- Admin analytics dashboard  
- Additional cybersecurity modules  
- UI/UX refinements  
- Automated testing  
