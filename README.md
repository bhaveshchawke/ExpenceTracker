# 💸 KharchaPani - Personal Finance & Expense Tracker

KharchaPani is a full-stack, responsive web application designed to help you track your personal finances, manage monthly budgets, and analyze your spending habits with ease.

## 🚀 Live Demo
**[Insert your Vercel Link here]** (e.g., https://kharchapani.vercel.app)

---

## ✨ Features
- **Smart Budgeting:** Create categories (Food, Travel, Rent, etc.) and assign monthly spending limits.
- **Expense Tracking:** Log daily transactions which automatically deduct from your category budgets.
- **Real-Time Analytics:** Visual charts (Pie charts and Cash Flow Bar charts) to monitor where your money goes.
- **Mobile First Design:** A clean, fully responsive UI built with Tailwind CSS that looks perfect on both desktop and mobile devices.
- **Secure Authentication:** User login and registration with secure sessions.
- **Admin Dashboard:** Special admin privileges to view platform statistics and manage users.

---

## 💻 Tech Stack
**Frontend:**
- React.js (Vite)
- Tailwind CSS for styling
- Recharts for data visualization
- React Icons

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose for Database
- JWT / Cookie-based Authentication

---

## 🛠️ Local Installation

If you'd like to run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/bhaveshchawke/ExpenceTracker.git
cd ExpenceTracker
```

### 2. Setup the Backend
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
SESSION_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```
Run the backend server:
```bash
npm start
```

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd Frontend
npm install
```
Create a `.env` file in the `Frontend` directory and add:
```env
VITE_BACKEND_URL=http://localhost:3000/api
```
Run the frontend server:
```bash
npm run dev
```

---

## 📸 Screenshots
*(Add your screenshots here! You can drag and drop images directly into GitHub's editor when editing this file online.)*

1. **Dashboard Overview** - Visualizing monthly budgets and cash flow.
2. **Transaction Logging** - Quick and easy expense entry.
3. **Mobile View** - Seamless experience on smaller screens.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 🧑‍💻 Developed By
**Bhavesh Chawke**  
[LinkedIn](Your LinkedIn Profile URL) | [GitHub](https://github.com/bhaveshchawke)
