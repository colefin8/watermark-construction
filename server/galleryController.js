const fs = require("fs");
const AWS = require("aws-sdk");
const galleryArray = require("./gallery.json");
require("dotenv").config();
const { AWS_ACCESS_KEY, AWS_SECRET_KEY, BUCKET_NAME } = process.env;

module.exports = {
  signs3: async (req, res) => {
    AWS.config = {
      region: "us-west-1",
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
    };
    const s3 = new AWS.S3({ signatureVersion: "v4" });
    const fileName = req.query["file-name"];
    const fileType = req.query["file-type"];
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read",
    };

    s3.getSignedUrl("putObject", params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(`signed url error: ${err}`);
      }
      const dataToSend = {
        signedRequest: data,
        url: `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
      };
      galleryArray.push(dataToSend.url);
      fs.writeFile(
        "server/gallery.json",
        JSON.stringify(galleryArray),
        (err) => {
          if (err) {
            console.log("err: ", err);
          }
        }
      );
      return res.status(200).send(dataToSend);
    });
  },
  addToJSON: async (req, res) => {},
};
