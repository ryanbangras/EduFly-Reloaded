// Helper function to calculate S3 bucket size
async function getBucketSize() {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: "homeworks/",
    };
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents.reduce((total, obj) => total + obj.Size, 0);
  }
  
  // Upload route with size check
  app.post("/upload", async (req, res) => {
    try {
      const bucketSize = await getBucketSize();
      const maxSize = 5 * 1024 * 1024 * 1024; // 5GB
  
      if (bucketSize >= maxSize) {
        return res.status(400).send("Storage limit reached. Please delete old files.");
      }
  
      // Proceed with upload
      upload.single("homework")(req, res, (err) => {
        if (err) return res.status(500).send("Error uploading file");
        res.send("File uploaded successfully");
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
  