import { body, checkSchema } from "express-validator";
import isBase64 from "is-base64";
import type { MeasureType } from "../types";

export const uploadValidator = () =>
  checkSchema({
    image: {
      notEmpty: true,
      custom: {
        options: async (value) => {
          const imageIsBase64 = isBase64(value, {
            mimeRequired: true,
            allowMime: true,
          });

          console.log("imageIsBase64", imageIsBase64);

          if (!imageIsBase64) throw new Error("Image not is Base64.");
        },
      },
      errorMessage: "Image is required.",
    },
    customer_code: {
      notEmpty: true,
      errorMessage: "Customer code is required.",
    },
    measure_datetime: {
      notEmpty: true,
      custom: {
        options: async (value) => {
          const unixTime = Date.parse(value);
          console.log("unixTime", unixTime);
          if (isNaN(unixTime)) throw new Error("Measure datetime invalid.");
        },
      },
      errorMessage: "Measure datetime is required.",
    },
    measure_type: {
      notEmpty: true,
      custom: {
        options: async (value: MeasureType) => {
          console.log("MeasureType", value);
        },
      },
      errorMessage: "Measure type is required.",
    },
  });
