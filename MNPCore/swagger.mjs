import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.mjs"];

swaggerAutogen(outputFile, endpointsFiles);
