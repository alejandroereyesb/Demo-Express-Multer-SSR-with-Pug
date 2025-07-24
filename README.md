# Demo Express + Multer + SSR with Pug

This project is a demo application that allows uploading images to a server using **Express** and **Multer**, rendering views with **Pug**, and managing uploaded data in an in-memory array.

---

## **Folder Structure**

```
demo_express_multer_ssr/
├── app.js                     # Main server file
├── middlewares/               # Custom middlewares
│   ├── fileMiddleware.js      # Middleware for file uploads and error handling
├── public/                    # Static files (CSS, JS)
│   ├── styles.css             # CSS styles
│   ├── script.js              # Frontend logic
├── uploads/                   # Folder to store uploaded images
├── views/                     # Pug templates for frontend rendering
│   ├── index.pug              # Main page
├── package.json               # Project configuration and dependencies
└── README.md                  # Project documentation
```

---

## **Endpoints**

### **1. GET /**

- **Description**: Renders the main page with a form to upload images.
- **Example in Postman**:
  - **Method**: `GET`
  - **URL**: `http://localhost:3000/`

---

### **2. POST /upload**

- **Description**: Allows uploading an image along with the fields `title`, `description`, and `year`.
- **Restrictions**:
  - Maximum file size: 2MB.
  - Allowed types: `.jpg`, `.png`.
- **Example in Postman**:
  - **Method**: `POST`
  - **URL**: `http://localhost:3000/upload`
  - **Headers**:
    - `Content-Type: multipart/form-data`
  - **Body** (form-data):
    - `title`: "Example title"
    - `description`: "Image description"
    - `year`: 2023
    - `file`: (Select a `.jpg` or `.png` file)
- **Successful Response**:
  ```json
  {
    "success": true,
    "data": {
      "title": "Example title",
      "description": "Image description",
      "year": 2023,
      "file": {
        "originalName": "image.jpg",
        "path": "http://localhost:3000/uploads/image.jpg"
      }
    }
  }
  ```
- **Errors**:
  - File exceeds the allowed size: `400 Bad Request`.
  - File type not allowed: `400 Bad Request`.

---

### **3. GET /records**

- **Description**: Returns a JSON with all records stored in the `records` array.
- **Example in Postman**:
  - **Method**: `GET`
  - **URL**: `http://localhost:3000/records`
- **Successful Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "title": "Example Image 1",
        "description": "This is the example description for image 1",
        "year": 2023,
        "file": {
          "originalName": "100.jpg",
          "path": "http://localhost:3000/uploads/100.jpg"
        }
      },
      {
        "title": "Example Image 2",
        "description": "This is the example description for image 2",
        "year": 2020,
        "file": {
          "originalName": "498.jpg",
          "path": "http://localhost:3000/uploads/498.jpg"
        }
      }
    ]
  }
  ```

---

## **Web Application Flow**

1. **Main Page (`GET /`)**:
   - Displays a form with the following fields:
     - `title`: Image title.
     - `description`: Image description.
     - `year`: Year associated with the image.
     - `file`: Image file (`.jpg` or `.png`).
   - The form submits data to the `POST /upload` endpoint.

2. **File Upload (`POST /upload`)**:
   - The server validates the file:
     - Maximum size: 2MB.
     - Allowed types: `.jpg`, `.png`.
   - If validation is successful:
     - Saves the file in the `uploads` folder.
     - Adds a record to the `records` array.
     - Returns a JSON with the record data, including the full URL to access the uploaded file.

3. **View Records (`GET /records`)**:
   - The frontend makes a request to fetch all stored records.
   - The records are displayed on the page with:
     - Title.
     - Description.
     - Year.
     - Image (if available).

---

## **Prerequisites**

- **Node.js**: Ensure Node.js is installed on your system.
- **Dependencies**: Install the project dependencies with:
  ```bash
  npm install
  ```

---

## **Run the Project**

1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and go to:
   ```
   http://localhost:3000/
   ```

---

## **Notes**

- Uploaded files are stored in the `uploads` folder.
- The `records` array resets every time the server restarts, as no database is used.
- The `path` field in the API responses now includes the full URL to access the uploaded files.
- To persist data, consider integrating a database like SQLite or PostgreSQL.
- Instead of using a local array, you could store the data and files in external services like:
  - **Firebase**: For real-time database and file storage.
  - **Cloudinary**: For image hosting and optimization.
  - **AWS S3**: For scalable and reliable file storage.
