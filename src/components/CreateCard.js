import { useFormik } from "formik";
import Input from "./Input";
import Joi from "joi";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import { useState } from "react";
import { createCard } from "../services/cardsService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCard = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidateUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).label("Image").allow(""),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;
        if (bizImage) body.bizImage = bizImage;
        await createCard(body);
        console.log("created")
        toast("New card has been created");
        navigate("/my-cards");
      } catch ({ response }) {
        if (response && response.status === 400) setError(response.data);
      }
    },
  });

  return (
    <>
      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
      <h2>Create Card</h2>
        {error && <div className="error">{error}</div>}

        <Input
          type="text"
          placeholder="Name"
          required
          {...form.getFieldProps("bizName")}
          error={form.touched.bizName && form.errors.bizName}
        />

        <Input
          type="text"
          placeholder="Description"
          required
          {...form.getFieldProps("bizDescription")}
          error={form.touched.bizDescription && form.errors.bizDescription}
        />

        <Input
          type="text"
          placeholder="Address"
          required
          {...form.getFieldProps("bizAddress")}
          error={form.touched.bizAddress && form.errors.bizAddress}
        />

        <Input
          type="text"
          placeholder="Phone"
          required
          {...form.getFieldProps("bizPhone")}
          error={form.touched.bizPhone && form.errors.bizPhone}
        />

        <Input
          type="text"
          placeholder="Image"
          {...form.getFieldProps("bizImage")}
          error={form.touched.bizImage && form.errors.bizImage}
        />

        <div>
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn"
          >
            Create Card
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateCard;