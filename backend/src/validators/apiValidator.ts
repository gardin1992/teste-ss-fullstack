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

          if (!imageIsBase64) throw new Error("Image not is Base64.");
        },
      },
      errorMessage: "Image required.",
    },
    customer_code: {
      notEmpty: true,
      errorMessage: "Customer code required.",
    },
    measure_datetime: {
      notEmpty: true,
      custom: {
        options: async (value) => {
          const unixTime = Date.parse(value);
          if (isNaN(unixTime)) throw new Error("Measure datetime invalid.");
        },
      },
      errorMessage: "Measure datetime required.",
    },
    measure_type: {
      notEmpty: true,
      custom: {
        options: async (value: MeasureType) => {
          if (!["GAS", "WATER"].includes(value))
            throw new Error("Invalid measure type");
        },
      },
      errorMessage: "Measure type required.",
    },
  });

export const confirmValidtor = () =>
  checkSchema({
    measure_uuid: {
      notEmpty: true,
      isAlphanumeric: true,
      errorMessage: "Measure UUID required.",
    },
    confirmed_value: {
      notEmpty: true,
      isNumeric: true,
      errorMessage: "Confirm value required.",
    },
  });
