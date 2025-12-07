import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { AdminItem } from "@/utils/interfaces/admin/adminItem";
import axios from "axios";
import sharp from "sharp";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-west-1"
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";

interface ImageUrl {
  id: string;
  url: string;
}


export async function POST(req: Request) {
  let message = "";
  let statusCode = 200;

  try {
    // Step 1: Parse the JSON body from the request (equivalent to request.get_json())
    const item: AdminItem = await req.json();

    // Step 2: Log the item for debugging (equivalent to pprint.pprint())
    console.log("Received item:", JSON.stringify(item, null, 2));

    // Step 3: Get the square images array (equivalent to item["image_urls"])
    const squareImages = item.squareImageUrls;

    // Step 4: Loop through each image URL (equivalent to for url in square_images)
    squareImages.forEach(async (imageUrl, index) => {
      try {
        // Step 5: Fetch the image from the URL (equivalent to requests.get())
        const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
        
        if (imageResponse.status !== 200) {
          throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
        }

        // Step 6: Convert response to buffer (equivalent to BytesIO(image_response.content))
        const imageBuffer = Buffer.from(imageResponse.data);

        // Step 7: Convert image to WebP format using sharp (equivalent to PIL Image.save())
        // sharp is the Node.js equivalent of Python's PIL/Pillow library
        const webpBuffer = await sharp(imageBuffer)
          .webp()
          .toBuffer();

        console.log("Image buffer size:", imageBuffer.length);
        console.log("WebP buffer size:", webpBuffer.length);

        // Step 8: Create S3 key for the image (equivalent to f-string)
        const s3ImageKey = `${item.id}_${item.images[index]}.webp`;

        // Step 9: Upload to S3 (equivalent to bucket.upload_fileobj())
        const uploadCommand = new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: s3ImageKey,
          Body: webpBuffer,
          ContentType: "image/webp",
        });

        await s3Client.send(uploadCommand);

        // Step 10: Log success
        console.log(`Successfully migrated image for ${s3ImageKey}`);
        message += `Successfully migrated image for ${imageUrl}\n`;
      } catch (error) {
        // Step 11: Handle errors for individual images
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error migrating image ${imageUrl}:`, errorMessage);
        message += `Error migrating image ${imageUrl}: ${errorMessage}\n`;
        statusCode = 207; // 207 Multi-Status (partial success)
      }
    });

    // Step 12: Return the response (equivalent to jsonify(response))
    return NextResponse.json(
      {
        message: message || "All images processed successfully",
        status: statusCode,
      },
      { status: 200 }
    );
  } catch (err) {
    // Step 13: Handle top-level errors
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error processing request:", errorMessage);
    
    return NextResponse.json(
      {
        message: `Failed to process images: ${errorMessage}`,
        status: 500,
      },
      { status: 500 }
    );
  }
}