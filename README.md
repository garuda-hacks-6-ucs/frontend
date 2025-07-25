# 🏛️ BlockTenderID – Frontend

**BlockTenderID** is a **Blockchain and AI-powered digital tender platform** designed to create a **transparent, fair, and nepotism-free** government procurement process. It empowers citizens to participate in selecting the most suitable vendors through **decentralized public voting**, while **smart contracts** automate secure and timely payments.

This repository contains the **frontend** of the application built with **React.js**, styled using **Tailwind CSS**, and enhanced with **OCR (Tesseract.js)** for user KYC verification and **Lucide-react** for icons.

---

## 🚀 Purpose of the Platform

To provide a web-based platform where vendors can fairly and transparently compete in government tenders, free from internal connections or nepotism. AI summarizes both government and vendor proposals, allowing the public to make informed decisions during the open voting process. The best vendors are selected based on **quality**, **relevance**, and **public needs**, not personal ties.

---

## 💡 Key Benefits

1. ✅ **Grow Responsibility**  
   Vendors must submit their best offers transparently, building trust and credibility.

2. 🔄 **Stay Adaptable**  
   Vendors can adjust their offers based on project types and community needs.

3. ⚡ **Improve Efficiency**  
   AI-generated summaries reduce evaluation time for all stakeholders.

4. 🧠 **Support Smarter Decisions**  
   Clear project expectations help vendors deliver more relevant proposals.

5. 💰 **Better Resource Management**  
   Smart contracts ensure payment security, helping vendors manage cash flow.

6. 🌱 **Sustainable Long-Term Success**  
   Public voting eliminates internal favoritism, fostering long-term trust and fairness.

---

## 📺 Frontend Features

### 1. 🏠 **Homepage**
- Introduction to the platform
- Key features and advantages

### 2. 📋 **Voting List Page**
- Displays a list of government open tenders
- Each card shows project title, description snippet, and deadline

### 3. 📄 **Voting Detail Page**
- Shows full project details and AI-generated summary
- Displays vendor proposal cards fetched based on `projectVotingId`
- Each **vendor card includes**:
  - 📷 Thumbnail
  - 🏷️ Proposal Title
  - 🧑 Vendor Name
  - 💸 Total Budget (ETH)
- Clicking a card opens a **popup with:**
  - 3 image thumbnails
  - Title
  - Vendor Name
  - AI-generated Summary
  - Total Budget (ETH)
  - Proposal file or text
  - **Vote Button** – once voted, card gets highlighted

### 4. 🧾 **Vendor Detail Page**
- Dedicated page for each vendor
- Full vendor proposal details
- Summary and vote option

### 5. 📝 **Register Page**
- KYC process for citizens
- Users input name and upload ID card
- OCR (powered by Tesseract.js) used to extract and verify identity

---

## 🛠️ Tech Stack

| Layer        | Tech Stack               |
|--------------|--------------------------|
| Framework    | React.js                 |
| Styling      | Tailwind CSS             |
| OCR Engine   | Tesseract.js             |
| Icons        | Lucide-react             |

---

## 📸 Assets & Image Credits

The following images are used in the application and are credited as follows:

- Project background:  
  Photo by [James Harrison](https://unsplash.com/@jstrippa)  
  URL: [Unsplash Image 1](https://images.unsplash.com/photo-1616861771635-49063a4636ed?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

- Vendor detail preview:  
  Photo by [Artem Sapegin](https://unsplash.com/@sapegin)  
  URL: [Unsplash Image 2](https://images.unsplash.com/photo-1706454566473-d5ca521ea8cb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

---

## 📬 Contact

For collaboration, suggestions, or questions, feel free to reach out to the development team.

---

**© BlockTenderID – Empowering Transparency in Public Procurement**


