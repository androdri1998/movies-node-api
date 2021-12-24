import joi from 'joi';

export const helloSchema = {
  query: joi.object({
    message: joi.string().required(),
  }),
};
