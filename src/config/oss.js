import OSS from "ali-oss";

export default function OSSConfig() {
  return new OSS({
    region: "oss-cn-hangzhou",
    accessKeyId: "LTAI4FqmWFQPa2vNK7QvPrzF",
    accessKeySecret: "5wjmkonTqgMiB03TFqSdBwwCCrGU64",
    // stsToken: '',
    bucket: "magex"
  })
}