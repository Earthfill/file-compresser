# NestJS File Upload and Compression Example

This is a NestJS application demonstrating how to implement file upload and compression using NestJS framework.

## Getting Started

To get started, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Earthfill/file-compresser.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the NestJS application:**

   ```bash
   npm start
   ```

3. **Start and monitor the NestJS application:**

   ```bash
   npm run start:dev
   ```



The application should now be running locally at `http://localhost:3000`.

## Endpoints

### File Upload Endpoint

**POST** `/upload`

This endpoint accepts file uploads and compresses the uploaded files. It expects a `multipart/form-data` request with a file field named `'file'`. Upon successful upload and compression, it returns the file path of the compressed file.

## Testing with Postman

You can use Postman to test the file upload endpoint:

1. **Open Postman.**
2. **Create a new request** with the following details:
   - Method: POST
   - URL: `http://localhost:3000/upload`
   - Body: Select the "form-data" option and add a key-value pair with the key `'file'` and value as the file you want to upload.
3. **Click on the "Send" button** to send the request.
4. **Check the response** to verify that the file was uploaded and compressed successfully.

## Dependencies

- `@nestjs/common`: For building web applications with NestJS.
- `@nestjs/mongoose`: For integrating with MongoDB.
- `@nestjs/platform-express`: For integrating with Express in NestJS.
- `compression`: Middleware for compressing response bodies for all request.
- `multer`: For handling file uploads.
- `zlib`: For compression.

## Folder Structure

```
src/
|-- exceptions/
|   |-- exceptionsLogger.filter.ts
|-- file-upload/
|   |-- file-upload.controller.ts
|   |-- file-upload.service.ts
|   |-- multer.config.ts
|-- app.module.ts
|-- main.ts
```

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any improvements or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
